# Refatoracao do Site de Documentos Juridicos - Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrar o site de documentos juridicos de HTML monolitico para Astro com static export, nova paleta visual suave, componentes reutilizaveis e deploy automatico no GitHub Pages.

**Architecture:** Astro gera HTML estatico puro a partir de componentes .astro e dados JSON. Interatividade client-side (busca, colapsar) via JavaScript vanilla. Deploy via GitHub Actions.

**Tech Stack:** Astro 5.x, CSS nativo, JavaScript vanilla, GitHub Pages

---

## File Structure

```
├── .github/workflows/deploy.yml          (novo — GitHub Actions)
├── astro.config.mjs                      (novo — config Astro)
├── package.json                          (novo — dependencias)
├── src/
│   ├── components/
│   │   ├── Header.astro                  (novo — barra de info)
│   │   ├── HeroBanner.astro              (novo — titulo + descricao)
│   │   ├── SearchBox.astro               (novo — input de busca)
│   │   ├── DocumentCard.astro            (novo — item de documento)
│   │   ├── CategorySection.astro         (novo — secao colapsavel)
│   │   ├── FAQItem.astro                 (novo — pergunta/resp colapsavel)
│   │   ├── FAQSection.astro              (novo — grupo de FAQ)
│   │   └── Footer.astro                  (novo — rodape)
│   ├── layouts/
│   │   └── MainLayout.astro              (novo — HTML base + SEO)
│   ├── pages/
│   │   └── index.astro                   (novo — pagina principal)
│   ├── data/
│   │   └── documents.json                (novo — todos os dados)
│   ├── styles/
│   │   └── global.css                    (novo — variaveis + resets)
└── public/
    ├── scripts/
    │   └── search.js                     (novo — busca client-side)
└── public/
    ├── documentos/                       (mover PDFs existentes)
    ├── favicon-32x32.png                 (mover)
    ├── apple-touch-icon.png              (mover)
    └── og-image.png                      (mover)
```

---

### Task 1: Inicializar Projeto Astro

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`

- [ ] **Step 1: Criar package.json**

```json
{
  "name": "documentos-juridicos",
  "type": "module",
  "version": "2.0.0",
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "^5.7.0"
  }
}
```

- [ ] **Step 2: Criar astro.config.mjs**

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://dpmg2025.github.io',
  base: '/documentos',
});
```

- [ ] **Step 3: Instalar dependencias**

Run: `npm install`
Expected: `node_modules/` criado, sem erros

- [ ] **Step 4: Commit**

```bash
git add package.json astro.config.mjs
git commit -m "chore: inicializa projeto Astro"
```

---

### Task 2: Criar documents.json

**Files:**
- Create: `src/data/documents.json`

- [ ] **Step 1: Criar arquivo com todos os documentos e categorias**

