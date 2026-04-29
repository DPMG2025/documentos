# Refatoracao do Site de Documentos Juridicos - Design Spec

## 1. Objetivo

Migrar o site atual (HTML/CSS/JS monolitico) para uma arquitetura moderna em Astro, melhorando o design visual, a experiencia do usuario, a performance, a acessibilidade e a responsividade, mantendo todas as funcionalidades existentes.

**Prazo:** Implementacao unica (escopo cabe em um unico plano).

## 2. Arquitetura

**Framework:** Astro com `output: 'static'` (gera HTML estatico puro).
**Deploy:** GitHub Pages via GitHub Actions.
**Stack:**
- Astro 5.x
- CSS nativo (sem framework CSS — manter simplicidade)
- JavaScript vanilla para interatividade client-side

**Estrutura de pastas:**
```
src/
  components/
    Header.astro
    HeroBanner.astro
    SearchBox.astro
    CategorySection.astro
    DocumentCard.astro
    FAQSection.astro
    FAQItem.astro
    Footer.astro
  layouts/
    MainLayout.astro
  pages/
    index.astro
  data/
    documents.json
  styles/
    global.css
  scripts/
    search.js
public/
  documentos/       (PDFs existentes)
  favicon-32x32.png
  apple-touch-icon.png
  og-image.png
```

## 3. Design Visual

### 3.1 Paleta de Cores (suave e institucional)

| Token | Valor | Uso |
|-------|-------|-----|
| `--primary` | `#1a5c52` | Botoes primarios, links, acentos |
| `--primary-dark` | `#124a42` | Hover em botoes primarios |
| `--text-primary` | `#2a3a2a` | Titulos, texto principal |
| `--text-secondary` | `#5a6a5a` | Subtitulos, descricoes |
| `--bg-page` | `#f8faf8` | Fundo da pagina |
| `--bg-card` | `#ffffff` | Cards e categorias |
| `--border` | `#e8ede8` | Bordas sutis |
| `--header-alimentos` | `#f0f5f0` | Header da categoria Alimentos |
| `--header-divorcio` | `#f5f0f5` | Header da categoria Divorcio |
| `--header-paternidade` | `#f0f3f8` | Header da categoria Paternidade |
| `--header-guarda` | `#faf5f0` | Header da categoria Guarda |
| `--header-outros` | `#f5f8f0` | Header da categoria Outros |
| `--header-declaracoes` | `#f0f5f8` | Header da categoria Declaracoes |

**Principios:**
- Sem gradientes pesados
- Sem sombras fortes (apenas `0 1px 4px rgba(0,0,0,0.06)`)
- Verde escuro (`#1a5c52`) usado com moderação, apenas para acentos e botoes primarios
- Fundos das categorias em tons pastel leves (diferentes para cada categoria)

### 3.2 Tipografia

| Elemento | Fonte | Peso | Tamanho |
|----------|-------|------|---------|
| H1 (titulo principal) | 'Crimson Pro', serif | 700 | 2.5rem |
| H2 (secoes) | 'Crimson Pro', serif | 700 | 1.8rem |
| H3 (categorias) | 'Inter', sans-serif | 600 | 1.1rem |
| Corpo | 'Inter', sans-serif | 400 | 1rem |
| Botoes | 'Inter', sans-serif | 500 | 0.875rem |

Fontes carregadas via Google Fonts com `display=swap`.

### 3.3 Layout

- **Container maximo:** 960px centralizado
- **Espacamento:** 24px padding lateral (mobile), 32px (desktop)
- **Cards:** border-radius 10px, borda 1px solid `--border`
- **Botoes:** border-radius 8px para botoes primarios, outline para secundarios

## 4. Componentes

