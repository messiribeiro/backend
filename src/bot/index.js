const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const knex = require("../database/connection")

// const watson = require('./watsonIA/watson')

const banco = require('./banco')
const stages = require('./stages.js')



// exports.db = banco
const client = new Client();


client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
});

console.log(banco.db['user1'].stage)

client.on('message', message => {
    console.log(message);
    if (message.body === 'Bolsonaro'){
        let resp = stages.step[getStage(message.from)].obj.execute()
        for (let index = 0; index < resp.length; index++) {
            var element = resp[index];
            client.sendMessage(message.from, element)
        }
    }
});

function getStage(user) {
    return banco.db[user].stage
}

client.initialize();