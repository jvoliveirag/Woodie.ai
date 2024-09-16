
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
      await api.post('/team/submit/info', {
        name,
        email,
        providedInfo,
        teamInfo
      });

      alert("Information submitted successfully!");
      window.location.reload();
      
    } catch (error: any) {
      let errorMessage = "Unknown error sending information.";

      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }

      console.error("Error sending information:", errorMessage);
      alert(errorMessage);
    }
  };
  
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <a className="underline text-purple-500 cursor-pointer">
          here
        </a>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl">Submit team information</AlertDialogTitle>
          <AlertDialogDescription>
            Input the information about your team and robot and click "Submit" to confirm.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Team name</Label>
              <Input id="name" disabled placeholder={name} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" disabled placeholder={email} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="info">Details</Label>
              <Input id="info" placeholder='Input the information about your team and robot' value={teamInfo} onChange={(e) => (
                  setTeamInfo(e.target.value), 
                  setProvidedInfo(true)
                )}
              />
            </div>
          </div>
        </form>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>Submit</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}