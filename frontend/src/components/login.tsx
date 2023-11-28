import { useAuth0 } from "@auth0/auth0-react";
import { LogIn } from "lucide-react";
import { Button } from "./ui/button";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button className="flex gap-2" onClick={() => loginWithRedirect()}> <LogIn></LogIn> Entrar</Button>;
};
