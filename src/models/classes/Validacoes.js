 class Validacoes {
    static DataConvert(value) {
        console.log(value);
        let [dia, mes, ano] = value.split('/'); 
        let dataFormatada = `${ano}-${mes}-${dia}`;
        const newDate = new Date(dataFormatada);
        return newDate;
    }
 }

 module.exports = Validacoes; 