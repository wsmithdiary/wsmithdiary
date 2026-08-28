<div align="center">

# ☉ Gabriel — Desenvolvedor Full Stack

TypeScript e React no front, Node.js e NestJS no back, PostgreSQL nos dados.
Remoto, São Paulo, Brasil.

![TypeScript](https://img.shields.io/badge/TypeScript-14265E?style=for-the-badge&logo=typescript&logoColor=F5F3EA)
![React](https://img.shields.io/badge/React-C1272D?style=for-the-badge&logo=react&logoColor=F5F3EA)
![Next.js](https://img.shields.io/badge/Next.js-F2C33C?style=for-the-badge&logo=nextdotjs&logoColor=14265E)
![Node.js](https://img.shields.io/badge/Node.js-1B3A93?style=for-the-badge&logo=nodedotjs&logoColor=F5F3EA)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14265E?style=for-the-badge&logo=postgresql&logoColor=F5F3EA)

</div>

<div align="center"><img src="https://img.shields.io/badge/-14265E?style=flat&color=14265E" width="24%" height="3"><img src="https://img.shields.io/badge/-C1272D?style=flat&color=C1272D" width="24%" height="3"><img src="https://img.shields.io/badge/-F2C33C?style=flat&color=F2C33C" width="24%" height="3"><img src="https://img.shields.io/badge/-1B3A93?style=flat&color=1B3A93" width="24%" height="3"></div>

## ☄ Quinze segundos

> **Construo aplicação web de ponta a ponta** — interface em **React** com **TypeScript**, **REST API** em **NestJS** sobre **PostgreSQL**.
>
> **Escrevo o teste antes do código** e mantenho a regra de negócio fora da interface: o cálculo é testado sem montar tela, e cada decisão de arquitetura vem com o motivo escrito ao lado.
>
> **No ar:** um gerador de orçamento de mão de obra para construção civil. Lança os serviços linha a linha, calcula com aritmética decimal exata e formata em real — tudo dentro do navegador, sem servidor, sem instalação, sem dado saindo da máquina de quem usa. A exportação em PDF é o que está sendo escrito agora. **[Abrir →](https://empreiteira-website.vercel.app)**
>
> **Procuro posição remota como Desenvolvedor Full Stack.** → **winston.19i80@gmail.com**

O resto desta página é a prova de cada uma dessas quatro linhas.

<div align="center"><img src="https://img.shields.io/badge/-14265E?style=flat&color=14265E" width="24%" height="3"><img src="https://img.shields.io/badge/-C1272D?style=flat&color=C1272D" width="24%" height="3"><img src="https://img.shields.io/badge/-F2C33C?style=flat&color=F2C33C" width="24%" height="3"><img src="https://img.shields.io/badge/-1B3A93?style=flat&color=1B3A93" width="24%" height="3"></div>

## ✦ O diário

![Registro diário de contribuições do GitHub de Gabriel, desenvolvedor Full Stack de TypeScript e Node.js, desenhado como uma página de caderno pautada: cada dia com commit é um traço de caneta vermelha na pauta, e a espessura do traço é a quantidade de commits](https://raw.githubusercontent.com/wsmithdiary/wsmithdiary/output/diario.svg)

Winston Smith comprou um caderno em branco e passou a escrever datas nele. Não porque tivesse algo grandioso a dizer. Porque registro feito na hora é a única coisa que ninguém consegue reescrever depois.

Essa página é o caderno. Cada traço é um dia em que o trabalho realmente aconteceu — commit escrito, teste rodado, bug fechado. Traço mais grosso, dia mais pesado. Não existe commit de enfeite aqui para preencher linha. Dia vazio fica em branco.

Começo quase em branco. Esse é o ponto: a página seguinte é escrita agora, e dá para conferir a data de cada uma.

<div align="center"><img src="https://img.shields.io/badge/-14265E?style=flat&color=14265E" width="24%" height="3"><img src="https://img.shields.io/badge/-C1272D?style=flat&color=C1272D" width="24%" height="3"><img src="https://img.shields.io/badge/-F2C33C?style=flat&color=F2C33C" width="24%" height="3"><img src="https://img.shields.io/badge/-1B3A93?style=flat&color=1B3A93" width="24%" height="3"></div>

## 🪐 Órbita atual

**O que resolve:** quem faz orçamento de mão de obra na construção civil precisa de um número confiável e de um documento para entregar ao cliente. O gerador que estou escrevendo faz as duas coisas dentro do navegador — **Vite** com **React 19**, **TypeScript** e **Tailwind CSS**, aplicação estática, nada trafega para um servidor. Está publicado e sobe a cada mudança na `main`: **[empreiteira-website.vercel.app](https://empreiteira-website.vercel.app)**.

Quatro decisões que eu defendo linha por linha:

- **Sem back-end.** Nenhum passo do fluxo exige servidor. Adicionar um só criaria estado para sincronizar, custo para pagar e superfície para atacar.
- **Vite em vez de Next.js.** Não há SSR, rota nem SEO em disputa neste projeto. Escolho Next.js quando esses três entram na conta; aqui, não entram.
- **Núcleo separado da interface.** A regra de negócio vive em TypeScript puro (`tipos.ts`, `validacao.ts`, `calcularSubtotal.ts`), sem importar React. Testo o cálculo sem montar um único nó de DOM.
- **Aritmética decimal em vez de float.** `0.1 + 0.2` não é `0.3` em ponto flutuante binário — e num orçamento essa diferença é centavo errado na frente do cliente. O arredondamento é um só, explícito, em duas casas.

Pelo mesmo critério, **Docker** ficou de fora daqui: em deploy estático, um Dockerfile de produção não faz nada. Docker fica reservado para o back-end com **PostgreSQL**, onde resolve um problema real.

Detalhe que só aparece com uso de verdade: campos numéricos usam `type="text"` com `inputMode="decimal"`, porque `type="number"` bloqueia a vírgula decimal do pt-BR; as unidades seguem a nomenclatura da tabela SINAPI — m², m³, vb, h; e a acessibilidade é escrita à mão, com `useId` amarrado ao `htmlFor`, `role="alert"` nos erros e `aria-describedby` ligando campo e mensagem.

Antes disso escrevi um ETL da tabela SINAPI — extração com **Python** e **pandas**, modelagem no **Prisma**, carga em **PostgreSQL** e uma **REST API** em **NestJS** — e um back-end de agendamento em **NestJS** com autenticação **JWT** e rotação de refresh token, `RolesGuard` com decorator `@Roles()`, Repository Pattern sobre Prisma e testes contra um banco PostgreSQL separado.

<div align="center"><img src="https://img.shields.io/badge/-14265E?style=flat&color=14265E" width="24%" height="3"><img src="https://img.shields.io/badge/-C1272D?style=flat&color=C1272D" width="24%" height="3"><img src="https://img.shields.io/badge/-F2C33C?style=flat&color=F2C33C" width="24%" height="3"><img src="https://img.shields.io/badge/-1B3A93?style=flat&color=1B3A93" width="24%" height="3"></div>

## ✧ Leis de movimento

- **Escrevo o teste, vejo falhar, faço passar.** Depois quebro o código de propósito para confirmar que o teste testa alguma coisa. Um teste que nunca falhou não provou nada, e um que passa com o código quebrado está confirmando o número errado. **TDD** é isso, ou não é nada.
- **Commit pequeno e semântico** (`feat:`, `fix:`, `test:`, `docs:`, `chore:`), assunto curto e corpo em bullets. Uma branch por objetivo em **Git**. Nada fica sem commit no fim do dia.
- **Desenho a interface no papel antes de abrir o editor.** Layout mobile-first resolvido no rascunho custa muito menos que layout resolvido no navegador.
- **Digito o código à mão em vez de copiar e colar.** Memória muscular não vem de `Ctrl+V`.
- **Quando um bug me pega, vou até a causa e anoto.** Armadilhas já registradas no caderno: `typeof NaN === "number"` (use `Number.isNaN`); `<select value="">` sem `<option value="">` cai calado na primeira opção; `<input type="number">` vazio chega como `null`, não como string vazia; `crypto.randomUUID()` só existe em contexto seguro.

<div align="center"><img src="https://img.shields.io/badge/-14265E?style=flat&color=14265E" width="24%" height="3"><img src="https://img.shields.io/badge/-C1272D?style=flat&color=C1272D" width="24%" height="3"><img src="https://img.shields.io/badge/-F2C33C?style=flat&color=F2C33C" width="24%" height="3"><img src="https://img.shields.io/badge/-1B3A93?style=flat&color=1B3A93" width="24%" height="3"></div>

## 🛰 Cinturão de ferramentas

**Front-end** — Escrevo **TypeScript** sobre **JavaScript** em componentes **React**, monto o build com **Vite**, uso **Next.js** quando SSR e rota entram na conta, e estilo com **Tailwind CSS** partindo do mobile.

![TypeScript](https://img.shields.io/badge/TypeScript-C1272D?style=for-the-badge&logo=typescript&logoColor=F5F3EA)
![React](https://img.shields.io/badge/React-F2C33C?style=for-the-badge&logo=react&logoColor=14265E)
![Next.js](https://img.shields.io/badge/Next.js-1B3A93?style=for-the-badge&logo=nextdotjs&logoColor=F5F3EA)
![Vite](https://img.shields.io/badge/Vite-14265E?style=for-the-badge&logo=vite&logoColor=F5F3EA)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-C1272D?style=for-the-badge&logo=tailwindcss&logoColor=F5F3EA)

**Back-end** — Sirvo **REST API** em **NestJS** rodando sobre **Node.js**, modelo e consulto o banco com **Prisma** em cima de **PostgreSQL**.

![Node.js](https://img.shields.io/badge/Node.js-F2C33C?style=for-the-badge&logo=nodedotjs&logoColor=14265E)
![NestJS](https://img.shields.io/badge/NestJS-1B3A93?style=for-the-badge&logo=nestjs&logoColor=F5F3EA)
![Prisma](https://img.shields.io/badge/Prisma-14265E?style=for-the-badge&logo=prisma&logoColor=F5F3EA)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-C1272D?style=for-the-badge&logo=postgresql&logoColor=F5F3EA)

**Dados** — Extraio, limpo e normalizo tabela grande com **Python** e **pandas** antes de qualquer coisa entrar no banco.

![Python](https://img.shields.io/badge/Python-F2C33C?style=for-the-badge&logo=python&logoColor=14265E)
![pandas](https://img.shields.io/badge/pandas-1B3A93?style=for-the-badge&logo=pandas&logoColor=F5F3EA)

**Infraestrutura** — Versiono com **Git**, monto pipeline de **CI/CD** com **GitHub Actions**, empacoto serviço com **Docker** e trabalho em **Linux** como sistema principal: Arch e Kali em bare metal, não em máquina virtual.

![Docker](https://img.shields.io/badge/Docker-14265E?style=for-the-badge&logo=docker&logoColor=F5F3EA)
![Git](https://img.shields.io/badge/Git-C1272D?style=for-the-badge&logo=git&logoColor=F5F3EA)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-F2C33C?style=for-the-badge&logo=githubactions&logoColor=14265E)
![Linux](https://img.shields.io/badge/Linux-1B3A93?style=for-the-badge&logo=linux&logoColor=F5F3EA)

<div align="center"><img src="https://img.shields.io/badge/-14265E?style=flat&color=14265E" width="24%" height="3"><img src="https://img.shields.io/badge/-C1272D?style=flat&color=C1272D" width="24%" height="3"><img src="https://img.shields.io/badge/-F2C33C?style=flat&color=F2C33C" width="24%" height="3"><img src="https://img.shields.io/badge/-1B3A93?style=flat&color=1B3A93" width="24%" height="3"></div>

## 🌑 O lado escuro

Estudo segurança ofensiva: fundamentos de rede, exploração e análise de tráfego. Escrevi do zero o `sentinela.py`, um auditor de tráfego em **Python** construído sobre o tshark — sinaliza beaconing pelo coeficiente de variação no intervalo entre pacotes e cruza os IPs suspeitos com whois.

Já pus a mão em nmap, tshark, Wireshark, Burp Suite, Scapy e hping3, com laboratório em VirtualBox. Fora do laboratório, configurei DNS over TLS com DNSSEC, Pi-hole, Secure Boot com sbctl e hardening de roteador.

Agora refaço essa trilha desde os fundamentos, comando por comando, rodando cada coisa no laboratório antes de seguir. Ferramenta que eu não sei explicar não conta.

<div align="center"><img src="https://img.shields.io/badge/-14265E?style=flat&color=14265E" width="24%" height="3"><img src="https://img.shields.io/badge/-C1272D?style=flat&color=C1272D" width="24%" height="3"><img src="https://img.shields.io/badge/-F2C33C?style=flat&color=F2C33C" width="24%" height="3"><img src="https://img.shields.io/badge/-1B3A93?style=flat&color=1B3A93" width="24%" height="3"></div>

## ★ Registro de bordo

**O que eu faço bem**

- Separo regra de negócio de interface e testo a regra em TypeScript puro, sem montar DOM.
- Defendo cada decisão de arquitetura com o motivo — e corto ferramenta que não paga o próprio custo, como Docker num deploy estático.
- Escrevo acessibilidade à mão em vez de esperar que o framework resolva.
- Vou até a causa do bug, registro a armadilha e não caio nela duas vezes.

**Onde eu estou agora**

- Um projeto publicado, os outros ainda no repositório: o gerador está [no ar](https://empreiteira-website.vercel.app) desde o primeiro dia em que teve o que mostrar, e a API do SINAPI é a próxima a sair.
- Poucos dias de commit nos últimos doze meses: o diário começa agora, e a página acima é a prova pública disso, dia a dia.
- Trilha de segurança recomeçada do zero: decisão deliberada de entender antes de acumular ferramenta.

<div align="center"><img src="https://img.shields.io/badge/-14265E?style=flat&color=14265E" width="24%" height="3"><img src="https://img.shields.io/badge/-C1272D?style=flat&color=C1272D" width="24%" height="3"><img src="https://img.shields.io/badge/-F2C33C?style=flat&color=F2C33C" width="24%" height="3"><img src="https://img.shields.io/badge/-1B3A93?style=flat&color=1B3A93" width="24%" height="3"></div>

## 📡 Transmissão

Moro em Araçariguama, São Paulo, Brasil, e procuro posição remota como Desenvolvedor Full Stack — trabalho tanto no Front-end quanto no Back-end.

**winston.19i80@gmail.com**

<div align="center"><img src="https://img.shields.io/badge/-14265E?style=flat&color=14265E" width="24%" height="3"><img src="https://img.shields.io/badge/-C1272D?style=flat&color=C1272D" width="24%" height="3"><img src="https://img.shields.io/badge/-F2C33C?style=flat&color=F2C33C" width="24%" height="3"><img src="https://img.shields.io/badge/-1B3A93?style=flat&color=1B3A93" width="24%" height="3"></div>

<details>
<summary><b>🔭 Read this in English</b></summary>

<br>

## ☄ Fifteen seconds

> **I build web applications end to end** — interfaces in **React** with **TypeScript**, **REST API** in **NestJS** over **PostgreSQL**.
>
> **I write the test before the code** and keep business rules out of the interface: the math is tested without mounting a DOM, and every architecture decision ships with the reason written next to it.
>
> **Live:** a labor-cost estimate generator for civil construction. Services go in line by line, the math runs on exact decimal arithmetic and comes out formatted in Brazilian currency — all inside the browser, no server, no install, no data leaving the user's machine. PDF export is what I'm writing right now. **[Open it →](https://empreiteira-website.vercel.app)**
>
> **I'm looking for a remote position as a Full Stack Developer.** → **dev.gabriel2000@gmail.com**

The rest of this page is the evidence behind those four lines.

## ✦ The diary

Winston Smith bought a blank notebook and started writing dates in it. Not because he had anything grand to say — because a record made at the time is the one thing nobody can rewrite later.

That page is the notebook. Every stroke is a day when the work actually happened: a commit written, a test run, a bug closed. A heavier stroke means a heavier day. There are no filler commits here to fill a line. An empty day stays blank.

I'm starting close to blank. That's the point — the next page gets written now, and every date on it can be checked.

## 🪐 Current orbit

**The problem it solves:** anyone pricing labor in civil construction needs a number they can trust and a document to hand the client. The generator I'm building does both inside the browser — **Vite** with **React 19**, **TypeScript** and **Tailwind CSS**, a static application with nothing travelling to a server. It's live and ships on every change to `main`: **[empreiteira-website.vercel.app](https://empreiteira-website.vercel.app)**.

Four decisions I'll defend line by line:

- **No back-end.** Nothing in the flow requires a server. Adding one would only create state to sync, cost to pay and surface to attack.
- **Vite instead of Next.js.** There's no SSR, routing or SEO at stake here. I reach for Next.js when those three are on the table; in this project they aren't.
- **Core split from the interface.** Business rules live in plain **TypeScript** (`tipos.ts`, `validacao.ts`, `calcularSubtotal.ts`) with no React import. I test the math without mounting a single DOM node.
- **Exact decimal arithmetic instead of floats.** `0.1 + 0.2` isn't `0.3` in binary floating point, and in an estimate that gap is a wrong cent in front of the client. Rounding happens once, explicitly, at two decimals.

By the same standard, **Docker** stayed out: on static hosting a production Dockerfile does nothing. Docker is reserved for the back-end with **PostgreSQL**, where it solves a real problem.

Details that only surface in real use: numeric fields use `type="text"` with `inputMode="decimal"`, because `type="number"` blocks the Brazilian decimal comma; units follow SINAPI table naming — m², m³, vb, h; and accessibility is written by hand, with `useId` tied to `htmlFor`, `role="alert"` on errors and `aria-describedby` linking field to message.

Before that I wrote an ETL for the SINAPI table — extraction with **Python** and **pandas**, modeling in **Prisma**, loading into **PostgreSQL** and a **REST API** in **NestJS** — plus a scheduling back-end in **NestJS** with **JWT** authentication and refresh-token rotation, a `RolesGuard` with a `@Roles()` decorator, the Repository Pattern over Prisma, and tests running against a separate PostgreSQL database.

## ✧ Laws of motion

- **I write the test, watch it fail, then make it pass.** Then I break the code on purpose to confirm the test is testing anything at all. A test that has never failed hasn't proven anything, and one that passes against broken code is confirming the wrong number. That's what **TDD** means, or it means nothing.
- **Small semantic commits** (`feat:`, `fix:`, `test:`, `docs:`, `chore:`), short subject, body in bullets. One **Git** branch per goal. Nothing ends the day uncommitted.
- **I sketch the interface on paper before opening the editor.** A mobile-first layout solved on paper costs far less than one solved in the browser.
- **I type code by hand instead of pasting it.** Muscle memory doesn't come from `Ctrl+V`.
- **When a bug catches me, I go to the root cause and write it down.** Already in the notebook: `typeof NaN === "number"` (use `Number.isNaN`); a `<select value="">` without an `<option value="">` silently falls to the first option; an empty `<input type="number">` arrives as `null`, not an empty string; `crypto.randomUUID()` only exists in a secure context.

## 🛰 Tool belt

**Front-end** — I write **TypeScript** over **JavaScript** in **React** components, build with **Vite**, reach for **Next.js** when SSR and routing are on the table, and style with **Tailwind CSS**, mobile first.

**Back-end** — I serve a **REST API** in **NestJS** on **Node.js**, and model and query the database with **Prisma** over **PostgreSQL**.

**Data** — I extract, clean and normalize large tables with **Python** and **pandas** before anything reaches the database.

**Infrastructure** — I version with **Git**, build **CI/CD** pipelines with **GitHub Actions**, package services with **Docker**, and run **Linux** as my main system: Arch and Kali on bare metal, not in a VM.

## 🌑 The dark side

I study offensive security: network fundamentals, exploitation and traffic analysis. I wrote `sentinela.py` from scratch, a traffic auditor in **Python** built on top of tshark — it flags beaconing through the coefficient of variation of inter-packet intervals and cross-references suspicious IPs with whois.

I've worked with nmap, tshark, Wireshark, Burp Suite, Scapy and hping3 in a VirtualBox lab. Outside the lab, I've configured DNS over TLS with DNSSEC, Pi-hole, Secure Boot with sbctl and router hardening.

Right now I'm rebuilding that track from the fundamentals, command by command, running everything in the lab before moving on. A tool I can't explain doesn't count.

## ★ Log entry

**What I do well**

- I keep business rules out of the interface and test them in plain TypeScript, with no DOM.
- I back every architecture decision with a reason — and cut any tool that doesn't earn its cost, like Docker on a static deploy.
- I write accessibility by hand instead of waiting for the framework to handle it.
- I chase a bug to its root cause, log the trap and don't fall into it twice.

**Where I stand right now**

- One project published, the others still in the repository: the estimate generator has been [live](https://empreiteira-website.vercel.app) since the first day it had something to show, and the SINAPI API is next out the door.
- Few commit days in the last twelve months: the diary starts now, and the page above is the public proof of it, day by day.
- Security track restarted from zero: a deliberate choice to understand before collecting tools.

## 📡 Transmission

I live in São Paulo, Brazil, and I'm looking for a remote position as a Full Stack Developer or Web Developer, working across both Front-end and Back-end.

**dev.gabriel2000@gmail.com**

</details>

<div align="center">

<div align="center"><img src="https://img.shields.io/badge/-14265E?style=flat&color=14265E" width="15%" height="3"><img src="https://img.shields.io/badge/-C1272D?style=flat&color=C1272D" width="15%" height="3"><img src="https://img.shields.io/badge/-F2C33C?style=flat&color=F2C33C" width="15%" height="3"><img src="https://img.shields.io/badge/-1B3A93?style=flat&color=1B3A93" width="15%" height="3"></div>

<sub>Registro feito na hora. Data conferível depois. / Written on the day. Every date checkable.</sub>

</div>
