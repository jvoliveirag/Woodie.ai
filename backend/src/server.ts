import { fastifyCors } from "@fastify/cors";
import { fastify } from "fastify";
import { generateAiCompletionRoute } from "./routes/generate-ai-completion";
import { getAllPromptsRoute } from "./routes/get-all-prompts";

const app = fastify()

app.register(fastifyCors, {
  origin: "*", //em prod colocar exatamente o endereço do front
})
app.register(getAllPromptsRoute) //todos os modulos (getAllPromptsRoute, nesse caso) usando o register devem ser asincronos
app.register(generateAiCompletionRoute)

app.listen({
  port:3333,
}).then(() => {
  console.log('HTTP Server running')
})

