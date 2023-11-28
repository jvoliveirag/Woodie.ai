import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
//import { PageLoader } from "./page-loader";

interface Auth0ProviderWithNavigateProps {
  component : any;
}

export const AuthenticationGuard: React.FC<Auth0ProviderWithNavigateProps> = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="">
        <h1>Loading</h1>
      </div>
    ),
    returnTo: "/home"
  });

  return <Component />;
};