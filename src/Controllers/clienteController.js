const Pessoa = require('../models/Pessoa');
const Endereco = require('../models/Endereco');
const Telefone = require('../models/Telefone');
const Funcionario = require('../models/Funcionario')
const { insert } = require('../models/ClienteModel');

const clienteController = {

    //Retorna a página inicial do projeto
    // index: (req, res) => {
    //     try {
    //         res.render('pages/index');
    //     }
    //     catch (error) {
    //         console.log(error);
    //         let error_message = verificaErro(error);
    //         res.render('pages/pag_erro', { message: error_message });
    //     }
    // },
    // CREATE/INSERE - CRIA UM NOVO REGISTRO
    adicionarCliente: async (req, res) => {
        try {
            // Desestrutura os dados recebidos do corpo (body). Endereço e telefone podem ter mais de um, portanto podem ser fornecidos em formato de array de objetos [{}]
            const { cpf, nome, data_nasc, genero, email, endereco: [logradouro, bairro, estado, numero, complemento, cep], telefone, funcionario:[data_admissao, crm] } = req.body;

            // Cria o objeto cliente de acordo com a classe endereço
            const objPessoa = new Pessoa({cpf, nome, data_nasc, genero, email});
            
            // Cria uma variável do tipo array que deve receber um ou mais objetos do tipo 'Endereço' ou 'Telefone' 
            const objTelefone = [];
            // Realiza a leitura da variável 'telefone', originada na desestruturação, criando os objetos de acordo com a classe.
            if (telefone.length > 0) {
                telefone.forEach(value => {
                    objTelefone.push(new Telefone(value));
                });
            }

            // Realiza a leitura da variável 'endereço', originada na desestruturação, criando os objetos de acordo com a classe.
            const objEndereco = new Endereco({ logradouro, bairro, estado, numero, complemento, cep });

            const objFuncionario = new Funcionario({data_admissao, crm});
            
            // const sqlCliente = await Cliente.create();:
            // Aciona a função insert da modelCliente
            const result = await insert(objPessoa, objEndereco, objTelefone, objFuncionario);

            // executeSQLQueryParams(sql, params);
            return res.json(result);

        } catch (error) {
            console.log(error);
            // let error_message = verificaErro(error);
            res.json(error);
        }
    },

};

module.exports = clienteController