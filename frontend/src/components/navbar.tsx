import { Book, Mail } from "lucide-react";
import { DropdownMenuDemo } from "./drop-down-menu";

interface NavBarProps {
  path: string;
}

export function NavBar(props: NavBarProps) {

  return (
    <div className="px-6 py-3 flex items-center justify-between border-b">
      <div className="flex items-center">
        <img src="favicon.png" alt="logo" width={45} className="flex flex-1" />
        <h1 className="md:text-3xl text-xl font-bold flex ml-4">
          <a href={props.path}>Woodie.ai</a>
        </h1>
      </div>

      <div className="flex justify-center items-center md:gap-4 gap-3">
        <a className="hidden md:block hover:underline hover:underline-offset-8 hover:text-purple-400" href="https://github.com/jvoliveirag/TCC">Documentation</a>
        <a className="hidden md:block hover:underline hover:underline-offset-8 hover:text-purple-400 cursor-pointer">Notifications</a>
        <a className="md:hidden" href="https://github.com/jvoliveirag/TCC"><Book></Book></a>
        <a className="md:hidden"><Mail></Mail></a>
        <DropdownMenuDemo></DropdownMenuDemo>
      </div>
    </div>
  );
}