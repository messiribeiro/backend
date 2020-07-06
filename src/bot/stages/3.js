const knex = require("../../database/connection")


// esse parâmetro é o número da pessoa, é passado lá no index
async function execute(people, message) {

    var response = ''

    async function changeStage(numberOfstage) {

        //nessa linha eu uso o número da pessoa pra mudar o stage dela no banco
        //Dessa forma, eu esperava que na próxima vez qua a pessoa mandar a mensagem, era pra ela ir para o 
        //stage 1, pq eu alterei aqui, só que no arquivo index, o usuário continua com o stage 0
        await knex('userZap')
            .where('user', people)
            .update({
                stage: numberOfstage
            })
    }


    if(message == '*') {
        changeStage(4)
        await knex('demand').where('clientName', people).delete('nameOfCompany');
        response = 'Vamos começar pela sua comida. \n \n Caso queira pular para as bebidas, digite "BEBIDAS" \n Para continuar pressione "*" ';

    }else if(message == '#'){
        changeStage(4)
    }else {
        changeStage(2)
        response = 'Desculpe, não entendi';
    }


    return response
}

exports.execute = execute;