```json
{
  "categories": [
    {
      "id": "alimentos",
      "title": "Alimentos",
      "icon": "💰",
      "headerColor": "#f0f5f0",
      "documents": [
        { "name": "Alimentos para Menor", "filename": "ALIMENTOS MENOR.pdf" },
        { "name": "Alimentos dos Avos", "filename": "ALIMENTOS_AVOENGOS.pdf" },
        { "name": "Alimentos Gravidicos", "filename": "ALIMENTOS_GRAVIDICOS.pdf" },
        { "name": "Execucao de Alimentos", "filename": "EXECUCAO_DE_ALIMENTOS.pdf" },
        { "name": "Exoneracao de Alimentos", "filename": "EXONERACAO_DE_ALIMENTOS.pdf" },
        { "name": "Oferta de Alimentos com Regulamentacao de Visitas", "filename": "OFERTA_DE_ALIMENTOS_COM_REGULAMENTACAO_DE_VISITAS.pdf" },
        { "name": "Acao Revisional de Alimentos - Diminuir", "filename": "Acao Revisonal de Alimentos - Diminuir.pdf" },
        { "name": "Revisional de Alimentos - Aumento", "filename": "REVISIONAL_DE_ALIMENTOS_-_AUMENTO.pdf" },
        { "name": "Kit Alimentos para Maior", "filename": "Kit Alimentos Maior.pdf" }
      ]
    },
    {
      "id": "divorcio",
      "title": "Divorcio e Separacao",
      "icon": "💔",
      "headerColor": "#f5f0f5",
      "documents": [
        { "name": "Divorcio Consensual", "filename": "Divorcio Consensual..pdf" },
        { "name": "Divorcio Litigioso", "filename": "Divorcio Litigioso 1.pdf" },
        { "name": "Conversao de Separacao Judicial em Divorcio Consensual", "filename": "Conversao de Separacao Judicial em Divorcio Consensual.pdf" },
        { "name": "Conversao de Separacao Judicial em Divorcio Litigioso", "filename": "Conversao de Separacao Judicial em Divorcio Litigioso.pdf" }
      ]
    },
    {
      "id": "paternidade",
      "title": "Paternidade",
      "icon": "👨‍👧",
      "headerColor": "#f0f3f8",
      "documents": [
        { "name": "Acao de Investigacao de Paternidade", "filename": "Acao de Investigacao de Paternidade.pdf" },
        { "name": "Investigacao de Paternidade - Menor", "filename": "INVESTIGACAO_DE_PATERNIDADE_ MENOR.pdf" },
        { "name": "Investigacao de Paternidade - Maior", "filename": "INVESTIGACAO_DE_PATERNIDADE_-_MAIOR.pdf" },
        { "name": "Negatoria de Paternidade", "filename": "NEGATORIA_DE_PATERNIDADE.pdf" }
      ]
    },
    {
      "id": "guarda",
      "title": "Guarda e Adocao",
      "icon": "👨‍👩‍👧",
      "headerColor": "#faf5f0",
      "documents": [
        { "name": "Adocao de Maior", "filename": "ADOCAO_MAIOR.pdf" },
        { "name": "Acao de Guarda", "filename": "Acao de Guarda.pdf" },
        { "name": "Guarda de Terceiros", "filename": "GUARDA_DE_TERCEIROS.pdf" },
        { "name": "Regulamentacao de Visitas", "filename": "REGULAMENTACAO_DE_VISITAS (1).pdf" }
      ]
    },
    {
      "id": "outros",
      "title": "Outros Documentos",
      "icon": "📄",
      "headerColor": "#f5f8f0",
      "documents": [
        { "name": "Acao de Interdicao", "filename": "Acao de Interdicao.pdf" },
        { "name": "Alvara Judicial - Lista de Documentos", "filename": "ALVARA JUDICIAL - Lista de documentos.pdf" },
        { "name": "Documentos para Comprovar Renda", "filename": "Documentos para comprovar renda.pdf" },
        { "name": "Modelo Planilha de Gastos Mensais", "filename": "MODELO PLANILHA DE GASTOS MENSAIS.pdf" }
      ]
    },
    {
      "id": "declaracoes",
      "title": "Declaracoes",
      "icon": "✍️",
      "headerColor": "#f0f5f8",
      "documents": [
        { "name": "Declaracao de Ausencia de Bens (Guarda e Curatela)", "filename": "DECLARACAO_DE_AUSENCIA_DE_BENS_(GUARDA_E_CURATELA).pdf" },
        { "name": "Declaracao de Concordancia - Guarda, Curatela e Tutela", "filename": "DECLARACAO_DE_CONCORDANCIA_GUARDA_CURATELA_TUTELA.pdf" },
        { "name": "Declaracao de Inexistencia de Impedimentos", "filename": "DECLARACAO_DE_INEXISTENCIA_DE_IMPEDIMENTOS.pdf" },
        { "name": "Kit Declaracao de Ausencia", "filename": "Kit Declaracao de Ausencia.pdf" },
        { "name": "Relatorio Medico Geral - Curatela", "filename": "RELATORIO_MEDICO_GERAL_CURATELA.pdf" }
      ]
    }
  ],
  "faq": [
    {
      "category": "Alimentos (Pensao Alimenticia)",
      "questions": [
        { "q": "Quem pode pedir pensao alimenticia?", "a": "Filhos menores de idade, filhos maiores que estudam (ate 24 anos na faculdade), ex-conjuge ou ex-companheiro(a) que precisa de ajuda financeira, e ate mesmo pais idosos que precisam de sustento dos filhos." },
        { "q": "Existe um valor fixo ou uma porcentagem certa para a pensao alimenticia, como 30% do salario?", "a": "Nao. A ideia de que a pensao e sempre 30% do salario e um mito. O valor e definido caso a caso pelo juiz, que avalia a NECESSIDADE de quem vai receber e a POSSIBILIDADE financeira de quem vai pagar, buscando um valor justo e proporcional." },
        { "q": "A pensao para ex-mulher ou ex-marido dura para sempre?", "a": "Nao, como regra geral. A pensao para ex-conjuge e uma medida excepcional e temporaria, com o objetivo de ajudar a pessoa a se reorganizar financeiramente. A pensao vitalicia so ocorre em situacoes muito raras, como em caso de doenca que impeca o trabalho ou idade muito avancada." },
        { "q": "Se a pessoa nao pagar a pensao, posso proibi-la de ver o filho?", "a": "Nao. O direito de convivencia (visitas) do filho com os pais e independente da obrigacao de pagar a pensao. Impedir as visitas por falta de pagamento e ilegal e pode ser considerado alienacao parental, trazendo consequencias graves para quem impede." },
        { "q": "Quando meu filho fizer 18 anos, posso simplesmente parar de pagar a pensao?", "a": "Nao, de forma alguma. Atingir a maioridade nao cancela a pensao automaticamente. E um erro comum que pode gerar uma grande divida e risco de prisao. Voce precisa entrar com um processo judicial especifico chamado ACAO DE EXONERACAO DE ALIMENTOS." }
      ]
    },
    {
      "category": "Guarda",
      "questions": [
        { "q": "Quando posso pedir a guarda do meu filho?", "a": "Quando os pais se separam, quando um dos pais nao cuida bem da crianca, ou quando ha risco para o filho ficar com o outro genitor." },
        { "q": "Que tipo de guarda existe?", "a": "GUARDA COMPARTILHADA: os dois pais decidem sobre a vida do filho juntos, mas a crianca reside na casa de um dos pais. GUARDA UNILATERAL: so um dos pais decide sobre a vida do filho." },
        { "q": "Na guarda compartilhada, a crianca fica uma semana na casa de cada um?", "a": "Nao necessariamente. Guarda compartilhada nao significa moradia alternada. A crianca tera uma residencia principal fixa com um dos pais, e o outro tera o direito de convivencia (visitas) regulamentado para manter a rotina da crianca." },
        { "q": "Na guarda compartilhada, preciso pagar pensao?", "a": "Sim, ainda precisa. Guarda compartilhada nao significa dividir gastos meio a meio." },
        { "q": "O que o juiz considera para dar a guarda?", "a": "Quem cuida melhor da crianca. Quem tem melhores condicoes (nao so financeiras). Quem nao atrapalha a convivencia com o outro genitor. O que e melhor para a crianca." }
      ]
    },
    {
      "category": "Divorcio",
      "questions": [
        { "q": "Qual a diferenca entre um divorcio amigavel (consensual) e um com briga (litigioso)?", "a": "O consensual ocorre quando o casal concorda com tudo (separacao, divisao de bens, etc.) e e muito mais rapido e barato. O litigioso acontece quando ha discordancia sobre qualquer ponto, exigindo um processo judicial mais longo e caro para que um juiz decida as questoes." },
        { "q": "Preciso de motivo para me divorciar?", "a": "Nao. Desde 2010, nao precisa explicar por que quer se separar." },
        { "q": "Se meu marido/esposa nao quiser se divorciar, posso me divorciar mesmo assim?", "a": "Sim. O divorcio pode ser feito mesmo se so uma pessoa quiser." },
        { "q": "Como ficam os bens no divorcio?", "a": "COMUNHAO PARCIAL: divide tudo que foi comprado depois do casamento. COMUNHAO UNIVERSAL: divide tudo. SEPARACAO DE BENS: cada um fica com o seu." },
        { "q": "Divorcio na Defensoria e gratuito?", "a": "Sim, totalmente gratuito, inclusive as custas do cartorio." }
      ]
    },
    {
      "category": "Uniao Estavel",
      "questions": [
        { "q": "Quanto tempo morando junto vira uniao estavel?", "a": "Nao existe tempo minimo. Depende de como voces vivem: como se fossem casados, dividindo tudo, sendo reconhecidos como casal pela familia." },
        { "q": "Preciso registrar a uniao estavel em cartorio?", "a": "Nao e obrigatorio, mas ajuda a provar que voces viviam como casados." },
        { "q": "Como provo que tenho uniao estavel?", "a": "Declaracao de imposto de renda como dependente. Conta de luz/agua no nome dos dois. Plano de saude como dependente. Fotos e testemunhas. Filho em comum." },
        { "q": "Uniao estavel tem os mesmos direitos do casamento?", "a": "Sim, quase todos: pensao, heranca, divisao de bens, INSS." },
        { "q": "Se meu companheiro morrer, tenho direito a heranca?", "a": "Sim, voce tem os mesmos direitos de uma esposa." }
      ]
    },
    {
      "category": "Curatela",
      "questions": [
        { "q": "Quando devo pedir a curatela para um familiar?", "a": "Peca quando seu familiar nao consegue mais entender as consequencias das suas decisoes, especialmente sobre dinheiro e bens. Por exemplo: se ele tem Alzheimer e esta sendo enganado, se gasta todo o dinheiro da aposentadoria sem controle, ou se alguem esta se aproveitando dele para pegar seus bens." },
        { "q": "Quem pode ser curador?", "a": "Primeiro o conjuge/companheiro, depois os filhos e outros parentes proximos, nessa ordem. O juiz sempre escolhe quem vai cuidar melhor da pessoa. Pode ser mais de uma pessoa dividindo as responsabilidades." },
        { "q": "O que posso fazer como curador?", "a": "Voce pode cuidar do dinheiro, pagar contas, receber aposentadoria, fazer compras necessarias. Para vender casa ou fazer negocios grandes, precisa pedir autorizacao do juiz. Para emergencias medicas, pode decidir normalmente." },
        { "q": "Preciso prestar contas para alguem?", "a": "Sim. Todo ano voce deve fazer um relatorio mostrando como gastou o dinheiro da pessoa. Esse relatorio vai para o Ministerio Publico e para o juiz. Guarde todos os recibos e comprovantes." },
        { "q": "Posso usar o dinheiro da pessoa para outros gastos?", "a": "Nao. O dinheiro e so para as necessidades da pessoa curatelada: remedios, medico, comida, moradia, cuidadores. Voce nao pode usar para suas proprias despesas." },
        { "q": "O que acontece se meu familiar melhorar?", "a": "A curatela pode ser cancelada se a pessoa recuperar a capacidade. Voce pode pedir para o juiz fazer uma nova avaliacao medica. Se o medico disser que ela melhorou, a curatela e retirada." },
        { "q": "Posso movimentar a conta bancaria da pessoa ou vender imoveis?", "a": "Somente apos o processo de curatela chegar ao final. Leve a certidao de curatela no banco. Alguns bancos exigem que voce abra uma conta nova em nome da pessoa, mas sob sua responsabilidade. No caso de venda de imoveis e necessario ajuizar acao de alvara judicial apos o fim do processo de curatela." },
        { "q": "Como funciona com aposentadoria e beneficios?", "a": "Voce pode receber aposentadoria, pensao e outros beneficios em nome da pessoa. No INSS, apresente a certidao de curatela. Para prova de vida, voce pode fazer pela pessoa curatelada." }
      ]
    }
  ]
}
```

