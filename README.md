# cassandra-crud

## Passo a passo

Este tutorial irá guiá-lo através das etapas para configurar e executar um CRUD utilizando Cassandra com Node.js.

### Pré-requisitos

1. **Node.js**: Certifique-se de ter o Node.js instalado em sua máquina. Você pode baixar o instalador em [Node.js](https://nodejs.org/).

2. **Docker Desktop**: O Docker será usado para executar o Cassandra em um contêiner. Baixe e instale o Docker Desktop a partir de [Docker Desktop](https://www.docker.com/products/docker-desktop).

### Passos para configuração

1. **Clone o repositório**

   Clone o repositório para sua máquina local:

   ```sh
   git clone <URL_DO_REPOSITORIO>
   cd <NOME_DO_REPOSITORIO>
   ```

2. **Instale as dependências**

   No diretório do projeto, instale as dependências do Node.js:

   ```sh
   npm install
   ```

3. **Configure e inicie o Cassandra com Docker**

   Execute o seguinte comando para iniciar um contêiner Cassandra:

   ```sh
   docker run --name cassandra-container -p 9042:9042 -d cassandra:latest
   ```

4. **Execute a aplicação**

   Inicie o servidor Node.js:

   ```sh
   node index.js
   ```

   O servidor estará rodando em [http://localhost:3000](http://localhost:3000).

### Usando o Postman

Para testar os endpoints, você pode usar o Postman. Baixe e instale o Postman em [Postman](https://www.postman.com/downloads/).

### Endpoints

1. **Criar um usuário**

   - **Endpoint**: `POST /users`
   - **Descrição**: Cria um novo usuário.
   - **Exemplo de corpo da requisição**:

     ```json
     {
       "email": "usuario@example.com",
       "nome": "Nome do Usuário"
     }
     ```

   - **Resposta de sucesso**:

     ```json
     {
       "message": "Usuário criado com sucesso"
     }
     ```

2. **Listar usuários**

   - **Endpoint**: `GET /users`
   - **Descrição**: Retorna uma lista de todos os usuários.
   - **Resposta de sucesso**:

     ```json
     [
       {
         "id": "uuid",
         "email": "usuario@example.com",
         "name": "Nome do Usuário"
       }
     ]
     ```

3. **Atualizar um usuário**

   - **Endpoint**: `PUT /users/:id`
   - **Descrição**: Atualiza as informações de um usuário.
   - **Exemplo de corpo da requisição**:

     ```json
     {
       "email": "novoemail@example.com",
       "nome": "Novo Nome"
     }
     ```

   - **Resposta de sucesso**:

     ```json
     {
       "message": "Usuário atualizado com sucesso"
     }
     ```

4. **Excluir um usuário**

   - **Endpoint**: `DELETE /users/:id`
   - **Descrição**: Exclui um usuário.
   - **Resposta de sucesso**:

     ```json
     {
       "message": "Usuário excluído com sucesso"
     }
     ```

Siga esses passos para configurar e executar o CRUD com Cassandra. Use o Postman para testar os endpoints conforme necessário.