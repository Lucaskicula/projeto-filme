# CineList - Gerenciador de Filmes

Projeto full stack para buscar filmes na TMDB, salvar uma lista para assistir mais tarde, marcar filmes como assistidos, avaliar, registrar observacoes pessoais e manter tudo vinculado ao perfil do usuario.

## Funcionalidades

- Busca de filmes pela API da TMDB sem expor a chave no frontend.
- Home com filmes populares e destaque dinamico.
- Cadastro e login de usuarios com JWT.
- Recuperacao de senha com token local.
- Pagina de perfil para alterar nome, e-mail e senha.
- Lista de filmes para assistir mais tarde.
- Area de filmes assistidos com avaliacao e observacoes.
- Persistencia em PostgreSQL usando Prisma ORM.
- Backend em NestJS com guards, validacao, CORS e Helmet.

## Tecnologias

- Next.js
- React
- TypeScript
- Tailwind CSS
- NestJS
- Prisma ORM
- PostgreSQL
- JWT
- TMDB API

## Estrutura

```text
projeto/
  app/                 # paginas do frontend Next.js
  components/          # componentes visuais
  context/             # contextos de autenticacao e filmes
  services/            # cliente HTTP do frontend
  backend/             # API NestJS
    prisma/            # schema e migrations Prisma
    src/               # modulos, controllers e services
```

## Requisitos

- Node.js instalado
- PostgreSQL instalado e rodando
- Chave da TMDB

## Configuracao do frontend

Copie o arquivo de exemplo:

```powershell
Copy-Item .env.example .env.local
```

Conteudo esperado:

```env
NEXT_PUBLIC_API_URL="http://localhost:3333/api"
```

Instale as dependencias:

```powershell
npm install
```

Rode o frontend:

```powershell
npm run dev
```

O frontend fica em:

```text
http://localhost:3000
```

## Configuracao do backend

Entre na pasta do backend:

```powershell
cd backend
```

Copie o arquivo de exemplo:

```powershell
Copy-Item .env.example .env
```

Preencha as variaveis:

```env
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/filmes_db?schema=public"
JWT_SECRET="troque-por-uma-chave-grande-e-secreta"
JWT_EXPIRES_IN="7d"
TMDB_API_KEY="sua-chave-da-tmdb"
FRONTEND_URL="http://localhost:3000"
PORT=3333
```

Instale as dependencias:

```powershell
npm install
```

Crie o banco no PostgreSQL, se ainda nao existir:

```powershell
createdb -U postgres -h localhost -p 5432 filmes_db
```

Rode as migrations:

```powershell
npm run prisma:migrate
```

Rode o backend:

```powershell
npm run start:dev
```

A API fica em:

```text
http://localhost:3333/api
```

## Rotas principais

Autenticacao:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `PATCH /api/auth/me`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`

Filmes do usuario:

- `GET /api/movies`
- `POST /api/movies`
- `PATCH /api/movies/:id/watched`
- `PATCH /api/movies/:id`
- `DELETE /api/movies/:id`

TMDB proxy:

- `GET /api/tmdb/popular`
- `GET /api/tmdb/search?query=matrix`
- `GET /api/tmdb/movie/:id`

## Comandos uteis

Frontend:

```powershell
npm run dev
npm run build
npm run lint
```

Backend:

```powershell
npm run start:dev
npm run build
npm run prisma:migrate
npm run prisma:generate
```

## Observacoes de seguranca

A chave da TMDB deve ficar apenas no arquivo `backend/.env`. O frontend chama o backend, e o backend consulta a TMDB. Arquivos `.env` reais nao devem ser enviados para o GitHub.