- [ ] **Step 2: Commit**

```bash
git add src/data/documents.json
git commit -m "data: adiciona documents.json com todas as categorias e FAQs"
```

---

### Task 3: Criar global.css

**Files:**
- Create: `src/styles/global.css`

- [ ] **Step 1: Criar arquivo CSS com variaveis e resets**

```css
/* ===== Variables ===== */
:root {
  --primary: #1a5c52;
  --primary-dark: #124a42;
  --text-primary: #2a3a2a;
  --text-secondary: #5a6a5a;
  --bg-page: #f8faf8;
  --bg-card: #ffffff;
  --border: #e8ede8;
  --shadow: 0 1px 4px rgba(0,0,0,0.06);
  --radius: 10px;
  --radius-sm: 8px;
  --transition: all 0.2s ease;
}

/* ===== Reset ===== */
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* ===== Base ===== */
html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-primary);
  background: var(--bg-page);
  min-height: 100vh;
}

/* ===== Typography ===== */
h1, h2 {
  font-family: 'Crimson Pro', Georgia, serif;
  font-weight: 700;
  line-height: 1.2;
}

h1 {
  font-size: 2.5rem;
  color: var(--primary);
}

h2 {
  font-size: 1.8rem;
  color: var(--primary);
}

h3 {
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
}

/* ===== Utilities ===== */
.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 24px;
}

@media (min-width: 768px) {
  .container {
    padding: 0 32px;
  }
}

.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--primary-dark);
  color: white;
  padding: 8px 16px;
  z-index: 100;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  transition: top 0.3s;
}

.skip-link:focus {
  top: 0;
}

/* ===== Buttons ===== */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: var(--transition);
  border: none;
}

.btn-primary {
  background: var(--primary);
  color: white;
}

.btn-primary:hover {
  background: var(--primary-dark);
}

.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid #c8d4c8;
}

.btn-secondary:hover {
  background: var(--bg-page);
}

/* ===== Accessibility ===== */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

/* ===== Search Highlight ===== */
.search-highlight {
  background: rgba(155, 197, 61, 0.35);
  padding: 1px 2px;
  border-radius: 2px;
  font-weight: 600;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/global.css
git commit -m "styles: adiciona global.css com variaveis e resets"
```

