import {
  AlertDialog,
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
import { Button } from "./ui/button";

export function SubmitInfoDialog() {
  const { user, isAuthenticated } = useAuth0();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [providedInfo, setProvidedInfo] = useState(false);
  const [teamInfo, setTeamInfo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
  const [errorMessage, setErrorMessage] = useState(""); // Store validation error message
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Control modal state

  // Set user info when authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      setEmail(user.email || "");
      setName(user.name || "");
    }
  }, [isAuthenticated, user]);

  const handleSubmit = async () => {
    // Validation: check if "teamInfo" is filled
    if (!teamInfo) {
      setErrorMessage("The 'Details' field is required.");
      return;
    }

    // Clear error and start submitting
    setErrorMessage("");
    setIsSubmitting(true); // Indicate that submission is in progress

    try {
      await api.post("/team/submit/info", {
        name,
        email,
        providedInfo,
        teamInfo,
      });

      // On success, close the modal and reset form
      alert("Information submitted successfully!");
      setIsDialogOpen(false); // Close the modal after submission
      window.location.reload();
    } catch (error: any) {
      let errorMessage = "Unknown error sending information.";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      console.error("Error sending information:", errorMessage);
      alert(errorMessage);
      setIsDialogOpen(false); // Close the modal after submission
    } finally {
      setIsSubmitting(false); // End the submission process
    }
  };

  const resetForm = () => {
    setTeamInfo("");
    setProvidedInfo(false);
    setErrorMessage("");
  };

  const handleCancel = () => {
    setIsDialogOpen(false); // Close the modal
    resetForm(); // Reset the form fields
  };

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        <a className="underline text-purple-500 cursor-pointer">here</a>
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
              <Input
                id="info"
                placeholder="Input the information about your team and robot"
                value={teamInfo}
                onChange={(e) => {
                  setTeamInfo(e.target.value);
                  setProvidedInfo(true);
                  setErrorMessage(""); // Clear error message when typing
                }}
              />
              {errorMessage && <span className="text-red-500 text-sm">{errorMessage}</span>}
            </div>
          </div>
        </form>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Submit"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
