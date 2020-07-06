const knex = require("../../database/connection")
const watsonKeywords = require('../watsonIA/watson.js')

// esse parâmetro é o número da pessoa, é passado çá no index
async function execute(people, message) {

    var food = []
    
    // await watsonKeywords(message).then(response => {
    //     console.log(response);
    // }).catch(err => console.error(err));
    

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

    async function dbConnection() {

        const nameOfCompany = await knex('demand').where('clientName', people).select('nameOfCompany')

        food = await knex('food')
            .where('id', message)
            .where('nameOfCompany', nameOfCompany)
            .select('name')
    }

    await dbConnection()

    changeStage(6)

    return (
        `${food.name} adicionado \n \n Digite 'BEBIDAS' para ir para as bebidas \n Digite '*' para excluir a comida `
    )
    

}

exports.execute = execute;