---

### Task 4: Criar MainLayout.astro

**Files:**
- Create: `src/layouts/MainLayout.astro`

- [ ] **Step 1: Criar layout base com SEO meta tags**

```astro
---
import '../styles/global.css';

export interface Props {
  title?: string;
  description?: string;
}

const { 
  title = 'Modelos de Documentos Juridicos - Defensoria Publica Divinopolis',
  description = 'Acesse e baixe modelos de documentos para questoes juridicas familiares. Atendimento gratuito.'
} = Astro.props;
---

<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content={description}>
  <meta name="keywords" content="documentos juridicos, defensoria publica, divinopolis, alimentos, divorcio, guarda, paternidade, curatela">
  <meta name="author" content="Defensoria Publica - Divinopolis">
  <meta name="theme-color" content="#1a5c52">
  
  <meta property="og:title" content={title}>
  <meta property="og:description" content={description}>
  <meta property="og:type" content="website">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:image" content="https://dpmg2025.github.io/documentos/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content={title}>
  <meta name="twitter:description" content={description}>
  
  <link rel="icon" type="image/png" sizes="32x32" href="/documentos/favicon-32x32.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/documentos/apple-touch-icon.png">
  <link rel="canonical" href="https://dpmg2025.github.io/documentos/">
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
  
  <title>{title}</title>
</head>
<body>
  <a href="#main-content" class="skip-link">Pular para o conteudo principal</a>
  <main id="main-content">
    <slot />
  </main>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add src/layouts/MainLayout.astro
git commit -m "layout: adiciona MainLayout com SEO e acessibilidade"
```

---

### Task 5: Criar Header.astro

**Files:**
- Create: `src/components/Header.astro`

- [ ] **Step 1: Criar componente de barra superior**

```astro
---
---

<header style="background: var(--primary); color: white; padding: 12px 0; font-size: 0.9rem;">
  <div class="container" style="text-align: center;">
    📍 Av. JK, 1199, Bom Pastor | ⏰ Atendimento: 8h30–11h30 e 13h–15h
  </div>
</header>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Header.astro
git commit -m "feat: adiciona Header com info da defensoria"
```

---

### Task 6: Criar HeroBanner.astro

**Files:**
- Create: `src/components/HeroBanner.astro`

- [ ] **Step 1: Criar hero limpo com titulo e descricao**

```astro
---
---

<section style="background: var(--bg-card); padding: 56px 0; text-align: center; border-bottom: 1px solid var(--border);">
  <div class="container">
    <h1 style="margin-bottom: 16px;">⚖️ Modelos de Documentos Juridicos</h1>
    <p style="color: var(--text-secondary); font-size: 1.1rem; max-width: 600px; margin: 0 auto; line-height: 1.6;">
      Acesse e baixe modelos de documentos para questoes juridicas familiares.<br>
      <strong style="color: var(--primary);">Defensoria Publica de Divinopolis</strong> — Atendimento gratuito
    </p>
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/HeroBanner.astro
git commit -m "feat: adiciona HeroBanner com titulo e descricao"
```

---

### Task 7: Criar SearchBox.astro

**Files:**
- Create: `src/components/SearchBox.astro`

- [ ] **Step 1: Criar input de busca com icone e atalhos**