### 4.1 Header.astro
- Barra superior fina com informacoes da defensoria (endereco e horario)
- Cor de fundo: `--primary` (#1a5c52)
- Texto branco, fonte 0.9rem
- Altura compacta (~44px)

### 4.2 HeroBanner.astro
- Fundo branco (`--bg-card`)
- Titulo principal em `--primary`
- Subtitulo em `--text-secondary`
- Sem gradientes ou imagens de fundo
- Padding generoso (56px vertical)

### 4.3 SearchBox.astro
- Input centralizado, max-width 600px
- Icone de lupa (SVG inline)
- Placeholder: "Buscar documentos e perguntas..."
- Atalho de teclado: `/` para focar, `Escape` para sair
- Borda 2px solid #d4ddd4, border-radius 8px

### 4.4 CategorySection.astro
- Props: `title`, `icon`, `color`, `documents[]`, `id`
- Header com fundo pastel (`--header-*`), texto escuro
- Expandir/colapsar com animacao suave
- Estado persistido em `localStorage`
- ARIA: `aria-expanded`, `aria-controls`, `role="button"`, `tabindex="0"`

### 4.5 DocumentCard.astro
- Props: `name`, `filename`
- Nome do documento a esquerda
- Dois botoes a direita:
  - "Visualizar": outline, border 1px solid #c8d4c8
  - "Baixar": solid, bg `--primary`, texto branco
- Hover: leve destaque no nome (cor `--primary`)
- Badge "PDF" opcional

### 4.6 FAQSection.astro
- Grid de cards com gap 16px
- Cada categoria de FAQ em um card com border-radius 10px
- Titulo da categoria com border-bottom sutil

### 4.7 FAQItem.astro
- Props: `question`, `answer`, `number`
- Numero circular a esquerda da pergunta
- Expandir/colapsar com animacao
- ARIA: `aria-expanded`

### 4.8 Footer.astro
- Fundo `--bg-page` com border-top
- Informacoes da defensoria centralizadas
- Texto `--text-secondary`
- Copyright com fonte menor

### 4.9 MainLayout.astro
- HTML semantico (`<main>`, `<header>`, `<footer>`)
- Skip-link para acessibilidade
- SEO meta tags (Open Graph, Twitter Cards, canonical)
- Theme color: `--primary`
- Favicon e apple-touch-icon

## 5. Data Model

### 5.1 documents.json

```json
{
  "categories": [
    {
      "id": "alimentos",
      "title": "Alimentos",
      "icon": "💰",
      "headerColor": "#f0f5f0",
      "documents": [
        {
          "name": "Alimentos para Menor",
          "filename": "ALIMENTOS MENOR.pdf",
          "searchTerms": ["alimentos menor", "pensao", "filho"]
        }
      ]
    }
  ]
}
```

### 5.2 Fluxo de Dados

1. **Build-time:** Astro le `documents.json` e gera HTML estatico com todos os componentes
2. **Client-time:** `search.js` carrega e indexa os dados para busca em tempo real
3. **Deploy:** `astro build` gera pasta `dist/` → GitHub Actions publica no GitHub Pages

## 6. Funcionalidades

### 6.1 Busca (search.js)
- Indexa nomes de documentos e FAQ no carregamento
- Busca em tempo real a cada keystroke
- Highlight dos termos encontrados (background amarelo suave)
- Contador de resultados
- Mensagem "Nenhum resultado encontrado"
- Esconde categorias vazias durante a busca

### 6.2 Categorias Colapsaveis
- Click no header expande/colapsa
- Suporte a teclado (Enter/Espaco)
- Estado salvo em `localStorage` (chave `categoryStates`)
- Restauracao automatica no carregamento

### 6.3 FAQ Colapsavel
- Mesma logica de interacao das categorias
- Numeracao automatica por secao

### 6.4 Scroll-to-Top
- Botao flutuante (FAB) no canto inferior direito
- Aparece apos scrollar para baixo
- Smooth scroll ao topo

## 7. Acessibilidade

- **ARIA:** `aria-expanded`, `aria-controls`, `aria-label`, `aria-live="polite"` nos resultados
- **Navegacao:** Skip-link, foco visivel em todos os elementos interativos
- **Cores:** Contraste minimo 4.5:1 para todo texto
- **Motion:** Respeita `prefers-reduced-motion`
- **Semantica:** Tags HTML5 apropriadas, headings hierarquicos

## 8. Performance

- **Static generation:** Zero JavaScript no critical path (exceto busca)
- **Lazy loading:** Imagens com `loading="lazy"`
- **Fontes:** `display=swap` para evitar FOIT
- **CSS:** Inline critico + global.css externo
- **Meta tags:** Preconnect para Google Fonts

## 9. SEO

- Meta description e keywords
- Open Graph (title, description, image, type, locale)
- Twitter Cards
- Canonical URL
- Theme color para mobile
- Favicon multi-resolucao

## 10. Deploy

### 10.1 GitHub Actions

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: withastro/action@v3
```

### 10.2 Astro Config

```js
// astro.config.mjs
export default defineConfig({
  output: 'static',
  site: 'https://dpmg2025.github.io',
  base: '/documentos',
});
```

## 11. Critérios de Sucesso

- [ ] Site gerado como HTML estatico puro (verificar `dist/`)
- [ ] Todos os documentos acessiveis via links de download
- [ ] Busca funcional com highlight
- [ ] Categorias e FAQ colapsaveis funcionando
- [ ] Scroll-to-top visivel e funcional
- [ ] Layout responsivo (testar em 320px, 768px, 1024px)
- [ ] Lighthouse: acessibilidade >= 95, performance >= 90
- [ ] Deploy funcionando no GitHub Pages
- [ ] Nenhum erro no console do navegador
