import { NavBar } from "@/components/navbar";
import { Profile } from "@/components/profile";

export function ProfilePage() {

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar path="/home"></NavBar>

      <main className="md:flex-1 p-6 md:flex gap-6">
        <div className="flex flex-col flex-1 gap-4 mb-6 md:mb-0">
          <div className="grid grid-rows-2 gap-4 flex-1">
            <Profile></Profile>
          </div>

          <p className="text-sm text-muted-foreground hidden md:flex md:gap-1">
            Desenvolvido por <a href='https://www.linkedin.com/in/joaov-oliveira/' className="underline text-violet-400">João Victor de Oliveira</a>| Cachoeira de Minas, 2023. Todos os direitos reservados.
          </p>
        </div>

      </main>
      <p className="text-xs text-muted-foreground md:hidden text-center align-baseline mb-4">
        Desenvolvido por <a href='https://www.linkedin.com/in/joaov-oliveira/'><code className="text-violet-400">{'{João Victor de Oliveira}'}</code></a>, Cachoeira de Minas, 2023. Todos os direitos reservados.
      </p>
    </div>
  )
}


  