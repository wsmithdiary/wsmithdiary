#!/usr/bin/env node
// Gera um SVG "página de diário" a partir do calendário de contribuições do GitHub.
// Cada dia com commit vira um traço de caneta na pauta. Dia vazio fica papel limpo.
// Uso:
//   GITHUB_TOKEN=xxx node scripts/diario.mjs --login wsmithdiary --out dist/diario.svg
//   node scripts/diario.mjs --demo --out dist/diario.svg   (sem rede, dados de exemplo)

// ---------------------------------------------------------------- args

const args = process.argv.slice(2);
const flag = (name, fallback = null) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};
const has = (name) => args.includes(`--${name}`);

const LOGIN = flag('login', process.env.GITHUB_LOGIN || 'wsmithdiary');
const OUT = flag('out', 'dist/diario.svg');
const DEMO = has('demo');

// ---------------------------------------------------------------- dados

const QUERY = `
query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays { date contributionCount weekday }
        }
      }
    }
  }
}`;

async function fetchCalendar(login) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error('GITHUB_TOKEN não definido (ou use --demo)');

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'diario-grid',
    },
    body: JSON.stringify({ query: QUERY, variables: { login } }),
  });

  if (!res.ok) throw new Error(`GitHub respondeu ${res.status}: ${await res.text()}`);
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));

  const cal = json.data?.user?.contributionsCollection?.contributionCalendar;
  if (!cal) throw new Error(`usuário "${login}" não encontrado`);
  return cal;
}

// Calendário sintético para preview offline: 53 semanas terminando hoje.
function demoCalendar() {
  const commits = { '2026-08-17': 1, '2026-08-25': 11, '2026-08-26': 12, '2026-08-27': 11 };
  const end = new Date('2026-08-27T00:00:00Z');
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - 364);
  start.setUTCDate(start.getUTCDate() - start.getUTCDay()); // volta pro domingo

  const weeks = [];
  const cursor = new Date(start);
  while (cursor <= end) {
    const days = [];
    for (let d = 0; d < 7; d++) {
      const iso = cursor.toISOString().slice(0, 10);
      if (cursor <= end) days.push({ date: iso, contributionCount: commits[iso] || 0, weekday: d });
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }
    weeks.push({ contributionDays: days });
  }
  const total = Object.values(commits).reduce((a, b) => a + b, 0);
  return { totalContributions: total, weeks };
}

// ---------------------------------------------------------------- layout

const CELL = 16;   // passo entre colunas/linhas
const PAD_L = 48;  // margem do caderno + rótulos de dia da semana
const PAD_T = 32;  // rótulos de mês
const PAD_R = 26;
const PAD_B = 36;  // rodapé

const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
const DIAS = { 1: 'seg', 3: 'qua', 5: 'sex' };

// paleta: papel, pauta, margem e tinta
const PAPEL_A = '#EFEAE2';
const PAPEL_B = '#DED6CA';
const FIBRA_COR = '#B3A392';
const PAUTA = '#CFC3B4';
const MARGEM = '#730D01';
const TINTA = '#730D01';
const TINTA_FORTE = '#560A01';
const LAPIS = '#8A7A6C';
const RODAPE = '#5A4A3E';

// pressão da caneta por quantidade de commits
const PRESSAO = {
  1: { largura: 1.1, comprimento: 7.0, opacidade: 0.62, cor: TINTA, blot: false },
  2: { largura: 1.7, comprimento: 8.8, opacidade: 0.78, cor: TINTA, blot: false },
  3: { largura: 2.4, comprimento: 10.2, opacidade: 0.9, cor: TINTA, blot: true },
  4: { largura: 3.1, comprimento: 11.4, opacidade: 1.0, cor: TINTA_FORTE, blot: true },
};

// hash determinístico -> a mesma página para a mesma data
function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

// PRNG determinístico (mulberry32) — mesma textura de papel a cada execução
function prng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// intensidade 1..4 a partir da contagem de commits
function nivel(n) {
  if (n >= 10) return 4;
  if (n >= 5) return 3;
  if (n >= 2) return 2;
  return 1;
}

// ---------------------------------------------------------------- svg

