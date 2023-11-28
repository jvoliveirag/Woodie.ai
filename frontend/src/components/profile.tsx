import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth0 } from "@auth0/auth0-react";


export const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Carregando ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        { user ? (
            <>
              <div className="flex gap-8">
                <div className="">
                  <Avatar className="bg-white w-36 h-36">
                    <AvatarImage src={user.picture} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <div className="md:space-y-2">
                  <h2 className="font-bold md:text-2xl text-lg">{user.name}</h2>
                  <p className="font-bold">Email: <span className="font-normal">{user.email}</span></p>
                  <p className="font-bold">Equipes: <span className="font-normal">RobotBulls, TILT</span></p>
                </div>
              </div>
            </>
          ) : (
            <p className="text-2xl">{'Problema ao autenticar usuário.'}</p>
          )
        }
      </div>
    )
  );
};
