
// Imports da classes
const Consulta = require('../models/classes/Consulta');
const Endereco = require('../models/classes/Endereco');
const Especialidade = require('../models/classes/Especialidade');
const Funcionario = require('../models/classes/Funcionario');
const Login = require('../models/classes/Login');
const Paciente = require('../models/classes/Paciente');
const Perfis = require('../models/classes/Perfis');
const Pessoa = require('../models/classes/Pessoa');
const Prontuario = require('../models/classes/Prontuario');
const Telefone = require('../models/classes/Telefone');

// Import das funções das ClienteModel
const { insert, remove } = require('../models/query/ClienteModel');


const clienteController = {
    adicionarCliente: async (req, res) => {
        try {
            const { cpf, nome, data_nasc, genero, email, endereco, telefone, funcionario } = req.body;
            const objPessoa = new Pessoa({ cpf, nome, data_nasc, genero, email });
            const objEndereco = new Endereco(endereco);            
            const objTelefones = telefone.map(tel => new Telefone(tel));
            const objFuncionario = new Funcionario(funcionario);
            const result = await insert(objPessoa, objEndereco, objTelefones, objFuncionario);
            return res.json(result);
        } catch (error) {
            console.log(error);
            res.json(error);
        }
    },

    atualizarCliente: async (req, res) => {
        try {
            const cpf = req.params.cpf;
            const { nome, data_nasc, genero, email, endereco, telefone, funcionario } = req.body;
            const objPessoa = new Pessoa({ cpf, nome, data_nasc, genero, email });
            const objEndereco = new Endereco(endereco);
            const objTelefones = telefone.map(tel => new Telefone(tel));
            const objFuncionario = new Funcionario(funcionario);
            const result = await update(objPessoa, objEndereco, objTelefones, objFuncionario);
            return res.json(result);
        } catch (error) {
            console.log(error);
            res.json(error);
        }
    },

    deletarCliente: async (req, res) => {
        try {
            const cpf = req.params.cpf;
            const result = await remove(cpf);
            return res.json(result);
        } catch (error) {
            console.log(error);
            res.json(error);
        }
    },

    exibirTodos: async (req, res) => {
        try {
            const result = await findAll();
            return res.json(result);
        } catch (error) {
            console.log(error);
            res.json(error);
        }
    },

    exibirCliente: async (req, res) => {
        try {
            const cpf = req.params.cpf;
            const result = await buscarCpf(cpf);
            return res.json(result);
        } catch (error) {
            console.log(error);
            res.json(error);
        }
    }
};

module.exports = clienteController;