```astro
---
---

<section style="padding: 32px 0; background: var(--bg-page);">
  <div class="container">
    <div style="max-width: 600px; margin: 0 auto; position: relative;">
      <svg style="position: absolute; left: 16px; top: 50%; transform: translateY(-50%); width: 20px; height: 20px; color: var(--text-secondary); pointer-events: none;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="7"/>
        <path d="M21 21l-4.35-4.35"/>
      </svg>
      <input 
        type="text" 
        id="searchBox" 
        placeholder="Buscar documentos e perguntas..." 
        aria-label="Buscar documentos e perguntas frequentes"
        autocomplete="off"
        style="width: 100%; padding: 16px 16px 16px 48px; font-size: 1rem; border: 2px solid #d4ddd4; border-radius: var(--radius-sm); background: white; font-family: 'Inter', sans-serif; color: var(--text-primary);"
      >
    </div>
    <div id="searchResultsInfo" style="margin-top: 12px; font-size: 0.875rem; color: var(--text-secondary); min-height: 1.4em; text-align: center;" aria-live="polite" aria-atomic="true"></div>
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/SearchBox.astro
git commit -m "feat: adiciona SearchBox com icone e acessibilidade"
```

---

### Task 8: Criar DocumentCard.astro

**Files:**
- Create: `src/components/DocumentCard.astro`

- [ ] **Step 1: Criar card de documento com botoes**

```astro
---
export interface Props {
  name: string;
  filename: string;
}

const { name, filename } = Astro.props;
const basePath = '/documentos/documentos/';
---

<div class="document-item" data-name={name.toLowerCase()} style="display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; border-bottom: 1px solid #f0f0f0; gap: 12px;">
  <span class="document-name" style="color: var(--text-primary); flex-grow: 1; font-size: 0.975rem;">{name}</span>
  <div style="display: flex; gap: 8px; flex-shrink: 0;">
    <a href={basePath + filename} target="_blank" class="btn btn-secondary" rel="noopener">👁 Visualizar</a>
    <a href={basePath + filename} download={filename} class="btn btn-primary">⬇ Baixar</a>
  </div>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/DocumentCard.astro
git commit -m "feat: adiciona DocumentCard com visualizar e baixar"
```

---

### Task 9: Criar CategorySection.astro

**Files:**
- Create: `src/components/CategorySection.astro`
- Modify: `src/styles/global.css` (adicionar estilos de categoria)

- [ ] **Step 1: Adicionar estilos de categoria no global.css**

```css
/* ===== Category Section ===== */
.category {
  background: var(--bg-card);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
  margin-bottom: 16px;
  transition: var(--transition);
}

.category:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.category-header {
  padding: 18px 24px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  border-bottom: 2px solid var(--border);
  transition: var(--transition);
  user-select: none;
}

.category-header:hover {
  opacity: 0.9;
}

.category-header .icon {
  font-size: 1.3rem;
}

.category-header .toggle {
  margin-left: auto;
  transition: transform 0.3s ease;
}

.category.collapsed .toggle {
  transform: rotate(-90deg);
}

.document-list {
  max-height: 2000px;
  overflow: hidden;
  transition: max-height 0.4s ease;
}

.category.collapsed .document-list {
  max-height: 0;
}
```

- [ ] **Step 2: Criar componente CategorySection**

```astro
---
import DocumentCard from './DocumentCard.astro';

export interface Props {
  id: string;
  title: string;
  icon: string;
  headerColor: string;
  documents: Array<{ name: string; filename: string }>;
}

const { id, title, icon, headerColor, documents } = Astro.props;
---

<div class="category" id={id}>
  <div 
    class="category-header" 
    style={`background: ${headerColor}; color: var(--text-primary);`}
    onclick={`toggleCategory('${id}')`}
    onkeydown={`if(event.key==='Enter'||event.key===' ')toggleCategory('${id}')`}
    role="button"
    tabindex="0"
    aria-expanded="true"
    aria-controls={`list-${id}`}
  >
    <span class="icon">{icon}</span>
    <span>{title}</span>
    <span class="toggle">▼</span>
  </div>
  <div class="document-list" id={`list-${id}`}>
    {documents.map(doc => (
      <DocumentCard name={doc.name} filename={doc.filename} />
    ))}
  </div>
</div>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/CategorySection.astro src/styles/global.css
git commit -m "feat: adiciona CategorySection colapsavel com DocumentCard"
```

---

### Task 10: Criar FAQItem.astro

**Files:**
- Create: `src/components/FAQItem.astro`
- Modify: `src/styles/global.css` (adicionar estilos FAQ)

- [ ] **Step 1: Adicionar estilos FAQ no global.css**

```css
/* ===== FAQ ===== */
.faq-section {
  padding: 40px 0;
  background: var(--bg-card);
}

.faq-container {
  display: grid;
  gap: 16px;
}

.faq-category {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px;
  background: #fafcfa;
}

.faq-category-title {
  color: var(--primary);
  font-family: 'Crimson Pro', serif;
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--border);
}

.faq-item {
  border-bottom: 1px solid #f0f0f0;
}

.faq-item:last-child {
  border-bottom: none;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  cursor: pointer;
  gap: 16px;
  transition: var(--transition);
}

.faq-question:hover {
  padding-left: 4px;
}

.faq-question-text {
  font-weight: 600;
  color: var(--text-primary);
  flex-grow: 1;
  display: flex;
  align-items: center;
  gap: 10px;
}

.faq-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--bg-page);
  color: var(--primary);
  font-size: 0.8rem;
  font-weight: 700;
  flex-shrink: 0;
}

.faq-question:hover .faq-number {
  background: var(--primary);
  color: white;
}

.faq-icon {
  font-size: 1.25rem;
  color: var(--primary);
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.faq-question.active .faq-icon {
  transform: rotate(45deg);
}

.faq-answer {
  color: var(--text-secondary);
  line-height: 1.7;
  font-size: 0.95rem;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease, padding 0.4s ease;
}

.faq-question.active + .faq-answer {
  max-height: 400px;
  padding-bottom: 16px;
}
```

