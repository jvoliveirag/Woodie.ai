import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth0 } from "@auth0/auth0-react";


export const ProfileImg = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <div>
        { user ? (
            <>
              <Avatar className="bg-white">
                <AvatarImage src={user.picture} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </>
          ) : (
            <p className="text-2xl">{'Problema ao autenticar usuário.'}</p>
          )
        }
      </div>
    )
  );
};
