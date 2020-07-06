const knex = require("../../database/connection")
const { Client } = require('whatsapp-web.js');

// esse parâmetro é o número da pessoa, é passado çá no index
async function execute(people, message) {

    var food = []
    // var drink = []
    let menu = 'Cardápio \n \n'
    // let menuDrink = 'Bebidas \n \n'

    

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
            .join('company', 'company.id', '=', 'food.company_id')
            .select('food.*')
            .where('company.name', nameOfCompany);

        
        // drink = await knex('drink')
        //     .join('company', 'company.id', '=', 'drink.company_id')
        //     .select('drink.*')
        //     .where('company.name', nameOfCompany);


    }

    async function end() {
        await dbConnection().then(() => {
            food.map(e => {
                menu += `${e.id} - ${e.name} -------- R$ ${e.price} \n`;
                console.log(menu)
            })
        })
    }



    await changeStage(5)
    await end();
    // await end1();
    return await `${menu} \n Para adicionar uma comida, Digite o número referente ao item  `;
}

exports.execute = execute;