- [ ] **Step 2: Criar componente FAQItem**

```astro
---
export interface Props {
  question: string;
  answer: string;
  number: number;
}

const { question, answer, number } = Astro.props;
---

<div class="faq-item">
  <div 
    class="faq-question"
    onclick="toggleFaq(this)"
    onkeydown="if(event.key==='Enter'||event.key===' ')toggleFaq(this)"
    role="button"
    tabindex="0"
    aria-expanded="false"
  >
    <span class="faq-question-text">
      <span class="faq-number" aria-hidden="true">{number}</span>
      {question}
    </span>
    <span class="faq-icon">+</span>
  </div>
  <div class="faq-answer">
    {answer}
  </div>
</div>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/FAQItem.astro src/styles/global.css
git commit -m "feat: adiciona FAQItem colapsavel com numeracao"
```

---

### Task 11: Criar FAQSection.astro

**Files:**
- Create: `src/components/FAQSection.astro`

- [ ] **Step 1: Criar componente que agrupa FAQs por categoria**

```astro
---
import FAQItem from './FAQItem.astro';

export interface Props {
  faqs: Array<{
    category: string;
    questions: Array<{ q: string; a: string }>;
  }>;
}

const { faqs } = Astro.props;
---

<section class="faq-section">
  <div class="container">
    <h2 style="text-align: center; margin-bottom: 32px;">❓ Perguntas Frequentes</h2>
    <div class="faq-container">
      {faqs.map(faqCategory => (
        <div class="faq-category">
          <h3 class="faq-category-title">{faqCategory.category}</h3>
          {faqCategory.questions.map((q, i) => (
            <FAQItem question={q.q} answer={q.a} number={i + 1} />
          ))}
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/FAQSection.astro
git commit -m "feat: adiciona FAQSection com agrupamento por categoria"
```

---

### Task 12: Criar Footer.astro

**Files:**
- Create: `src/components/Footer.astro`

- [ ] **Step 1: Criar rodape com informacoes da defensoria**

```astro
---
---

<footer style="background: var(--bg-page); color: var(--text-secondary); padding: 32px 0; text-align: center; font-size: 0.9rem; border-top: 1px solid var(--border); margin-top: 40px;">
  <div class="container">
    <p style="margin-bottom: 8px; color: var(--primary); font-weight: 600;">Defensoria Publica de Divinopolis</p>
    <p style="margin-bottom: 8px; font-size: 0.85rem;">Av. JK, 1199, Bom Pastor (em frente ao DIVISHOP) · Atendimento: 8h30-11h30 e 13h-15h</p>
    <p style="font-size: 0.75rem; opacity: 0.7;">© 2025 Modelos de Documentos Juridicos — Todos os direitos reservados · Atendimento gratuito</p>
  </div>
</footer>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.astro
git commit -m "feat: adiciona Footer com info da defensoria"
```

---

### Task 13: Criar index.astro

**Files:**
- Create: `src/pages/index.astro`

- [ ] **Step 1: Criar pagina principal que importa todos os componentes**

```astro
---
import MainLayout from '../layouts/MainLayout.astro';
import Header from '../components/Header.astro';
import HeroBanner from '../components/HeroBanner.astro';
import SearchBox from '../components/SearchBox.astro';
import CategorySection from '../components/CategorySection.astro';
import FAQSection from '../components/FAQSection.astro';
import Footer from '../components/Footer.astro';
import data from '../data/documents.json';
---

<MainLayout>
  <Header />
  <HeroBanner />
  <SearchBox />
  
  <section style="padding: 24px 0; background: var(--bg-page);">
    <div class="container">
      {data.categories.map((cat, i) => (
        <CategorySection 
          id={cat.id}
          title={cat.title}
          icon={cat.icon}
          headerColor={cat.headerColor}
          documents={cat.documents}
        />
      ))}
    </div>
  </section>
  
  <div id="noResultsMessage" style="display: none; text-align: center; padding: 48px 24px; color: var(--text-secondary); font-size: 1rem; background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius); margin: 0 24px;" role="status" aria-live="polite">
    <strong style="color: var(--text-primary); display: block; margin-bottom: 8px; font-size: 1.125rem;">Nenhum resultado encontrado</strong>
    Tente buscar com outras palavras ou verifique a ortografia.
  </div>
  
  <FAQSection faqs={data.faq} />
  <Footer />
  
  <button 
    id="fabScrollTop" 
    onclick="window.scrollTo({top: 0, behavior: 'smooth'})"
    aria-label="Voltar ao topo"
    style="position: fixed; bottom: 24px; right: 24px; width: 48px; height: 48px; border-radius: 50%; background: var(--primary); color: white; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.15); opacity: 0; transform: translateY(20px); transition: all 0.3s ease; z-index: 100; font-size: 1.25rem;"
  >
    ↑
  </button>
  
  <script src="/documentos/scripts/search.js" is:inline></script>
</MainLayout>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: adiciona pagina principal com todos os componentes"
```

---

### Task 14: Criar search.js

**Files:**
- Create: `public/scripts/search.js`

- [ ] **Step 1: Criar script de busca client-side completo**

