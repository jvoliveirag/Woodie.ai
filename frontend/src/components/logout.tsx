import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";

export const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button variant={"ghost"} className="font-normal" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Sair
    </Button>
  );
};
