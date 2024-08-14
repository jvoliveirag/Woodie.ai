import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
//import { PageLoader } from "./page-loader";

interface Auth0ProviderWithNavigateProps {
  component : any;
}

export const AuthenticationGuard: React.FC<Auth0ProviderWithNavigateProps> = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="min-h-screen flex cursor-wait justify-center items-center">
        <h1 className="text-3xl font-bold animate-pulse">Carregando...</h1>
      </div>
    ),
    //returnTo: "/profile"
  });

  return <Component />;
};