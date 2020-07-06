const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const knex = require("../database/connection")

// const watson = require('./watsonIA/watson')


const stages = require('./stages.js');




const client = new Client();


client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});



async function deleted() {
    await knex('userZap').delete()
    await knex('demand').delete()
}


deleted()

// NÃO MEXA NO CÓDIGO A SEGUIR.
client.on('message', message => {


    async function send() {
        
       
        

        const people = await knex('userZap')
            .where('user', message.from)
            .select('*')

        

        const stage = 0

        const user = message.from

        if(people.length == 0) {

           await knex('userZap').insert({
                user,
                stage
            })
            
        }

        

        const [userData] = await knex('userZap')
                .where('user', user)
                .select('*')

        
        console.log(userData)
        
       
        stages[userData.stage].obj.execute(user, message.body)
        .then((response) => {
            client.sendMessage(message.from, response);
        })
        
    }

    send()


}
);

// // pode mexer daqui pra baixo

// getKeywords('Eu vou querer um bacon mal passado')


client.initialize();