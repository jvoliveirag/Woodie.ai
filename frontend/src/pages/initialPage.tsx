import { LoginButton } from "../components/login";

export function InitialPage() {

  return (
    <div className="min-h-screen flex flex-col">
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

      <main className="flex-1 p-6 md:flex gap-6">
        <div className="flex flex-col flex-1 gap-4 mb-6 md:mb-0">
          <div className="grid grid-rows-2 gap-4 flex-1">

          </div>

          <p className="text-xs text-muted-foreground hidden md:flex md:gap-1">
            Desenvolvido por <a href='https://www.linkedin.com/in/joaov-oliveira/' className="underline text-violet-400">João Victor de Oliveira</a>| Cachoeira de Minas, 2023. Todos os direitos reservados.
          </p>
        </div>

        <aside className="md:w-80 md:space-y-6">

        </aside>

      </main>
      <p className="text-xs text-muted-foreground md:hidden text-center align-baseline mb-4">
        Desenvolvido por <a href='https://www.linkedin.com/in/joaov-oliveira/'><code className="text-violet-400">{'{João Victor de Oliveira}'}</code></a>, Cachoeira de Minas, 2023. Todos os direitos reservados.
      </p>
    </div>
  )
}
