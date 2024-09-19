import { useState, useEffect } from "react";
import { NavBar } from "@/components/navbar";
import { Profile } from "@/components/profile";
import { ResponseSelect } from "@/components/response-select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useAuth0 } from "@auth0/auth0-react";
import { api } from "@/lib/axios"; // Ajuste o caminho conforme necessário

export function ProfilePage() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [selectedResponseText, setSelectedResponseText] = useState<string>("");
  
  const [teamInfo, setTeamInfo] = useState<string>("");

  useEffect(() => {
    if (isAuthenticated && user) {
      api.get(`/team/info/${user.email}`)
        .then(response => {
          setTeamInfo(response.data);
        })
        .catch(error => {
          console.error("Failed to fetch team info:", error);
        });
    }
  }, [isAuthenticated, user]);

  if (isLoading) {
    return <div>Carregando ...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      <NavBar path="/home" />

      <main className="flex-1 p-6 md:flex flex-col gap-6">
        <div className="flex-1 md:flex gap-6">
          <div className="flex flex-col md:w-1/3 w-full">
            <Profile />
            <Label className="mt-4 mb-2">Saved responses</Label>
            <ResponseSelect onResponseSelected={setSelectedResponseText} />
          </div>

          <div className="grid grid-rows-2 gap-4 flex-1 md:mt-0 mt-4 md:pb-4">
            <div className="space-y-4">
              <Textarea
                className="resize-none p-4 leading-relaxed flex-1 h-full"
                placeholder="Your saved responses will be displayed here."
                readOnly
                value={selectedResponseText} 
              />
              <Textarea
                className="resize-none p-4 leading-relaxed flex-1 h-full"
                placeholder="Team information."
                readOnly
                value={teamInfo} 
              />
            </div>
          </div>
        </div>

        <div className="hidden absolute bottom-0 left-0 right-0 md:flex justify-center">
          <p className="text-xs text-muted-foreground md:flex md:gap-1 align-baseline">
            Developed by{" "}
            <a
              href="https://www.linkedin.com/in/joaov-oliveira/"
              className="underline text-violet-400"
            >
              João Victor de Oliveira
            </a>
            | Cachoeira de Minas, 2023. All rights reserved.
          </p>
        </div>
      </main>

      <p className="text-xs text-muted-foreground md:hidden text-center align-baseline mb-4">
        Developed by{" "}
        <a href="https://www.linkedin.com/in/joaov-oliveira/">
          <code className="text-violet-400">{"{João Victor de Oliveira}"}</code>
        </a>
        , Cachoeira de Minas, 2023. All rights reserved.
      </p>
    </div>
  );
}
