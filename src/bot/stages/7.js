const knex = require("../../database/connection")

// esse parâmetro é o número da pessoa, é passado çá no index
async function execute(people, message) {

    
    var drink = []
    let menu = 'Bebidas \n \n'
    

    

    async function changeStage(numberOfstage) {


        await knex('userZap')
            .where('user', people)
            .update({
                stage: numberOfstage
            })
    }

    async function dbConnection() {

        const nameOfCompany = await knex('demand').where('clientName', people).select('nameOfCompany')

        
        drink = await knex('drink')
            .join('company', 'company.id', '=', 'drink.company_id')
            .select('drink.*')
            .where('company.name', nameOfCompany);


    }



    async function end1() {
        await dbConnection().then(() => {
            
            drink.map(e => {
                menuDrink += `${e.id} - ${e.name} -------- R$ ${e.price} \n`;
                console.log(menu)
            })

        })
    }



    await changeStage(5)
    await end1();
    
    return `${menu} \n Para adicionar uma bebida, Digite o número referente ao item \n Caso queira voltar para as comidas, digite  '*' `;
}

exports.execute = execute;