import { DropdownMenuDemo } from "./drop-down-menu";

interface NavBarProps {
  path: string;
}

export function NavBar(props: NavBarProps) {

  return (
    <div className="px-6 py-3 flex items-center justify-between border-b">
      <div className="flex items-center">
        <img src="favicon.png" alt="logo" width={45} className="flex flex-1" />
        <h1 className="text-3xl font-bold flex ml-4">
          <a href={props.path}>Woodie.ai</a>
        </h1>
      </div>

      <div className="flex">
        <DropdownMenuDemo></DropdownMenuDemo>
      </div>
    </div>
  );
}