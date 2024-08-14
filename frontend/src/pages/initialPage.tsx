import { LoginButton } from "../components/login";

export function InitialPage() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="px-6 py-3 flex items-center justify-between border-b">
        <div className="flex items-center">
          <img src="favicon.png" alt="logo" width={45} className="flex flex-1"/>
          <h1 className="text-3xl font-bold flex ml-4">
            Woodie.ai
          </h1>
        </div>
        <div>
          <LoginButton></LoginButton>
        </div>
      </div>

      <main className="flex flex-col flex-1 items-center justify-center relative">
        <div className="flex flex-1 relative">
          <img src="" width={930} alt="" className="align-self-end pt-16 md:ml-72 hidden md:flex" />
          <div className="absolute top-1/2 pb-8 md:ml-44 md:pl-96 transform -translate-x-1/2 -translate-y-1/2 text-white md:text-6xl text-5xl font-bold space-y-8">
            <h1 className="">
              A transformação 
              da <span className="text-purple-400">educação</span> começa aqui!
            </h1>
            <h4 className="text-2xl">Onde a IA e a robótica educacional se juntam para proporcionar a melhor experiênica de aprendizado.</h4>
            <span className="text-lg"><a href="/home" className="text-purple-400 hover:underline hover:underline-offset-4">Cadastre-se</a> para saber mais.</span>
          </div>
          <div className="absolute top-3/4 mt-32 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <p className="text-xs text-muted-foreground hidden md:flex md:gap-1 align-baseline">
              Desenvolvido por <a href='https://www.linkedin.com/in/joaov-oliveira/' className="underline text-violet-400">João Victor de Oliveira</a>| Cachoeira de Minas, 2023. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </main>

      <p className="text-xs text-muted-foreground md:hidden text-center align-baseline mb-4">
        Desenvolvido por <a href='https://www.linkedin.com/in/joaov-oliveira/'><code className="text-violet-400">{'{João Victor de Oliveira}'}</code></a>, Cachoeira de Minas, 2023. Todos os direitos reservados.
      </p>
    </div>
  );
}
