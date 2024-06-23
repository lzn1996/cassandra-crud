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
   git clone <https://github.com/lzn1996/cassandra-crud.git>
   cd <cassandra-crud>
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

5. **Abra uma segunda aba no terminal**
   Agora é preciso conversar com o CQLSH (Cassandra Query Language SHell) para poder criar o KEYSPACE e as Tabelas à serem manipuladas

   Use o comando abaixo para conseguir acesso ao CQLSH pela CLI

   ```sh
   docker exec -it cassandra-container cqlsh
   ```

   Após isso estará disponível o shell do CQL, então, iremos criar o KEYSPACE (que é o container dos dados, onde as tabelas estarão)
   Iremos entrar nele, e depois iremos estar habilitados à criação da tabela users, que é a tabela onde o CRUD será feito

   Para criar o KEYSPACE, acessar ele e Criar as tabelas (lembre-se do ponto e vírgula), use:

   ```sh
         CREATE KEYSPACE cass  WITH replication = {'class': 'SimpleStrategy','replication_factor': 1 };

     use cas;

     CREATE TABLE users (id UUID PRIMARY KEY,email TEXT,name TEXT);

   ```

### Usando o Postman

Para testar os endpoints, você pode usar o Postman. Baixe e instale o Postman em [Postman](https://www.postman.com/downloads/).

Crie nova request HTTP, coloque a URL e escolha o método

### Endpoints

1. **Criar um usuário**

   - **Endpoint**: `POST http://localhost:3000/users`
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

   - **Endpoint**: `GET http://localhost:3000/users`
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

   - **Endpoint**: `PUT http://localhost:3000/users/:id`
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

   - **Endpoint**: `DELETE http://localhost:3000/users/users/:id`
   - **Descrição**: Exclui um usuário.
   - **Resposta de sucesso**:

     ```json
     {
       "message": "Usuário excluído com sucesso"
     }
     ```
