require('dotenv').config()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Função de login
exports.login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email, !senha) {
        return res.status(400).json({ erro: 'Email e senha são obrigatórios ppara efetuar o login!' })
    };

    try {
        const [[usuario]] = await db.execute('SELECT * FROM usuarios');

        if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
            return res.status(400).json({ Erro: 'Credenciais de Login inválidas!' })
        }

        const token = jwt.sing({
            id_usuario: usuario.id_usuario,
            perfil: usuario.perfil,
            nome: usuario.nome
        }, process.env.JWT_SECRET || 'ChaveSecreta',
            {
                expiresIn: '8h'
            }
        )

        return res.json(
            {
                mensagem: 'Login efetuado com sucesso!',
                token, usuario: {
                    id: usuario.id_usuario,
                    perfil: usuario.perfil,
                    nome: usuario.nome
                }
            }
        )
    } catch (error) {
        return res.status(500).json({ erro: 'Erro no servidor ao efetuar Login' });
    }
}