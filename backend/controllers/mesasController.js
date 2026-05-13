const db = require('../config/db');

// Listar Mesas
exports.listar = async (req, res) => {
    try {
        const query = `
        SELECT 
            m.id_mesa,
            m.numero_mesa,
            m.capacidade,
            COUNT(c.id_convidados) + COUNT(a._id_acompanhantes) AS ocupacao
        FOM mesas.m
        LEFT JOIN convidados c ON m.id_mesa = c.fk_mesa,
        LEFT JOIN acompanhantes a ON c.id_convidado = a.fk_acompanhante,
        GROUP BY m.id_mesa, m.numero_mesa, m.capacidade,
        ORDER BY m.numero_mesa ASC
    `;

        const [mesas] = await db.execute(query);
        return res.json(mesas);
    } catch (error) {
        console.error('Erro ao listar mesas: ', error);
        return res.status(500).json({ erro: 'Erro no servidor ao listar mesas' })
    }
};

// Criar Mesa
exports.criar = async (req, res) => {
    const { numero_mesa, capacidade } = req.body;

    if (!numero_mesa) {
        return res.status(400).json({ erro: 'Número da mesa é obrigatório para registro' })
    }

    try {
        const cap = capacidade || 8;
        await db.execute('INSERT INTO mesas (numero_mesa, capacidade) VALUES (?,?)', [numero_mesa, cap]);
        return res.status(201).json({ mensagem: 'Mesa criada com sucesso!' });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ erro: 'Já existe uma mesa com este número no sistema' })
        }
        console.error('Erro ao criar mesa: ', error);
        return res.status(500).json({ erro: 'Erro no servidor ao criar mesa' })
    }
};

// Editar Mesa
exports.editar = (req, res) => {
    const { numero_mesa, capacidade } = req.body;
    const {id} = req.params;

    try {
        const 
    }
}