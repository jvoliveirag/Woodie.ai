import { fastifyCors } from "@fastify/cors";
import { fastify } from "fastify";
import { checkIfTeamSubmittedInfo } from "./routes/check-submitted-info";
import { generateAiCompletionRoute } from "./routes/generate-ai-completion";
import { getAllPromptsRoute } from "./routes/get-all-prompts";
import { submitTeamInfo } from "./routes/submit-team-info";

const app = fastify()
const defaultPort = 3333

app.register(fastifyCors, {
  origin: "*", //em prod colocar exatamente o endereço do front
})
app.register(getAllPromptsRoute) //todos os modulos (getAllPromptsRoute, nesse caso) usando o register devem ser asincronos
app.register(generateAiCompletionRoute)
app.register(submitTeamInfo)
app.register(checkIfTeamSubmittedInfo)

app.listen({
  host: "0.0.0.0",
  port: process.env.PORT ? Number(process.env.PORT) : defaultPort,
}).then(() => {
  console.log("HTTP Server running")
})

