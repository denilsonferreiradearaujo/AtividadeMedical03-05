const express = require("express");
const router = express.Router();

const Controller = require("../Controllers/clienteController");

router.post('/cliente', Controller.adicionarCliente);
router.put('/cliente/:cpf', Controller.atualizarCliente);
router.delete('/cliente/:cpf', Controller.deletarCliente);
router.get('/clientes', Controller.exibirTodos);
router.get('/cliente/:cpf', Controller.exibirCliente);

// router.get("/", Controller.index)

// router.use(function(req, res){
//     res.status(404).render(`pages/pag_erro`, {message:'404 - Página não encontrada'})
// })

module.exports = router;