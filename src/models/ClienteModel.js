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
console.log(resEnd);
        // Obtém o ID do endereço inserido
        const enderecoId = resEnd[0].insertId;

        // Insere o cliente com o endereco_id
        const resPessoa = await connection.query('INSERT INTO tbl_pessoa (cpf, nome, data_nasc, genero, email, endereco_id) VALUES (?, ?, ?, ?, ?, ?)', [cliente.cpf, cliente.nome, cliente.data_nasc, cliente.genero, cliente.email, enderecoId]);
        console.log('RESULTADO INSERT CLIENTE =>', resPessoa);

        // Restante do código...

        // console.log(telefone, endereco);
        // Insere os telefones fazendo uma leitura dos objetos contidos no array
        const idsTel = [];
        
        telefone.forEach(async (tel) => {
            console.log(`RESULTADO DO OBJETO`,tel);
            const resTel =  await connection.query('INSERT INTO tbl_telefone (numero) VALUES (?)', [tel.numero]);
            console.log(`RESULTADO DO RESTEL =>`, resTel);
            idsTel.push(resTel[0].insertId);
        });
        console.log(idsTel);
        //INSERT NA TABELA TBL_PESSOA_HAS_TBL_TELEFONE VINCULANDO OS ID'S, INDEPENDENTE DA QUANTIDADE DE TELEFONES POR CLIENTES.
        idsTel.forEach(async (idTel) => {
            await connection.query('INSERT INTO tbl_pessoa_has_tbl_telefone (pessoa_id, telefone_id, pessoa_tbl_endereco_id) VALUES (?,?,?)',
             [resPessoa[0].insertId, idTel, enderecoId]);
        });

        // Se todas as queries forem bem-sucedidas, um 'commit' é realizado para confirmar as execuções
        await connection.commit();
        console.log('Transação concluída com sucesso.');
        return 'Transação concluída com sucesso.';
    } catch (error) {
        // Em caso de erro, um 'rollback' é realizado para cancelar as execuções que foram realizadas
        await connection.rollback();
        console.log(error);
        return error;
    } finally {
        // Fecha a conexão com o banco de dados
        connection.end();
    }
}

module.exports = { insert };
