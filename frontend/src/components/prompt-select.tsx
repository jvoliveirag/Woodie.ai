import { api } from "@/lib/axios"
import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

interface Prompt {
  id: string
  title: string
  template: string
}

interface PromptSelectProps {
  onPromptSelected: (template: string) => void
  reloadKey: number; // Usado para forçar o recarregamento quando algo mudar no componente pai
}

export function PromptSelect(props: PromptSelectProps) {

  const [prompts, setPrompts] = useState<Prompt[] | null>(null)

  useEffect(() => {
    api.get('/prompts').then(response => {
      setPrompts(response.data)
    })
  },[props.reloadKey]) // Quando reloadKey mudar, faz a requisição novamente

  function handlePromptSelected(promptId: string) {
    const selectedPrompt = prompts?.find(prompt => prompt.id === promptId)

    if(!selectedPrompt){
      return
    }

    props.onPromptSelected(selectedPrompt.template)
  }

  return (
    <Select onValueChange={handlePromptSelected} disabled={!prompts || prompts.length === 0}>
      <SelectTrigger>
        <SelectValue placeholder={!prompts || prompts.length === 0 ? "There are no saved prompts" : "Select a prompt"}/>
      </SelectTrigger>
      <SelectContent className="max-h-28 overflow-y-auto">
        {prompts?.map(prompt => {
          return(
            <SelectItem key={prompt.id} value={prompt.id}>
              {prompt.title}
            </SelectItem>
          ) 
        })}
      </SelectContent>
    </Select>
  )
}