```javascript
// ===== Category Toggle =====
function toggleCategory(categoryId) {
  const category = document.getElementById(categoryId);
  if (!category) return;
  const isCollapsed = category.classList.toggle('collapsed');
  const header = category.querySelector('.category-header');
  if (header) {
    header.setAttribute('aria-expanded', !isCollapsed);
  }
  try {
    const state = JSON.parse(localStorage.getItem('categoryStates') || '{}');
    state[categoryId] = !isCollapsed;
    localStorage.setItem('categoryStates', JSON.stringify(state));
  } catch (e) {}
}

// ===== FAQ Toggle =====
function toggleFaq(element) {
  element.classList.toggle('active');
  element.setAttribute('aria-expanded', element.classList.contains('active'));
}

// ===== Search =====
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightText(element, term) {
  if (!term) {
    element.querySelectorAll('.search-highlight').forEach(span => {
      const parent = span.parentNode;
      parent.replaceChild(document.createTextNode(span.textContent), span);
      parent.normalize();
    });
    return;
  }
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
  const nodesToReplace = [];
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.parentNode?.classList?.contains('search-highlight')) continue;
    if (node.textContent.toLowerCase().includes(term)) {
      nodesToReplace.push(node);
    }
  }
  nodesToReplace.forEach(node => {
    const parts = node.textContent.split(new RegExp('(' + escapeRegex(term) + ')', 'gi'));
    const fragment = document.createDocumentFragment();
    parts.forEach(part => {
      if (part.toLowerCase() === term) {
        const span = document.createElement('span');
        span.className = 'search-highlight';
        span.textContent = part;
        fragment.appendChild(span);
      } else {
        fragment.appendChild(document.createTextNode(part));
      }
    });
    node.parentNode.replaceChild(fragment, node);
  });
}

function countVisible(parent, selector) {
  return Array.from(parent.querySelectorAll(selector)).filter(el => 
    el.style.display !== 'none'
  ).length;
}

// ===== Restore Category States =====
function restoreCategoryStates() {
  try {
    const state = JSON.parse(localStorage.getItem('categoryStates') || '{}');
    Object.keys(state).forEach(categoryId => {
      const category = document.getElementById(categoryId);
      if (category) {
        const header = category.querySelector('.category-header');
        if (state[categoryId]) {
          category.classList.remove('collapsed');
          if (header) header.setAttribute('aria-expanded', 'true');
        } else {
          category.classList.add('collapsed');
          if (header) header.setAttribute('aria-expanded', 'false');
        }
      }
    });
  } catch (e) {}
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', function() {
  restoreCategoryStates();
  
  const searchBox = document.getElementById('searchBox');
  const searchResultsInfo = document.getElementById('searchResultsInfo');
  const noResultsMessage = document.getElementById('noResultsMessage');
  const allDocumentItems = document.querySelectorAll('.document-item');
  const allFaqItems = document.querySelectorAll('.faq-item');
  
  if (searchBox) {
    searchBox.addEventListener('input', function(e) {
      const searchTerm = e.target.value.toLowerCase().trim();
      let docMatches = 0;
      let faqMatches = 0;
      
      // Search documents
      allDocumentItems.forEach(item => {
        const documentName = item.getAttribute('data-name');
        const nameEl = item.querySelector('.document-name');
        if (documentName.includes(searchTerm)) {
          item.style.display = 'flex';
          docMatches++;
          if (searchTerm) highlightText(nameEl, searchTerm);
        } else {
          item.style.display = 'none';
          highlightText(nameEl, '');
        }
      });
      
      // Search FAQ
      allFaqItems.forEach(item => {
        const questionEl = item.querySelector('.faq-question-text');
        const answerEl = item.querySelector('.faq-answer');
        const questionText = questionEl.textContent.toLowerCase();
        const answerText = answerEl.textContent.toLowerCase();
        
        if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
          item.style.display = 'block';
          faqMatches++;
          if (searchTerm) {
            highlightText(questionEl, searchTerm);
            highlightText(answerEl, searchTerm);
          }
        } else {
          item.style.display = 'none';
          highlightText(questionEl, '');
          highlightText(answerEl, '');
        }
      });
      
      // Show/hide empty categories
      document.querySelectorAll('.category').forEach(category => {
        const visibleItems = countVisible(category, '.document-item');
        category.style.display = searchTerm && visibleItems === 0 ? 'none' : 'block';
      });
      
      // Show/hide empty FAQ categories
      document.querySelectorAll('.faq-category').forEach(category => {
        const visibleItems = countVisible(category, '.faq-item');
        category.style.display = searchTerm && visibleItems === 0 ? 'none' : 'block';
      });
      
      // Update results counter
      if (searchTerm) {
        const total = docMatches + faqMatches;
        let msg = '';
        if (docMatches > 0 && faqMatches > 0) {
          msg = `${total} resultados encontrados (${docMatches} documentos e ${faqMatches} FAQ)`;
        } else if (docMatches > 0) {
          msg = `${docMatches} documento${docMatches !== 1 ? 's' : ''} encontrado${docMatches !== 1 ? 's' : ''}`;
        } else if (faqMatches > 0) {
          msg = `${faqMatches} pergunta${faqMatches !== 1 ? 's' : ''} encontrada${faqMatches !== 1 ? 's' : ''}`;
        }
        searchResultsInfo.textContent = msg;
        if (noResultsMessage) {
          noResultsMessage.style.display = total === 0 ? 'block' : 'none';
        }
      } else {
        searchResultsInfo.textContent = '';
        if (noResultsMessage) {
          noResultsMessage.style.display = 'none';
        }
      }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
      if (e.key === '/' && document.activeElement !== searchBox) {
        e.preventDefault();
        searchBox.focus();
      }
      if (e.key === 'Escape' && document.activeElement === searchBox) {
        searchBox.blur();
      }
    });
  }
  
  // Scroll-to-top FAB
  const fab = document.getElementById('fabScrollTop');
  if (fab) {
    const header = document.querySelector('.hero-section') || document.querySelector('section');
    if (header) {
      const observer = new IntersectionObserver(function(entries) {
        fab.style.opacity = entries[0].isIntersecting ? '0' : '1';
        fab.style.transform = entries[0].isIntersecting ? 'translateY(20px)' : 'translateY(0)';
      }, { threshold: 0 });
      observer.observe(header);
    }
  }
});
```

