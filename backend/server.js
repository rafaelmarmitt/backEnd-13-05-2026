require('dotenv').config()
const path = require('path');
const cors = require('cors');
const express = require('express');

const authRoutes = require('./routes/authRoutes');
const convidadosRoutes = require('./routes/convidadosRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');
const mesasRoutes = require('./routes/mesasRoutes');
const checkinsRoutes = require('./routes/checkinsRoutes');

const app = express();
const PORT = process.env.DB_PORT;

// Middlwares Globais
app.use(cors());
app.use(express.json());

// Rotas da API
app.use('/api/login', authRoutes);
app.use('/api/convidados', convidadosRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/checkins', checkinsRoutes);
app.use('/api/mesas', mesasRoutes);

// Servir o Front
app.use(express.static(path.join(__dirname, '../frotend')))
// Rota de Fallback
app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../frotend/index.html'))
})

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT} || http://localhost:${PORT}`)
})