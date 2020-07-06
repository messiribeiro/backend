/*Esse é o arquivo de stage, ele vai dizer qual arquivo tem que executar dependendo do stage do usuário no banco
Vamos ver o zero. Se for zero ele vai executar esse arquivo aí. O próximo arquivo tem o print dele
*/


var stages = {
    0: {
        description: 'Início',
        obj: require('./stages/0')
    },
    1: {
        description: 'decisao',
        obj: require('./stages/1')
    },

    // Escolha do restaurante pela pessoas

    2: {
        description: 'Usuário esocolhe',
        obj: require('./stages/2')
    },

    3: {
        description: 'Usuário esocolhe',
        obj: require('./stages/3')
    },
    4: {
        description: 'Usuário esocolhe',
        obj: require('./stages/4')
    },
    5: {
        description: 'Usuário esocolhe',
        obj: require('./stages/5')
    },
    6: {
        description: 'Usuário esocolhe',
        obj: require('./stages/6')
    },
    7: {
        description: 'Usuário esocolhe',
        obj: require('./stages/7')
    },

    // 3: {
    //     description: 'Usuário esocolhe',
    //     obj: require('./stages/1_companyList/showCompany')
    // }

}

module.exports = stages;