- [ ] **Step 2: Commit**

```bash
git add public/scripts/search.js
git commit -m "feat: adiciona search.js com busca, highlight e toggle"
```

---

### Task 15: Mover Assets para public/

**Files:**
- Move: `favicon-32x32.png` → `public/favicon-32x32.png`
- Move: `apple-touch-icon.png` → `public/apple-touch-icon.png`
- Move: `og-image.png` → `public/og-image.png`
- Move: Todos os PDFs da raiz → `public/documentos/`

- [ ] **Step 1: Mover favicons e og-image**

```bash
mv favicon-32x32.png public/
mv apple-touch-icon.png public/
mv og-image.png public/
```

- [ ] **Step 2: Criar public/documentos/ e mover PDFs**

```bash
mkdir -p public/documentos
mv *.pdf public/documentos/ 2>/dev/null || true
```

- [ ] **Step 3: Verificar se todos os PDFs foram movidos**

Run: `ls public/documentos/ | wc -l`
Expected: 30 arquivos (todos os PDFs listados no documents.json)

- [ ] **Step 4: Commit**

```bash
git add public/
git commit -m "assets: move PDFs e favicons para public/"
```

---

### Task 16: Configurar GitHub Actions

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Criar workflow de deploy**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: adiciona GitHub Actions para deploy no Pages"
```

---

### Task 17: Testar Build Local

**Files:**
- None (build only)

- [ ] **Step 1: Rodar build**

Run: `npm run build`
Expected: `dist/` criado com HTML/CSS/JS estaticos, nenhum erro

- [ ] **Step 2: Verificar estrutura do dist/**

Run: `ls -la dist/`
Expected: index.html, styles/, scripts/, documentos/ presentes

- [ ] **Step 3: Verificar se documentos estao no dist**

Run: `ls dist/documentos/ | head -5`
Expected: PDFs listados

- [ ] **Step 4: Commit (se houver mudancas necessarias)**

Se o build falhar, corrigir os erros e commitar:
```bash
git commit -m "fix: corrige erros de build"
```

---

### Task 18: Adicionar .gitignore e Limpar

**Files:**
- Create: `.gitignore` (se nao existir)
- Modify: `.gitignore`

- [ ] **Step 1: Adicionar entradas no .gitignore**

```
node_modules/
dist/
.astro/
.superpowers/
```

- [ ] **Step 2: Commit**

```bash
git add .gitignore
git commit -m "chore: adiciona .gitignore com node_modules e dist"
```

---

### Task 19: Deploy e Verificacao Final

**Files:**
- None (deploy only)

- [ ] **Step 1: Push para main**

```bash
git push origin main
```

- [ ] **Step 2: Verificar GitHub Actions**

Acessar: https://github.com/DPMG2025/documentos/actions
Esperar: workflow "Deploy to GitHub Pages" completar com sucesso

- [ ] **Step 3: Verificar site no ar**

Acessar: https://dpmg2025.github.io/documentos/
Verificar:
- [ ] Pagina carrega sem erros
- [ ] Todos os componentes visiveis
- [ ] Categorias colapsaveis funcionam
- [ ] Busca funciona com highlight
- [ ] FAQ colapsavel funciona
- [ ] Botoes de download abrem os PDFs
- [ ] Scroll-to-top aparece ao rolar
- [ ] Layout responsivo em mobile

- [ ] **Step 4: Verificar Lighthouse**

Run: Abrir DevTools > Lighthouse > Generate report
Expected: Acessibilidade >= 95, Performance >= 90

---

## Self-Review Checklist

### Spec Coverage
- [x] Astro com static export — Task 1
- [x] Paleta de cores suave — Task 3
- [x] Componentes Header, Hero, Search — Tasks 5-7
- [x] Componentes Category, DocumentCard — Tasks 8-9
- [x] Componentes FAQ — Tasks 10-11
- [x] Footer — Task 12
- [x] MainLayout com SEO — Task 4
- [x] documents.json — Task 2
- [x] search.js — Task 14
- [x] GitHub Actions deploy — Task 16
- [x] Assets (PDFs, favicons) — Task 15
- [x] Testes e verificacao — Tasks 17-19

### Placeholder Scan
- [x] Sem "TBD", "TODO", "implement later"
- [x] Todo codigo esta completo nos passos
- [x] Comandos com expected output definidos

### Type Consistency
- [x] Props interfaces consistentes entre componentes
- [x] Caminhos de arquivos consistentes (usando `/documentos/` base path)
- [x] Nomes de funcoes consistentes (toggleCategory, toggleFaq)
