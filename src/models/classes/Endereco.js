class Endereco {

    constructor(pEnd) {
        this.id = (pEnd[0].id !== null || pEnd[0].id > 0) ? pEnd[0].id : null;
        this.logradouro = pEnd[0].logradouro;
        this.bairro = pEnd[0].bairro;
        this.estado = pEnd[0].estado;
        this.numero = pEnd[0].numero;
        this.complemento = pEnd[0].complemento;
        this.cep = pEnd[0].cep;
    }

    get Id() { return this.id }

    get Logradouro() { return this.logradouro; }
    set Logradouro(value) { this.logradouro = value; }

    get Numero() { return this.numero; }
    set Numero(value) { this.numero = value; }

    get Bairro() { return this.bairro; }
    set Bairro(value) { this.bairro = value; }

    get Complemento() { return this.complemento; }
    set Complemento(value) { this.complemento = value; }

    get Cep() { return this.cep; }
    set Cep(value) { this.cep = value; }

    get Estado() { return this.estado; }
    set Estado(value) { this.estado = value; }
}

module.exports = Endereco;
