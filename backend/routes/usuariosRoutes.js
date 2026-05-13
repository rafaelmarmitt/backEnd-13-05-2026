const express = require('express');
const Router = express.Router()
const usuariosController = require('../controllers/usuariosController');

router.get('/', usuariosController.listar);
router.post('/', usuariosController.criar);
router.put('/:id', usuariosController.editar);
router.patch('/:id', usuariosController.alterarPerfil);
router.delete('/:id', usuariosController.excluir);

module.exports = router