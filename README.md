# Duolingo Clone

![Pré-visualização do Site](public/Thumbnail-duolingo.png)

Duolingo Clone é um projeto desenvolvido para fins de estudo e experimentação, inspirado na popular plataforma de aprendizado de idiomas. Ele implementa funcionalidades de gamificação, lições interativas e desafios, demonstrando conceitos modernos de desenvolvimento web.

## Descrição

Este projeto foi criado para explorar e aprender técnicas de desenvolvimento utilizando Next.js, React e outras tecnologias modernas. O Duolingo Clone simula uma plataforma de aprendizado com lições, desafios e acompanhamento de progresso do usuário. Embora não seja uma réplica exata do Duolingo, o projeto serve como base para estudos e experimentações, permitindo que desenvolvedores aprendam sobre Server-Side Rendering (SSR), APIs, integração com bancos de dados e muito mais.

## Demonstração

Experimente a versão ao vivo: [duolingo-clone-mauve.vercel.app](https://duolingo-clone-mauve.vercel.app)

## Tecnologias Utilizadas

- **Next.js:** Framework React para construção de aplicações web escaláveis e performáticas.
- **React:** Biblioteca para criação de interfaces de usuário.
- **TypeScript:** Superset do JavaScript com tipagem estática, que torna o desenvolvimento mais robusto.
- **Tailwind CSS:** Framework utilitário para estilização rápida e customizada.
- **Drizzle ORM:** Biblioteca para mapeamento objeto-relacional (ORM) com suporte para bancos de dados PostgreSQL.
- **Neon:** Serviço de banco de dados PostgreSQL serverless.
- **ESLint & Prettier:** Ferramentas para manter a padronização e qualidade do código.
- **Vercel:** Plataforma para deploy de aplicações Next.js com integração simplificada.

## Funcionalidades

- **Lições e Desafios Interativos:** Aprenda e pratique através de lições dinâmicas e desafios que simulam o aprendizado de um idioma.
- **Gamificação:** Acompanhe seu progresso com pontos, corações e outros indicadores de desempenho.
- **Design Responsivo:** Desenvolvido com uma abordagem mobile-first, garantindo uma ótima experiência em dispositivos móveis.
- **API e SSR:** Implementação de rotas de API e renderização server-side para demonstrar conceitos avançados do Next.js.
- **Integração com Banco de Dados:** Uso do Drizzle ORM e Neon para gerenciamento e consulta de dados.

## Instalação

Siga os passos abaixo para rodar o projeto localmente:

1.  **Clone o repositório:**
    Clone o repositório:

    ```bash
    git clone https://github.com/RamonSantos9/duolingo-clone.git
    Entre na pasta do projeto:

    ```

2.  **Entre na pasta do projeto:**

    ```bash
    cd duolingo-clone

    ```

3.  **Configure as variáveis de ambiente**

    > Crie um arquivo .env na raiz do projeto e adicione a seguinte linha:

    ```bash
    DATABASE_URL="postgresql://<usuário>:<senha>@<host>.neon.tech/<nome_do_banco>?sslmode=require"
    STRIPE_WEBHOOK_SECRET="sua_stripe_webhook_secret"
    Substitua <usuário>, <senha>, <host> e <nome_do_banco> com as informações do seu banco de dados Neon.

    ```

4.  **Instale as dependências**

        ```bash
        npm install

5.  **Inicie o servidor de desenvolvimento**

    ```bash
    npm run dev

    ```

6.  **Acesse o projeto: Abra seu navegador e digite**

    http://localhost:3000

**Observações Importantes:**
Conecte seu repositório GitHub ao Vercel.
Configure as variáveis de ambiente no painel da Vercel.
O Vercel realizará o deploy automático a cada push para a branch configurada (por exemplo, main ou master).
Considerações
Projeto para Estudos:
Este Duolingo Clone foi desenvolvido exclusivamente para estudos e experimentação. Ele não é um produto comercial e não deve ser utilizado em produção sem as devidas adaptações.

- **Segurança:**
  Não compartilhe informações sensíveis publicamente. Certifique-se de que o arquivo .env.local esteja listado no .gitignore para evitar o versionamento de credenciais.

- **Contribuições:**
  Sinta-se à vontade para abrir issues ou enviar pull requests caso queira contribuir ou sugerir melhorias para o projeto.
