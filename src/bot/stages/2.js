const knex = require("../../database/connection")
const { Client } = require('whatsapp-web.js');

// esse parâmetro é o número da pessoa, é passado çá no index
async function execute(people, message) {


    const nameOfCompany = message
    const clientName = people
    var companyName = []

    var nameCompany = []

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
    https://api.whatsapp.com/send?phone=6399299278&text=oi
    async function dbConnection() {
        await knex('demand').insert({
            nameOfCompany,
            clientName
        })

        companyName = await knex('company').where('name', nameOfCompany).select('name')
        console.log(companyName[0].name);

    }



    async function end() {
        await dbConnection().then(() => {
            if (companyName.length == 0) {
                response = 'Restaurante não encontrado'
                changeStage(1);
            } else {
                response = `Restaurante ${companyName[0].name} encontrado \n Digite '#' para escolher outro restaurante \n Para continuar Digite '*'`
                changeStage(3)
            };
        })
    }

    await end()

    return await `${response}`;
}



exports.execute = execute;