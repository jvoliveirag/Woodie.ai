# Estudo sobre a Aplicação de Fine-Tuning na Robotica Educacional 

Este repositório abriga um estudo abrangente que investiga a convergência entre a <b>Inteligência Artificial (IA)</b> e a <b>robótica educacional</b>, propondo a utilização do <b><i>fine-tuning</i></b> como solução para os desafios enfrentados por equipes nesse contexto. Desde a concepção até os avanços atuais, a IA desempenha um papel fundamental na sociedade, e a robótica educacional, focada em <b><i>STEM</i></b>, adota práticas inovadoras para educar alunos, mas enfrenta obstáculos como escassez de recursos e disparidades em competições.

## Objetivo do Estudo 🎯
O objetivo central deste trabalho é explorar a aplicação do fine-tuning como uma ferramenta para disseminar conhecimento de maneira equitativa entre equipes de robótica educacional. Buscamos superar obstáculos, impulsionar o desenvolvimento e fortalecer a comunidade por meio dessa abordagem inovadora.

Aqui são encontrados todos os códigos e arquivos relacionados ao desenvolvimento da aplicação.

## Desenvolvimento 🔨

O projeto é dividido em três partes principais:

1. **<i>Backend</i>:** Consome o modelo criado através da <i>API</i> da OpenAI e expõe uma rota, por meio do <i>fastify</i> para conexão com o <i>frontend</i>. Também atua nas lógicas de negócio, tais como a validação dos dados e o envio de informações.


2. **<i>Frontend</i>:** Responsável pela interação do usuário com o modelo treinado, bem como a inserção das informações da equipe. Foram criados componentes específicos para cada parte utilizando os <i>React hooks</i> para gerenciar os estados e enviar os dados nas requisições para o <i>backend</i>.


3. **<i>Fine-tuning:</i>** Aqui são aplicados os fundamentos de <i>Machine Learning</i>, bem como as práticas recomendadas pela <a href="#openai">OpenAI</a>.
    * Primeiramente foram coletados e gerados dados sobre o tema;
    * Então foram divididos em 70% para treino e 30% para teste; 
    * Em seguida os dados foram estruturados conforme especificado na documentação da OpenAI (vide no exemplo abaixo ou <a href="https://github.com/jvoliveirag/TCC/blob/main/fine_tuning/data/training_data.jsonl">clique aqui</a> para visualizar todo o arquivo)

      ~~~JSON
      {"messages": [{"role": "system", "content": "Você é um assistente técnico que ajuda uma equipe da FIRST LEGO League no processo de design de robôs, que inclui montagem com peças LEGO (rodas, sensores, controladores, etc), programação em blocos, estratégia na mesa de missões, documentação, apresentação, melhorias contínuas, pensamento crítico, proatividade e trabalho em equipe."}, {"role": "user", "content": "Como nós podemos ajustar as configurações do controlador PID para atender às necessidades específicas do nosso robô, considerando a estratégia de missão?"}, {"role": "assistant", "content": "Realizem testes práticos, coletem dados de desempenho, e ajustem os parâmetros do PID com base nos resultados para otimizar o controle do robô."}]}
      ~~~

    * Após isso foram validados e algumas métricas foram geradas, tais como (arquivo de exemplo - gerado no primeiro treinamento):

      ```
      Num samples: 196
      No errors found
      Num examples missing system message: 0
      Num examples missing user message: 0

      Distribution of num_messages_per_example:
      min / max: 3, 23
      mean / median: 3.4591836734693877, 3.0
      p5 / p95: 3.0, 3.0

      Distribution of num_total_tokens_per_example:
      min / max: 65, 761
      mean / median: 121.99489795918367, 106.0
      p5 / p95: 83.0, 135.0

      Distribution of num_assistant_tokens_per_example:
      min / max: 18, 450
      mean / median: 58.755102040816325, 44.0
      p5 / p95: 33.0, 86.5

      0 examples may be over the 4096 token limit, they will be truncated during fine-tuning
      Dataset has ~23911 tokens that will be charged for during training
      By default, you'll train for 3 epochs on this dataset
      By default, you'll be charged for ~71733 tokens''
      ```

    * Com os dados validados, é feito o <i>upload</i> do arquivo <code>.jsonl</code> para o ambiente da OpenAI, onde o novo modelo será treinado;

    * Por fim, é feito o treinamento do modelo, com base nos dados enviados e este fica disponível para uso no <i>playground</i> da OpenAI, ou como <i>API</i>, que é o caso deste projeto.

    <b><u>OBS.:</u></b> é importante ressaltar que o <i>fine-tuning</i> (<i><a href="https://www.leewayhertz.com/parameter-efficient-fine-tuning/">PEFT</a></i>) permite que sejam usadas menores quantidades de dados para o treinamento do modelo.

    ***Métricas***

    Os gráficos a seguir representam a perda no treinamento do primeiro e do último modelo gerados. 
    
    <img src="./images/graficos_perda.png">
    
    O primeiro gráfico exibe as perdas (eixo y) no treinamento, podendo ser observada grande variação ao longos dos “passos” (eixo x). O resultado final próximo de 1, vindo de uma crescente e inciando uma queda, mostra que ainda é possível reduzir significativamente as perdas e aproximar do valor ideal (0), o que já pode ser observado no segundo gráfico.


## Funcionamento ⚙️

1. Clone este repositório em sua máquina;

2. Em seguida, para instalar as dependências, nos diretórios do /frontend e /backend - para cada um - execute:

```
npm install
```

3. Na sequência, execute o comando a seguir para rodar a aplicação (tanto para o <i>front</i> quanto para o <i>backend</i>):
```
npm run dev
```

4. Para iniciar a comunicação com o banco de dados (abstração - <i>ORM</i>)
```
npx prisma studio
```

Após estes passos a aplicação estará pronta para uso, o qual é demonstrado no vídeo disponível em: https://youtu.be/bqWryQXb0RM.

<b><u>OBS.:</u></b> Os endpoints podem ser testados diretamente no arquivo <code>routes.http</code>

## Requisitos 📋
* Python <i>(v3.10)</i>
* Numpy
* OpenAI <i>(API key e lib)</i>
* TypeScript <i>(v5.0.2)</i>
* ReactJS <i>(v18.2.0)</i>
* TailwindCSS
* Axios
* NodeJS <i>(v18.17.1)</i>
* Fastify <i>(v4.23.0)</i>
* PrismaORM <i>(v5.2.0)</i>

## Implementações futuras 💡
* Adequação do banco de dados;
* Testes automatizados, <i>CI/CD</i> e lançar oficialmente;
* Salvar e poder selecionar prompts para consultar ou refazê-los;
* Seleção de modelos para diferentes competições, categorias, etc;
* Customização dos modelos (Open-source).

## Referências 📚

<b><a id="openai">OpenAI</a>:</b> https://platform.openai.com/docs/guides/fine-tuning

<b>OpenAI Cookbook:</b> https://cookbook.openai.com/examples/chat_finetuning_data_prep


