import os

from dotenv import load_dotenv
from openai import OpenAI

# Carregar as variáveis de ambiente do arquivo .env
load_dotenv()
# Acessar as variáveis de ambiente
api_key = os.getenv("OPENAI_KEY")
file_id = os.getenv("FILE_ID")

client = OpenAI(api_key = api_key)
client.fine_tuning.jobs.create(
  training_file = file_id, 
  model = "gpt-3.5-turbo",
  suffix = "woodie.ai"
)