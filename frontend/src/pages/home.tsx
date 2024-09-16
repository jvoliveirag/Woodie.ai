import { NavBar } from "@/components/navbar";
import { SubmitInfoDialog } from "@/components/submit-info-dialog";
import { api } from "@/lib/axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useCompletion } from "ai/react";
import { Wand2 } from "lucide-react";
import { useEffect, useState } from "react";
import { PromptSelect } from "../components/prompt-select";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Separator } from "../components/ui/separator";
import { Slider } from "../components/ui/slider";
import { Textarea } from "../components/ui/textarea";

export function HomePage() {

  const { user, isAuthenticated } = useAuth0();
  useEffect(() => {
    if (isAuthenticated && user) {
      const userEmail = user.email || '';
      setEmail(userEmail);
    }
  }, [isAuthenticated, user]);
  
  const [temperature, setTemperature] = useState(1)
  
  const [email, setEmail] = useState('') //pegar do user (auth0)
  const [teamSubmittedInfo, setTeamSubmittedInfo] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function checkIfTeamSubmittedInfo(email:string) {
    try {
      const response = await api.get(`/team/check/info/${email}`)
      setTeamSubmittedInfo(response.data.hasSubmittedInfo)
      setError(null)
      //console.log('has submitted info', response.data.hasSubmittedInfo)
    } catch (err) {
      setTeamSubmittedInfo(null)
      setError('Equipe não encontrada')
      console.log(error)
    }
  };

  const { input, setInput, handleInputChange, handleSubmit, completion, isLoading } = useCompletion({
    api: `${import.meta.env.VITE_CONNECTION_SERVER}/ai/complete`,
    body: {
      temperature,
    },
    headers: {
      'Content-type': 'application/json',
    }
  })

  checkIfTeamSubmittedInfo(email)

  return (

    <div className="min-h-screen flex flex-col">
      <NavBar path="/home"></NavBar>

      <main className="flex-1 p-6 md:flex gap-6">
        <div className="flex flex-col flex-1 gap-4 mb-6 md:mb-0">
          <div className="grid grid-rows-2 gap-4 flex-1">
            <Textarea 
              className="resize-none p-4 leading-relaxed"
              placeholder="Inclua o prompt para a IA..."
              value={input}
              onChange={handleInputChange}
            />
            <Textarea 
              className="resize-none p-4 leading-relaxed"
              placeholder="Resultado gerado pela IA..." 
              readOnly
              value={completion}
            />
          </div>

          <p className="text-xs text-muted-foreground hidden md:flex md:gap-1">
            Desenvolvido por <a href='https://www.linkedin.com/in/joaov-oliveira/' className="underline text-violet-400">João Victor de Oliveira</a>| Cachoeira de Minas, 2023. Todos os direitos reservados.
          </p>
        </div>

        <aside className="md:w-80 md:space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="space-y-2">
              <Label>Prompts cadastrados</Label>
              <PromptSelect onPromptSelected={setInput} />
            </div>

            <div className="space-y-2">
              <Label>Modelo</Label>
              <Select disabled defaultValue="woodie">
                <SelectTrigger>
                  <SelectValue/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt3.5">GPT 3.5 turbo 16k</SelectItem>
                  <SelectItem value="woodie">ft-woodie.ai-robot-design</SelectItem>
                </SelectContent>
              </Select>
              <span className="block text-xs text-muted-foreground italic">
                Você poderá customizar essa opção em breve
              </span>
            </div>

            <Separator/>

            <div className="space-y-4">
              <Label>Temperatura: <span className="border border-slate-800 rounded-sm px-1 text-base">{temperature}</span></Label>
              <Slider
                className="cursor-pointer"
                min={0}
                max={2}
                step={0.1}
                value={[temperature]}
                onValueChange={value => setTemperature(value[0])}
              />
              <span className="block text-xs text-muted-foreground italic leading-relaxed">
                Valores mais altos tendem a deixar o resultado mais criativo (porém com possíveis erros).
              </span>
            </div>

            <Separator />

            <Button disabled={isLoading || !teamSubmittedInfo} type="submit" className="w-full">
              Executar
              <Wand2 className="w-4 h-4 ml-2"/>
            </Button>
            {!teamSubmittedInfo && (
              <span className="block text-base text-muted-foreground italic leading-relaxed">
                Para desbloquear o botão insira suas informações clicando <SubmitInfoDialog></SubmitInfoDialog>.
              </span>
            )}

          </form>
        </aside>

      </main>
      <p className="text-xs text-muted-foreground md:hidden text-center align-baseline mb-4">
        Desenvolvido por <a href='https://www.linkedin.com/in/joaov-oliveira/'><code className="text-violet-400">{'{João Victor de Oliveira}'}</code></a>, Cachoeira de Minas, 2023. Todos os direitos reservados.
      </p>
    </div>
  )
}


  