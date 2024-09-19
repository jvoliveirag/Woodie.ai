import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface Response {
  id: string;
  title: string;
  text: string;
}

interface ResponseSelectProps {
  onResponseSelected: (text: string) => void;
}

export function ResponseSelect({ onResponseSelected }: ResponseSelectProps) {
  const [responses, setResponses] = useState<Response[] | null>(null);

  useEffect(() => {
    api.get("/responses").then((response) => {
      setResponses(response.data);
    });
  }, []);

  function handleResponseSelected(responseId: string) {
    const selectedResponse = responses?.find((response) => response.id === responseId);

    if (selectedResponse) {
      // Passa o texto da resposta selecionada para o componente pai
      onResponseSelected(selectedResponse.text);
    }
  }

  return (
    <Select onValueChange={handleResponseSelected} disabled={!responses || responses.length === 0}>
      <SelectTrigger>
        <SelectValue
          placeholder={!responses || responses.length === 0 ? "There are no saved responses" : "Select a response"}
        />
      </SelectTrigger>
      <SelectContent className="max-h-28 overflow-y-auto">
        {responses?.map((response) => (
          <SelectItem key={response.id} value={response.id}>
            {response.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
