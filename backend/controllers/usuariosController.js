require('dotenv').config()
const bcrypt = require('bcryptjs');
const db = require('../config/db');

// Listar Usuários
exports.listar = async (req, res) => {
    try {
        const [usuarios] = await db.execute('SELECT id_usuario, nome, cpf, email, telefone, perfil FROM usuarios ORDER BY nome ASC');
        return res.json(usuarios)
    } catch (error) {
        console.error('Erro ao listar usuários: ', error);
        return res.status(500).json({ erro: 'Erro no servidor ao listar usuários' });
    };
};

// Criar Usuários
exports.criar = async (req, res) => {
    const { nome, cpf, email, telefone, perfil, senha } = req.body;

    if (!nome || !cpf || !email || !telefone || !perfil || !senha) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios para o cadastro de um Usuário' })
    }

    try {
        const hash = await bcrypt.hash(senha, 10);
        await db.execute('INSERT INTO usuarios (nome, cpf, email, telefone, perfil, senha) VALUES(?,?,?,?,?,?)', [nome, cpf, email, telefone, perfil, hash]);
        return res.status(201).json({ mensagem: 'Usuário criado com sucesso!' })
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ erro: 'Já existe um usuário com este E-mail ou com este CPF cadastrado no sistema!' })
        }
        console.error('Erro ao criar usuário: ', error);
        return res.status(500).json({ erro: 'Erro no servidor ao criar usuário' })
    }
}

// Editar Usuários
exports.editar = async (req, res) => {
    const { nome, cpf, email, telefone, perfil, senha } = req.body;
    const { id } = req.params;

    if (!nome || !cpf || !email || !telefone || !perfil || !senha) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios para o cadastro de um Usuário' })
    }

    try {
        if (senha) {
            const hash = await bcrypt.hash(senha, 10);
            await db.execute('INSERT INTO usuarios nome =?, cpf =?, email =?, telefone =?, perfil =?, senha =? WHERE id_usuario=?', [nome, cpf, email, telefone, perfil, hash]);
        } else {
            await db.execute('INSERT INTO usuarios nome =?, cpf =?, email =?, telefone =?, perfil =? WHERE id_usuario=?', [nome, cpf, email, telefone, perfil]);
        }
        return res.status(201).json({ mensagem: 'Usuário alterado com sucesso!' })
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ erro: 'Já existe um usuário com este E-mail ou com este CPF cadastrado no sistema!' })
        }
        console.error('Erro ao editar usuário: ', error);
        return res.status(500).json({ erro: 'Erro no servidor ao editar usuário' })
    }
}

// Excluir Usuário
exports.excluir = async (req, res) => {
    const { id } = req.params;

    try {
        await db.execute('DLEETE FROM usuarios WHERE id_usuario=?')
    } catch (error) {
        console.error('Erro ao excluir usuário: ', error);
        return res.status(500).json({ erro: 'Erro no servidor ao excluir usuário' })
    }
}