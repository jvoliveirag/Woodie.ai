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

      <main className="flex flex-col flex-1 items-start justify-center relative ml-8">
        <div className="flex flex-1 relative">
          
          <div className="pb-8 transform text-white md:text-6xl text-5xl font-bold">
            <div className="mt-8">
              <h1 className="">
                The transformation
              </h1>
              <h1>of <span className="text-purple-400">education</span></h1>
              <h1>starts here!</h1>
            </div>
            <div className="mt-8">
              <h4 className="text-2xl">Where <span className="text-purple-400">AI</span> and <span className="text-purple-400">educational robotics</span></h4>
              <h4 className="text-2xl">come together to provide</h4>
              <h4 className="text-2xl">the <span className="text-purple-400">best learning experience</span>.</h4>
            </div>
            <span className="text-lg"><a href="/home" className="text-purple-400 hover:underline hover:underline-offset-4">Subscribe</a> to know more.</span>
          </div>
          
          <div className="hidden sm:flex items-center justify-center mb-8 mr-8">
            <img src="bg.png" alt="" width={600} />
          </div>
        </div>
        <div className="sm:hidden flex items-center justify-center mb-8 mr-8">
          <img src="bg.png" alt="" width={600}/>
        </div>
      </main>

      <div className="flex items-center justify-center">
        <p className="text-xs text-muted-foreground hidden md:flex md:gap-1">
          Developed by <a href='https://www.linkedin.com/in/joaov-oliveira/' className="underline text-violet-400">João Victor de Oliveira</a>| Cachoeira de Minas, 2023. All rights reserved.
        </p>
      </div>
      <p className="text-xs text-muted-foreground md:hidden text-center align-baseline mb-4">
        Developed by <a href='https://www.linkedin.com/in/joaov-oliveira/'><code className="text-violet-400">{'{João Victor de Oliveira}'}</code></a>, Cachoeira de Minas, 2023. All rights reserved.
      </p>
    </div>
  );
}
