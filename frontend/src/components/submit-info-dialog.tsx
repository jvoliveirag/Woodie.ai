
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { api } from "@/lib/axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";


export function SubmitInfoDialog() {

  const { user, isAuthenticated } = useAuth0();
  var userEmail = ''
  var userName = ''

  useEffect(() => {
    if (isAuthenticated && user) {
      userEmail = user.email || ''
      userName = user.name || ''
      setEmail(userEmail)
      setName(userName)
    }
  }, [isAuthenticated, user]);

  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [providedInfo, setProvidedInfo] = useState(false);
  const [teamInfo, setTeamInfo] = useState('');


  
  const handleSubmit = async () => {
    try {
      await api.post('https://woodi-ai.onrender.com/team/submit/info', {
        name,
        email,
        providedInfo,
        teamInfo
      });

      alert("Informações enviadas com sucesso!");
      window.location.reload();
      
    } catch (error: any) {
      let errorMessage = "Erro desconhecido ao enviar informações.";

      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }

      console.error("Erro ao enviar informações:", errorMessage);
      alert(errorMessage);
    }
  };
  
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <a className="underline text-purple-500 cursor-pointer">
          aqui
        </a>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl">Enviar informações da equipe</AlertDialogTitle>
          <AlertDialogDescription>
            Ajuste as informações como desejado e clique em "Enviar" para confirmar.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nome da equipe</Label>
              <Input id="name" disabled placeholder={name} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" disabled placeholder={email} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="info">Informações</Label>
              <Input id="info" placeholder='Insira as informações da sua equipe' value={teamInfo} onChange={(e) => (
                  setTeamInfo(e.target.value), 
                  setProvidedInfo(true)
                )}
              />
            </div>
          </div>
        </form>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>Enviar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}