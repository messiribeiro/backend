const bacndo = require('../banco')


function execute(){

    banco.db['user1'].stage = 1
    
    return (
      'Olá, meu nome é Bolsonaro, sou um assistente virtual. O que gostaria de pedir hj?'
    );
}

exports.execute = execute;