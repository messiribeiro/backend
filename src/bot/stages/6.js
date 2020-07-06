const knex = require("../../database/connection")

// esse parâmetro é o número da pessoa, é passado çá no index
async function execute(people, message) {

    
    
    let menu = 'Bebidas \n \n'
    

    

    async function changeStage(numberOfstage) {


        await knex('userZap')
            .where('user', people)
            .update({
                stage: numberOfstage
            })
    }


    if(message == 'BEBIDAS') {
        changeStage(7)
    }else if(message)




    
    
    return `${menu} \n Para adicionar uma bebida, Digite o número referente ao item \n Caso queira voltar para as comidas, digite  '*' `;
}

exports.execute = execute;