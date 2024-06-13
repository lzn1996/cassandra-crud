const express = require("express");
const cassandra = require("cassandra-driver");
const { v4: uuidv4 } = require("uuid");
const app = express();
const client = new cassandra.Client({
  contactPoints: ["localhost"],
  localDataCenter: "datacenter1",
  keyspace: "mykeyspace",
});

app.use(express.json());

app.post("/users", async (req, res) => {
  try {
    const { email, nome } = req.body;
    const id = uuidv4();
    const query = "INSERT INTO users (id, email, name) VALUES (?, ?, ?)";
    await client.execute(query, [id, email, nome], { prepare: true });
    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const result = await client.execute("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const { email, nome } = req.body;
    const id = req.params.id;
    let query = "";

    const userDoesntExists = await client.execute(
      "SELECT * FROM users WHERE id = ?",
      [id],
      { prepare: true }
    );

    if (userDoesntExists.rowLength === 0) {
      res.status(404).json({ error: "Usuário não encontrado." });
      return;
    }

    if (email && nome) {
      query = "UPDATE users SET email = ?, name = ? WHERE id = ?";
      await client.execute(query, [email, nome, id], { prepare: true });
    }

    if (email && !nome) {
      query = "UPDATE users SET email = ? WHERE id = ?";
      await client.execute(query, [email, id], { prepare: true });
    }

    if (nome && !email) {
      query = "UPDATE users SET name = ? WHERE id = ?";
      await client.execute(query, [nome, id], { prepare: true });
    }

    res.json({ message: "Usuário atualizado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = "DELETE FROM users WHERE id = ?";

    const userDoesntExists = await client.execute(
      "SELECT * FROM users WHERE id = ?",
      [id],
      { prepare: true }
    );

    if (userDoesntExists.rowLength === 0) {
      res.status(404).json({ error: "Usuário não encontrado." });
      return;
    }

    await client.execute(query, [id], { prepare: true });
    res.json({ message: "Usuário excluído com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
