import os

from dotenv import load_dotenv
from openai import OpenAI

# Carregar as variáveis de ambiente do arquivo .env
load_dotenv()
# Acessar a variável de ambiente OPENAI_KEY
api_key = os.getenv("OPENAI_KEY")

client = OpenAI(api_key = api_key)

client.files.create(
  file = open("data/training_data.jsonl", "rb"),
  purpose = "fine-tune"
)

print(f"file uploaded successfully")