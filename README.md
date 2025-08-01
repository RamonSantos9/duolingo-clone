URL do Projeto

# 🦉 Duolingo Clone

![Pré-visualização do Site](public/Thumbnail-duolingo.png)

[![Next.js](https://img.shields.io/badge/Next.js-15.1.7-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-0.29.3-orange?style=for-the-badge)](https://orm.drizzle.team/)
[![Stripe](https://img.shields.io/badge/Stripe-14.0.0-008CDD?style=for-the-badge&logo=stripe)](https://stripe.com/)

> **🚀 Uma plataforma completa de aprendizado de idiomas inspirada no Duolingo, construída com tecnologias modernas e funcionalidades avançadas.**

## 📋 Índice

- [✨ Funcionalidades](#-funcionalidades)
- [🛠️ Tecnologias](#️-tecnologias)
- [🎯 Demonstração](#-demonstração)
- [🚀 Instalação](#-instalação)
- [⚙️ Configuração](#️-configuração)
- [📚 Scripts Disponíveis](#-scripts-disponíveis)
- [🏗️ Estrutura do Projeto](#️-estrutura-do-projeto)
- [🎨 Funcionalidades Principais](#-funcionalidades-principais)
- [🔧 Desenvolvimento](#-desenvolvimento)
- [📦 Deploy](#-deploy)
- [🤝 Contribuição](#-contribuição)
- [📄 Licença](#-licença)

## ✨ Funcionalidades

### 🎮 **Gamificação Completa**

- **Sistema de Pontos:** Acompanhe seu progresso com XP ganho
- **Corações:** Sistema de vidas com corações ilimitados para usuários Pro
- **Gems:** Moeda virtual para desbloquear recursos especiais
- **Leaderboard:** Compita com outros usuários

### 📚 **Sistema de Aprendizado**

- **25 Lições Interativas:** 5 lições por unidade, 5 unidades por curso
- **125 Desafios:** Mistura de desafios SELECT e ASSIST
- **Progressão Inteligente:** Avance automaticamente após completar lições
- **Múltiplos Tipos de Exercício:**
  - **SELECT:** "Qual destas imagens é 'Café'?"
  - **ASSIST:** "Complete: 'I want a cup of \_\_\_'"

### 💳 **Sistema de Assinatura Pro**

- **Stripe Integration:** Pagamentos seguros e confiáveis
- **Corações Ilimitados:** Sempre disponível para usuários Pro
- **Portal de Cobrança:** Gerencie sua assinatura facilmente
- **Webhooks:** Processamento automático de pagamentos

### 🎨 **Interface Moderna**

- **Design Responsivo:** Funciona perfeitamente em todos os dispositivos
- **Navbar Dinâmico:** Botões diferentes para usuários logados/não logados
- **Animações Suaves:** Transições elegantes e feedback visual
- **Tema Minimalista:** Design limpo e focado na experiência

## 🛠️ Tecnologias

### **Frontend**

- **[Next.js 15.1.7](https://nextjs.org/)** - Framework React com SSR/SSG
- **[React 18.2.0](https://reactjs.org/)** - Biblioteca de interface
- **[TypeScript 5.3.3](https://www.typescriptlang.org/)** - Tipagem estática
- **[Tailwind CSS 3.4.0](https://tailwindcss.com/)** - Framework CSS utilitário

### **Backend & Banco de Dados**

- **[Drizzle ORM 0.29.3](https://orm.drizzle.team/)** - ORM moderno e type-safe
- **[Neon PostgreSQL](https://neon.tech/)** - Banco de dados serverless
- **[Clerk](https://clerk.com/)** - Autenticação e gerenciamento de usuários

### **Pagamentos & Integrações**

- **[Stripe 14.0.0](https://stripe.com/)** - Processamento de pagamentos
- **[Stripe CLI](https://stripe.com/docs/stripe-cli)** - Desenvolvimento local

### **Ferramentas de Desenvolvimento**

- **[ESLint](https://eslint.org/)** - Linting de código
- **[Prettier](https://prettier.io/)** - Formatação de código
- **[Vercel](https://vercel.com/)** - Deploy e hospedagem

## 🎯 Demonstração

### 🌐 **Versão Online**

Acesse a demonstração ao vivo: **[duolingo-clone-mauve.vercel.app](https://duolingo-clone-mauve.vercel.app)**

### 📱 **Screenshots**

<details>
<summary>🖥️ Clique para ver as capturas de tela</summary>

- **Página Inicial:** Landing page moderna com navbar dinâmico
- **Área de Aprendizado:** Interface de lições com progresso visual
- **Sistema de Quiz:** Desafios interativos com feedback imediato
- **Loja Pro:** Upgrade para corações ilimitados
- **Dashboard:** Acompanhamento de progresso e estatísticas

</details>

## 🚀 Instalação

### **Pré-requisitos**

- Node.js 18+
- npm ou yarn
- Conta no Neon (banco de dados)
- Conta no Stripe (pagamentos)
- Conta no Clerk (autenticação)

### **Passos de Instalação**

1. **Clone o repositório**

```bash
git clone https://github.com/RamonSantos9/duolingo-clone.git
cd duolingo-clone
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

```bash
cp .env.example .env.local
```

4. **Preencha as variáveis no `.env.local`:**

```env
# Database
DATABASE_URL="postgresql://user:password@host.neon.tech/database?sslmode=require"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

5. **Execute o banco de dados**

```bash
npm run db:seed
```

6. **Inicie o servidor de desenvolvimento**

```bash
npm run dev
```

7. **Acesse o projeto**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## ⚙️ Configuração

### **Banco de Dados (Neon)**

1. Crie uma conta em [neon.tech](https://neon.tech)
2. Crie um novo projeto
3. Copie a string de conexão para `DATABASE_URL`

### **Stripe**

1. Crie uma conta em [stripe.com](https://stripe.com)
2. Obtenha suas chaves de teste
3. Configure o webhook para `localhost:3000/api/webhooks/stripe`

### **Clerk**

1. Crie uma conta em [clerk.com](https://clerk.com)
2. Configure sua aplicação
3. Adicione as chaves ao `.env.local`

## 📚 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Inicia servidor de produção

# Banco de Dados
npm run db:seed      # Popula o banco com dados iniciais
npm run db:reset     # Reseta o banco de dados
npm run db:check     # Verifica status das assinaturas
npm run db:fix       # Corrige assinaturas com problemas

# Stripe
npm run stripe:listen # Inicia webhook listener local

# Correções Específicas
npm run db:fix-challenges    # Remove imagens de desafios ASSIST
npm run db:fix-answers       # Corrige respostas incorretas
npm run db:add-missing       # Adiciona respostas faltantes
```

## 🏗️ Estrutura do Projeto

```
Duolingo-Clone/
├── app/                    # App Router (Next.js 13+)
│   ├── (main)/            # Rotas principais (autenticadas)
│   ├── (marketing)/       # Páginas de marketing
│   ├── admin/             # Painel administrativo
│   ├── api/               # API Routes
│   └── lesson/            # Sistema de lições
├── components/            # Componentes reutilizáveis
│   ├── ui/               # Componentes base (Button, Dialog, etc.)
│   ├── modals/           # Modais da aplicação
│   └── landing/          # Componentes da landing page
├── db/                   # Configuração do banco de dados
│   ├── schema.ts         # Schema do Drizzle ORM
│   ├── queries.ts        # Queries personalizadas
│   └── drizzle.ts        # Configuração do Drizzle
├── lib/                  # Utilitários e configurações
├── scripts/              # Scripts de manutenção
├── store/                # Estado global (Zustand)
└── public/               # Assets estáticos
```

## 🎨 Funcionalidades Principais

### **🎯 Sistema de Lições**

- **Progressão Automática:** Avança para próxima lição automaticamente
- **Múltiplos Tipos:** SELECT (imagens) e ASSIST (completar frases)
- **Feedback Imediato:** Respostas corretas/incorretas com animações
- **Progresso Persistente:** Salva progresso no banco de dados

### **💎 Sistema Pro**

- **Corações Ilimitados:** Símbolo de infinito para usuários Pro
- **Pagamento Seguro:** Integração completa com Stripe
- **Portal de Gerenciamento:** Configure sua assinatura
- **Webhooks Automáticos:** Processamento de pagamentos

### **📊 Gamificação**

- **Sistema de Pontos:** XP ganho por lição completada
- **Corações:** Sistema de vidas (5 para free, ∞ para Pro)
- **Gems:** Moeda virtual para recursos especiais
- **Leaderboard:** Ranking de usuários

### **🎨 Interface**

- **Navbar Dinâmico:** Adapta-se ao status de autenticação
- **Design Responsivo:** Mobile-first approach
- **Animações Suaves:** Transições elegantes
- **Tema Minimalista:** Foco na experiência do usuário

## 🔧 Desenvolvimento

### **Estrutura de Dados**

```typescript
// Principais entidades
UserProgress {
  userId: string
  userName: string
  activeCourseId: number
  hearts: number
  points: number
  gems: number
}

UserSubscription {
  userId: string
  stripeCustomerId: string
  stripeSubscriptionId: string
  isActive: boolean
  stripeCurrentPeriodEnd: Date
}

Course {
  id: number
  title: string
  imageSrc: string
}

Unit {
  id: number
  courseId: number
  title: string
  description: string
  order: number
}

Lesson {
  id: number
  unitId: number
  title: string
  order: number
}

Challenge {
  id: number
  lessonId: number
  type: "SELECT" | "ASSIST"
  question: string
  order: number
}
```

### **Fluxo de Autenticação**

1. Usuário acessa a aplicação
2. Clerk gerencia autenticação
3. Dados do usuário são sincronizados com `userProgress`
4. Interface adapta-se ao status de autenticação

### **Fluxo de Pagamento**

1. Usuário clica em "Upgrade para Pro"
2. Stripe Checkout é iniciado
3. Após pagamento, webhook atualiza `userSubscription`
4. Interface mostra corações ilimitados

## 📦 Deploy

### **Vercel (Recomendado)**

1. Conecte seu repositório GitHub ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### **Variáveis de Ambiente para Produção**

```env
DATABASE_URL="postgresql://..."
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_live_..."
CLERK_SECRET_KEY="sk_live_..."
NEXT_PUBLIC_APP_URL="https://seu-dominio.vercel.app"
```

## 🤝 Contribuição

Contribuições são bem-vindas! Siga estes passos:

1. **Fork o projeto**
2. **Crie uma branch para sua feature**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit suas mudanças**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push para a branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Abra um Pull Request**

### **Diretrizes de Contribuição**

- Mantenha o código limpo e bem documentado
- Siga os padrões de TypeScript
- Teste suas mudanças localmente
- Atualize a documentação quando necessário

## 📄 Licença

Este projeto é desenvolvido para fins educacionais e de estudo. Não é uma réplica comercial do Duolingo.

---

## 🙏 Agradecimentos

- **Duolingo** pela inspiração
- **Vercel** pela plataforma de deploy
- **Stripe** pela infraestrutura de pagamentos
- **Clerk** pela autenticação
- **Neon** pelo banco de dados serverless

---

<div align="center">

**⭐ Se este projeto te ajudou, considere dar uma estrela!**

[![GitHub stars](https://img.shields.io/github/stars/RamonSantos9/duolingo-clone?style=social)](https://github.com/RamonSantos9/duolingo-clone/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/RamonSantos9/duolingo-clone?style=social)](https://github.com/RamonSantos9/duolingo-clone/network/members)

</div>
