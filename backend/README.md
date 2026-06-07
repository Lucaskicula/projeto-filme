# Backend NestJS

API local para autenticacao, perfil do usuario, lista de filmes e proxy seguro da TMDB.

## Configuracao

1. Copie `.env.example` para `.env`.
2. Ajuste a senha do PostgreSQL em `DATABASE_URL`.
3. Coloque sua chave da TMDB em `TMDB_API_KEY`.

Exemplo:

```env
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/filmes_db?schema=public"
JWT_SECRET="troque-por-uma-chave-grande-e-secreta"
JWT_EXPIRES_IN="7d"
TMDB_API_KEY="sua-chave-da-tmdb"
FRONTEND_URL="http://localhost:3000"
PORT=3333
```

## Banco de dados

Como o PostgreSQL local exige a senha do usuario `postgres`, crie o banco depois de preencher sua senha:

```powershell
$env:PGPASSWORD="SUA_SENHA"
& "C:\Program Files\PostgreSQL\18\bin\createdb.exe" -U postgres -h localhost -p 5432 filmes_db
npm run prisma:migrate
```

Se o banco ja existir, rode apenas:

```powershell
npm run prisma:migrate
```

## Rodando

```powershell
npm install
npm run start:dev
```

Rotas principais:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/movies`
- `POST /api/movies`
- `PATCH /api/movies/:id/watched`
- `PATCH /api/movies/:id`
- `DELETE /api/movies/:id`
- `GET /api/tmdb/search?query=matrix`
- `GET /api/tmdb/popular`
- `GET /api/tmdb/movie/:id`
