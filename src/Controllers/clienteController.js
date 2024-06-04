const Pessoa = require('../models/Pessoa');
const Endereco = require('../models/Endereco');
const Telefone = require('../models/Telefone');
const Funcionario = require('../models/Funcionario');
const { insert } = require('../models/ClienteModel');

const clienteController = {
    adicionarCliente: async (req, res) => {
        try {
            // Desestrutura os dados recebidos do corpo (body)
            const { cpf, nome, data_nasc, genero, email, endereco, telefone, funcionario } = req.body;

            // Cria o objeto cliente de acordo com a classe Pessoa
            const objPessoa = new Pessoa({ cpf, nome, data_nasc, genero, email });

            // Cria o objeto endereço
            // console.log(endereco);
            const objEndereco = new Endereco(endereco);
            console.log(objEndereco);
            

            // Cria os objetos de telefone
            const objTelefones = telefone.map(tel => new Telefone(tel));
            
            // Cria o objeto funcionário
            const objFuncionario = new Funcionario(funcionario);

            // Aciona a função insert da modelCliente
            const result = await insert(objPessoa, objEndereco, objTelefones, objFuncionario);

            // Retorna o resultado da inserção
            return res.json(result);
        } catch (error) {
            console.log(error);
            res.json(error);
        }
    },
};

module.exports = clienteController;