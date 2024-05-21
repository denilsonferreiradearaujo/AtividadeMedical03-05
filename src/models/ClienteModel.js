const conectarBancoDeDados = require('../config/db');

async function insert(cliente, endereco, telefone) {
    const connection = await conectarBancoDeDados();
    try {
        /**
         * beginTransaction() inicia a transação.
         * commit() confirma a transação, aplicando todas as alterações feitas durante a transação.
         * rollback() reverte a transação, descartando todas as alterações feitas durante a transação.
         */
        await connection.beginTransaction();
        
        // Insere os endereços fazendo uma leitura dos objetos contidos no array
        const resEnd = await connection.query('INSERT INTO tbl_endereco (logradouro, bairro, estado, numero, complemento, cep) VALUES (?,?,?,?,?,?)', [endereco.logradouro, endereco.bairro, endereco.estado, endereco.numero, endereco.complemento, endereco.cep]);
      

        // Insere o cliente, a variável 'res' nos informa qual é o id do cliente para realizar os 'inserts' de endereços e telefones que contém chave estrangeira (FK)
        const res = await connection.query('INSERT INTO tbl_pessoa (null, cpf, nome, data_nasc, genero, email) VALUES (null, ?, ?, ?, ?, ?)', [cliente.cpf, cliente.nome, cliente.data_nasc]);
        console.log('RESULTADO INSERT CLIENTE =>', res);

        // console.log(telefone, endereco);
        // Insere os telefones fazendo uma leitura dos objetos contidos no array
        telefone.forEach(async (tel) => {
            await connection.query('INSERT INTO telefone (id_cliente, tipo, numero) VALUES (?, ?, ?)', [res[0].insertId, tel.tipo, tel.numero]);
        });


        //INSERT NA TABELA TBL_PESSOA_HAS_TBL_TELEFONE VINCULANDO OS ID'S, INDEPENDENTE DA QUANTIDADE DE TELEFONES POR CLIENTES.
        endereco.forEach(async (telefone) => {
            await connection.query('INSERT INTO tbl_pessoa_has_tbl_telefone (pessoa_id, telefone_id, pessoa_tbl_endereco_id) VALUES (?,?,?)', [res[0].insertId, telefone.pessoa_id, telefone.telefone_id, telefone.pessoa_tbl_endereco_id]);
        });

        // Se todas as queries forem bem-sucedidas, um 'commit' é realizado para confirmar as execuções
        await connection.commit();
        console.log('Transação concluída com sucesso.');
        return ('Transação concluída com sucesso.')
    } catch (error) {
        // Em caso de erro, um 'rollback' é realizado para cancelar as execuções que foram realizadas
        await connection.rollback();
        console.log(error);
        return (error);
    } finally {
        // Fecha a conexão com o banco de dados
        connection.end();

    }
}

module.exports = { insert };