function render(cal, login) {
  const weeks = cal.weeks;
  const W = PAD_L + weeks.length * CELL + PAD_R;
  const H = PAD_T + 7 * CELL + PAD_B;

  const cx = (w) => PAD_L + w * CELL + CELL / 2;
  const cy = (d) => PAD_T + d * CELL + CELL / 2;
  const pauta = (d) => cy(d) + 3.6; // a linha da pauta, onde o traço se apoia

  const tracos = [];
  const pontos = []; // dias com commit, em ordem cronológica

  weeks.forEach((week, w) => {
    week.contributionDays.forEach((day) => {
      if (day.contributionCount === 0) return; // papel limpo

      const lv = nivel(day.contributionCount);
      const p = PRESSAO[lv];
      const x = cx(w);
      const y = pauta(day.weekday);

      const h1 = hash(day.date);
      const h2 = hash(day.date + '#');
      const h3 = hash(day.date + '##');

      const len = p.comprimento * (0.85 + h1 * 0.3);
      const inclina = (h2 - 0.5) * 2.6;   // caneta nunca sai reta
      const desloca = (h3 - 0.5) * 1.4;   // nem sempre encosta na pauta igual

      const x0 = x - len / 2;
      const x1 = x + len / 2;
      const y0 = y + desloca - inclina / 2;
      const y1 = y + desloca + inclina / 2;
      const c1x = x0 + len * 0.28;
      const c1y = y0 - 1.1 - h2 * 0.9;
      const c2x = x0 + len * 0.72;
      const c2y = y1 + 0.5 + h3 * 0.7;

      const d = `M${x0.toFixed(2)} ${y0.toFixed(2)}C${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${x1.toFixed(2)} ${y1.toFixed(2)}`;
      const comp = Math.ceil(len * 1.25); // comprimento aproximado, só para o dash

      pontos.push({ date: day.date });
      const i = pontos.length - 1;

      tracos.push({
        i,
        svg: (delay) =>
          `<g class="dia" style="--d:${delay}s;--l:${comp}">` +
          `<title>${day.date} · ${day.contributionCount} contribuições</title>` +
          `<path class="traco" d="${d}" fill="none" stroke="${p.cor}" stroke-width="${p.largura}" ` +
          `stroke-linecap="round" opacity="${p.opacidade}"/>` +
          (p.blot
            ? `<circle class="blot" cx="${x1.toFixed(2)}" cy="${y1.toFixed(2)}" r="${(0.9 + lv * 0.28).toFixed(2)}" fill="${p.cor}" opacity="${(p.opacidade * 0.85).toFixed(2)}"/>`
            : '') +
          `</g>`,
      });
    });
  });

  // a escrita acontece em ordem cronológica, da esquerda para a direita
  const ESCRITA = 3.4; // segundos até a última entrada
  const corpo = tracos
    .map((t) => t.svg(((t.i / Math.max(tracos.length - 1, 1)) * ESCRITA).toFixed(2)))
    .join('');

  // fibra do papel
  const rnd = prng(20260827);
  let fibra = '';
  for (let i = 0; i < 170; i++) {
    const x = (rnd() * W).toFixed(1);
    const y = (rnd() * H).toFixed(1);
    const c = rnd();
    fibra += `<circle cx="${x}" cy="${y}" r="${(0.3 + c * 0.6).toFixed(2)}" fill="${FIBRA_COR}" opacity="${(0.05 + c * 0.13).toFixed(2)}"/>`;
  }

  // pauta: uma linha por dia da semana
  let linhas = '';
  for (let d = 0; d < 7; d++) {
    linhas += `<line x1="${PAD_L - 6}" y1="${pauta(d)}" x2="${W - PAD_R + 6}" y2="${pauta(d)}" stroke="${PAUTA}" stroke-width="0.7" opacity="0.85"/>`;
  }

  // margem vermelha do caderno
  const margem =
    `<line x1="${PAD_L - 12}" y1="${PAD_T - 18}" x2="${PAD_L - 12}" y2="${H - PAD_B + 10}" stroke="${MARGEM}" stroke-width="1.1" opacity="0.55"/>` +
    `<line x1="${PAD_L - 9}" y1="${PAD_T - 18}" x2="${PAD_L - 9}" y2="${H - PAD_B + 10}" stroke="${MARGEM}" stroke-width="0.6" opacity="0.22"/>`;

  // rótulos de mês
  let meses = '';
  let ultimoMes = -1;
  weeks.forEach((week, w) => {
    const first = week.contributionDays[0];
    if (!first) return;
    const m = Number(first.date.slice(5, 7)) - 1;
    if (m !== ultimoMes && w < weeks.length - 1) {
      ultimoMes = m;
      meses += `<text class="lbl" x="${PAD_L + w * CELL}" y="${PAD_T - 12}">${MESES[m]}</text>`;
    }
  });

  // rótulos de dia da semana, dentro da margem
  let dias = '';
  for (const [d, nome] of Object.entries(DIAS)) {
    dias += `<text class="lbl" x="${PAD_L - 18}" y="${pauta(Number(d)) - 1}" text-anchor="end">${nome}</text>`;
  }

  const total = cal.totalContributions;
  const registrados = pontos.length;

  // largura aproximada do rodapé em fonte monoespaçada (evita text-anchor + tspan,
  // que alguns renderizadores tratam mal)
  const rodape = `${total} contribuições em ${registrados} dias registrados · últimos 12 meses`;
  const rodapeX = (W - PAD_R - rodape.length * 5.72).toFixed(1);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Página de diário com o registro de contribuições de ${login}: cada dia com commit é um traço de caneta na pauta">
  <defs>
    <linearGradient id="papel" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${PAPEL_A}"/>
      <stop offset="60%" stop-color="#E8E1D7"/>
      <stop offset="100%" stop-color="${PAPEL_B}"/>
    </linearGradient>
    <radialGradient id="sombra" cx="50%" cy="50%" r="72%">
      <stop offset="60%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#3A2E24" stop-opacity="0.10"/>
    </radialGradient>
  </defs>

  <style>
    .lbl { font-family: ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace; font-size: 9px; fill: ${LAPIS}; letter-spacing: 0.4px; }
    .cap { font-family: ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace; font-size: 9.5px; fill: ${RODAPE}; letter-spacing: 0.3px; }
    .num { fill: ${TINTA_FORTE}; font-weight: 700; }
    .traco { stroke-dasharray: var(--l); stroke-dashoffset: var(--l); animation: escrever 0.5s ease-out var(--d) forwards; }
    .blot { opacity: 0; animation: pingar 0.35s ease-out calc(var(--d) + 0.35s) forwards; }
    @keyframes escrever { to { stroke-dashoffset: 0 } }
    @keyframes pingar { to { opacity: 0.85 } }
    @media (prefers-reduced-motion: reduce) {
      .traco { animation: none; stroke-dashoffset: 0 }
      .blot { animation: none; opacity: 0.85 }
    }
  </style>

  <rect width="${W}" height="${H}" rx="4" fill="url(#papel)"/>
  <g>${fibra}</g>
  ${linhas}
  ${margem}
  <g>${corpo}</g>
  ${meses}
  ${dias}
  <rect width="${W}" height="${H}" rx="4" fill="url(#sombra)"/>
  <text class="cap" x="${PAD_L}" y="${H - 13}">@${login}</text>
  <text class="cap" x="${rodapeX}" y="${H - 13}"><tspan class="num">${total}</tspan> contribuições em <tspan class="num">${registrados}</tspan> dias registrados · últimos 12 meses</text>
</svg>
`;
}

// ---------------------------------------------------------------- main

const cal = DEMO ? demoCalendar() : await fetchCalendar(LOGIN);
const svg = render(cal, LOGIN);

const { writeFile, mkdir } = await import('node:fs/promises');
const { dirname } = await import('node:path');
await mkdir(dirname(OUT), { recursive: true });
await writeFile(OUT, svg, 'utf8');

console.log(`ok: ${OUT} (${cal.totalContributions} contribuições em ${registradosDe(cal)} dias)`);

function registradosDe(cal) {
  return cal.weeks.reduce(
    (a, w) => a + w.contributionDays.filter((d) => d.contributionCount > 0).length,
    0
  );
}