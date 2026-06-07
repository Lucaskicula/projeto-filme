export default function Footer() {
  return (
    <footer className="mt-16 border-t border-sky-300/10 bg-slate-950/50 px-4 py-10 text-sm text-slate-400 md:px-8 md:pb-12">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-white">CineList</h2>
          <p className="max-w-md leading-6">
            Organize os filmes que quer assistir, marque os favoritos ja vistos e
            registre suas avaliacoes em um perfil proprio.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-slate-200">Recursos</h3>
          <p>Busca integrada com TMDB</p>
          <p>Lista para assistir mais tarde</p>
          <p>Avaliacoes e observacoes pessoais</p>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-slate-200">Projeto</h3>
          <p>Frontend em Next.js</p>
          <p>Backend em NestJS</p>
          <p>Banco PostgreSQL com Prisma ORM</p>
        </div>
      </div>
    </footer>
  );
}
