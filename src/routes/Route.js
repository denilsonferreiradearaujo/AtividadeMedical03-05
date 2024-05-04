const express = require("express");
const router = express.Router();

const Controller = require("../controllers/Controller");

router.get("/", Controller.index)
router.get("/cadastro", Controller.cadastro)
router.get("/listar", Controller.listar);
router.get('/editar/:id', Controller.editar);
router.post('/editar/usuario', Controller.salvarEdicao);
// router.get("/clientes/:id",  Controller.selecionarClienteNome);
router.post('/cadastro/novo', Controller.adicionarUsuario);

router.post('/excluir/:id', Controller.deletarUsuario);

router.use(function(req, res){
    res.status(404).render(`pages/pag_erro`, {message:'404 - Página não encontrada'})
})

module.exports = router;