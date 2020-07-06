//Lista de restaurantes
const knex = require('../../database/connection')
const geo = require('geolib')

async function execute(people, message) {

    var companyName = []
    var company = []
    var response = ''

    // essa é pra ele mudar de arquivo, mas nn sei se essa fu
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

        var companyLocation = await knex('company').select('latitude', 'longitude')
        //Alterando o stage no banco
    }
    async function end() {
        await dbConnection().then(() => {
            companyLocation.forEach((key) => {
                const restaurante = geo.isPointWithinRadius(
                    //Localização do usuário
                    { latitude: -11.6296728, longitude: -46.8210393 },
                    //Localização do restaurante
                    { latitude: key.latitude, longitude: key.longitude },
                    100000
                )
                if (restaurante) {
                    company.push(key)
                }
            })
        })
    }
    end()
    async function eding() {
        await end().then(() => {
            company.map(async key => {
                const [showCompany] = await knex('company')
                    .where('latitude', key.latitude)
                    .where('longitude', key.longitude)
                    .select('name')
                companyName.push(showCompany.name)
                console.log('dentro' + companyName)
            })
        })
    }


    async function mapLocation() {

    }

    await eding()

    async function end() {
        mapLocation().then(() => {
            console.log(`Fora ${companyName}`);
        }).catch(err => console.error(err));

        if (message == '1') {
            changeStage(2)
            response = 'Qual restaurante deseja encontrar?'

        } else if (message == '2') {

            changeStage(3)
            response = `Conseguimos encontrar esses restaurantes próximos de você:\n ${companyName}\n`

        } else {
            return 'algo deu errado'
        }
    }



    await dbConnection();
    await end();

    return await response;
}




exports.execute = execute;