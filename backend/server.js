require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get('/teste-banco', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM colaborador');
    res.json({
      status: "Sucesso!",
      mensagem: "Conexão com PostgreSQL bem-sucedida. Sprint 1 entregue!",
      dados: resultado.rows
    });
  } catch (erro) {
    console.error("Erro ao conectar no banco:", erro);
    res.status(500).json({ erro: "Falha na conexão com o banco de dados." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`👉 Acesse no navegador: http://localhost:${PORT}/teste-banco`);
});