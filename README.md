<div align="center">

# Blumenau Inclusiva

### Portal de Acessibilidade Digital da Prefeitura de Blumenau

[![Next.js](https://img.shields.io/badge/Next.js-14.2-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![WCAG](https://img.shields.io/badge/WCAG-AAA-1e3a5f?style=for-the-badge)](https://www.w3.org/WAI/WCAG21/quickref/)

**Espelho Acessivel** - Transformando conteudo governamental em informacao acessivel para todos

[Demonstracao](#como-usar) | [Instalacao](#instalacao) | [Recursos](#recursos) | [Hackathon](#apresentacao-hackathon)

</div>

---

## Sobre o Projeto

O **Blumenau Inclusiva** e um portal que funciona como um "espelho acessivel" do site da Prefeitura de Blumenau. Ele consome o conteudo original e o renderiza com correcoes automaticas de acessibilidade, incluindo:

- Descricao automatica de imagens para leitores de tela
- Simplificacao de textos juridicos para linguagem cidada
- Controles de acessibilidade (fonte, contraste, modo leitura)
- Diagnostico WCAG em tempo real

---

## Recursos

| Recurso | Descricao |
|---------|-----------|
| **Barra de Acessibilidade** | Controles de fonte (A-/A+), modos de contraste e leitura simplificada |
| **SmartImage** | Imagens com descricao automatica gerada por IA para acessibilidade |
| **SmartText** | Textos juridicos simplificados em linguagem clara com um clique |
| **Diagnostico WCAG** | Analise automatica de problemas de acessibilidade na pagina |

---

## Instalacao

### Pre-requisitos

- [Node.js 18+](https://nodejs.org/) instalado
- Terminal ou CMD

### Passo a Passo

```bash
# 1. Acesse a pasta do projeto
cd "..\Blumenau Inclusiva"

# 2. Instale as dependencias
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse **http://localhost:3000** no navegador.

---

## Como Usar

### Barra de Acessibilidade

| Botao | Funcao |
|-------|--------|
| **A-** | Diminui tamanho da fonte |
| **A+** | Aumenta tamanho da fonte |
| **Seta circular** | Reseta para tamanho padrao |
| **Contraste** | Alterna entre modos de cor |
| **Livro** | Ativa modo de leitura simplificada |

### Modos de Contraste

- **Normal**: Cores padrao do site
- **Alto Contraste**: Amarelo sobre preto
- **Claro**: Texto escuro sobre fundo branco
- **Escuro**: Texto claro sobre fundo escuro

### Paginas

| Rota | Descricao |
|------|-----------|
| `/` | Pagina inicial com introducao |
| `/noticias` | Noticias com imagens e textos acessiveis |
| `/diagnostico` | Relatorio de acessibilidade WCAG |

---

## Estrutura do Projeto

```
src/
├── app/
│   ├── page.tsx              # Pagina inicial
│   ├── layout.tsx            # Layout com barra de acessibilidade
│   ├── noticias/page.tsx     # Pagina de noticias
│   ├── diagnostico/page.tsx  # Pagina de diagnostico
│   └── api/
│       ├── simplify/         # API de simplificacao de texto
│       └── describe-image/   # API de descricao de imagem
├── components/
│   ├── AccessibilityToolbar.tsx  # Barra de controles
│   ├── SmartImage.tsx            # Componente de imagem acessivel
│   ├── SmartText.tsx             # Componente de texto simplificavel
│   └── DiagnosticDashboard.tsx   # Painel de diagnostico
└── lib/
    └── ai-simulation.ts      # Funcoes de IA (simuladas/reais)
```

---

## Ativar IA Real (Opcional)

Por padrao, o sistema usa textos simulados. Para usar IA real:

### Google Gemini (Gratuito)

1. Acesse [Google AI Studio](https://aistudio.google.com/apikey)
2. Crie uma API Key
3. Edite `.env.local`:

```env
GEMINI_API_KEY=sua_chave_aqui
AI_PROVIDER=gemini
```

4. Nos arquivos `src/app/api/simplify/route.ts` e `src/app/api/describe-image/route.ts`, mude:

```typescript
const USE_AI = true;
```

5. Reinicie com `npm run dev`

---

## Apresentacao Hackathon

### Roteiro Sugerido

1. **Abra o site** em `localhost:3000`
2. **Demonstre a barra de acessibilidade**
   - Aumente e diminua a fonte
   - Mude para alto contraste
   - Ative o modo leitura
3. **Va para `/noticias`**
   - Mostre a IA gerando descricoes de imagem
   - Clique em "Simplificar com IA" em um texto juridico
   - Mostre o antes/depois do texto
4. **Va para `/diagnostico`**
   - Mostre o relatorio de acessibilidade
   - Explique os problemas detectados

### Dicas

- Use **F11** para tela cheia
- Tenha o leitor de tela **NVDA** instalado para demonstrar
- Mantenha o **DevTools** fechado durante a apresentacao

---

## Problemas Comuns

| Problema | Solucao |
|----------|---------|
| `npm nao e reconhecido` | Instale o Node.js e reinicie o PC |
| `Porta 3000 em uso` | Feche outros terminais ou mude a porta |
| Tela branca | Execute `npm run dev` novamente |
| IA nao funciona | Verifique a API key no `.env.local` |

---

## Tecnologias

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estatica
- **Tailwind CSS** - Estilizacao utilitaria
- **Radix UI** - Componentes acessiveis
- **Lucide Icons** - Icones SVG
- **Google Gemini** - IA para textos e imagens (opcional)

---

<div align="center">

### Desenvolvido para o Hackathon SEIDEP

**Secretaria de Inclusao da Prefeitura de Blumenau**

*Tornando a informacao publica acessivel para todos os cidadaos*

</div>
