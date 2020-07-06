// Nesse arquivo eu importo o banco com as informações do usuário

const knex = require("../../database/connection")
const watsonKeywords = require('../watsonIA/watson.js')

// essa é a função chamada no index

// esse parâmetro é o número da pessoa, é passado çá no index
async function execute(person, message){

    async function changeStage(numberOfStage) {
        
        //nessa linha eu uso o número da pessoa pra mudar o stage dela no banco
        //Dessa forma, eu esperava que na próxima vez qua a pessoa mandar a mensagem, era pra ela ir para o 
        //stage 1, pq eu alterei aqui, só que no arquivo index, o usuário continua com o stage 0
        await knex('userZap').where('user', person).update({stage: numberOfStage})

        const banco = await knex('userZap').where('user', person)

        console.log(banco)
    }

    changeStage(1)
    // esta é a resposta que será enviada
    // const resultsAI = await watsonKeywords(message).then(response => {
    //   console.log(response);
    // }).catch(err => console.error(err));


    // resultsAI.map(e => {
    //   comparsion = await knex('food').where('name', resultsAI[0])
    // })

    return (
      'Olá, sou o Sherlock, vou te ajudar a encher sua barriga. \n 1 - Quer buscar um restaurante específico \n 2 -  Quer encontrar restaurantes próximos a você'
    );
}

exports.execute = execute;