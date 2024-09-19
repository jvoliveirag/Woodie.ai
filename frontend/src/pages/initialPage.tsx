import { LoginButton } from "../components/login";
import { CarouselPlugin } from "@/components/carousel-comp";

export function InitialPage() {
  const imageUrls = [
    "fllRobot.jpg",
    "referee.jpeg",
    "crescendoFRC.jpeg",
    "hope.jpeg",
    "FRC.jpeg",
    "referee2.jpeg",
    "robotArm.jpeg"
  ]

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

      <main className="flex flex-col flex-1 items-start justify-center relative">
        <div className="flex flex-1 relative">
          
          <div className="pb-8 transform text-white 2xl:text-8xl md:text-5xl text-4xl font-bold mx-8 md:mr-0">
            <div className="mt-8">
              <h1 className="">
                The transformation
              </h1>
              <h1>of <span className="text-purple-400">education</span></h1>
              <h1>starts here!</h1>
            </div>
            <div className="mt-8 mb-4 md:mb-0 2xl:mt-16">
              <h4 className="text-xl 2xl:text-4xl">Where <span className="text-purple-400">AI</span> and <span className="text-purple-400">educational robotics</span></h4>
              <h4 className="text-xl 2xl:text-4xl">come together to provide</h4>
              <h4 className="text-xl 2xl:text-4xl">the <span className="text-purple-400">best learning experience</span>.</h4>
            </div>
            <span className="text-lg 2xl:text-4xl"><a href="/home" className="text-purple-400 underline underline-offset-4 hover:text-purple-500">Subscribe</a> to know more.</span>
          </div>
          
          <div className="hidden lg:flex items-center justify-center 2xl:-mt-16">
            <CarouselPlugin imageUrls={imageUrls}></CarouselPlugin>
          </div>
          
        </div>
        <div className="lg:hidden flex justify-start mb-between-768-834">
          <CarouselPlugin imageUrls={imageUrls}></CarouselPlugin>
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
