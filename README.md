<div align="center">

# 📓 wsmithdiary

### Desenvolvedor · React · TypeScript · Node

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

**Disponível para remoto**

[![LinkedIn](https://img.shields.io/badge/Falar_comigo-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/SEU-PERFIL)

</div>

---

## 📓 O diário

Escrevo interfaces em React com TypeScript e serviços em Node.

Trabalho com a lógica separada da interface: regra de negócio em TypeScript
puro, testada sem renderizar nada. Escrevo o teste antes e confirmo que ele
falha — teste que nunca falhou não provou nada.

> [!NOTE]
> O nome vem do diário de Winston Smith, em *1984*. Ele escrevia sabendo que
> aquilo poderia ser lido por qualquer um. Este perfil segue a mesma regra:
> aqui fica o que eu sustento em público. O resto é conversa.

<div align="center">

```
COMMIT É MEMÓRIA
TESTE É VERDADE
README É LIBERDADE
```

</div>

---

## 🎯 O que eu entrego

<table>
<tr>
<th>⚙️ Sem consultar nada</th>
<th>📖 Consultando a documentação</th>
</tr>
<tr>
<td>

- Componente React com estado, efeito e `fetch`
- Tipagem em TypeScript no dia a dia
- HTML semântico e CSS com Tailwind
- Branch, commit semântico, fluxo de PR

</td>
<td>

- Suíte de testes com Vitest e Testing Library
- Formulário acessível: `useId`, `aria-describedby`, `role="alert"`
- Modelagem e consulta em PostgreSQL
- Conflito de merge e reescrita de histórico

</td>
</tr>
</table>

> [!TIP]
> **Estudando agora:** segurança ofensiva, redes e arquitetura de aplicação que
> aguenta uso real.

---

## 🔄 Como eu trabalho

```mermaid
flowchart LR
    A["✍️ escrevo o teste"] --> B["🔴 vejo falhar"]
    B --> C["🔧 corrijo"]
    C --> D["🟢 vejo passar"]
    D --> E["📌 commit"]
    E --> A

    classDef vermelho fill:#7f1d1d,stroke:#ef4444,stroke-width:2px,color:#fecaca
    classDef verde fill:#14532d,stroke:#22c55e,stroke-width:2px,color:#bbf7d0
    classDef ambar fill:#78350f,stroke:#f59e0b,stroke-width:2px,color:#fde68a
    class B vermelho
    class D verde
    class A,C,E ambar
```

No Ministério da Verdade, o registro inconveniente ia para o buraco da memória e
passava a nunca ter existido. `git` não tem buraco de memória — e é por isso que
o histórico serve de currículo.

---

## 🧾 Projeto

<div align="center">

### Gerador de Orçamentos

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=flat-square&logo=vitest&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)

</div>

Aplicação web que monta orçamento de mão de obra linha a linha, calcula os
totais e exporta o PDF pronto. Sem back-end, sem etapa extra.

**Decisões que eu defendo:**

- 🧮 A regra de negócio vive em `core/`, em TypeScript puro que não importa
  React. A maior parte da lógica é testada sem DOM e sem `act()`.
- 🇧🇷 Campos numéricos são `type="text"` com `inputMode="decimal"`, porque
  `type="number"` recusa a vírgula decimal que o usuário brasileiro digita. A
  conversão acontece na validação, num só lugar.
- 🧼 Validação é função pura: devolve os erros por campo e deixa a decisão com o
  componente.
- ♿ Acessibilidade não é enfeite — é o que faz o formulário ser testável por
  papel e por nome, do jeito que o usuário o enxerga.

<div align="center">

[![Ver o repositório](https://img.shields.io/badge/Ver_o_repositório-1c1917?style=for-the-badge&logo=github&logoColor=f59e0b)](https://github.com/wsmithdiary/SEU-REPO)

</div>

---

<div align="center">

## 📡 Contato

Currículo, nome completo e histórico pelo LinkedIn.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/SEU-PERFIL)

<br>

<sub><i>"Quem controla o passado controla o futuro."<br>
Por isso o histórico fica público e o resto não.</i></sub>

</div>
