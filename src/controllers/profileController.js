const knex = require('../database/connection');


module.exports = {
    async index(request, response) {

        const company_id = request.headers.authorization

        const drink = await knex('drink').where('company_id', company_id).select('*')
        const food = await knex('food').where('company_id', company_id).select('*')

        return response.json({
            "drinks": drink,
            "foods": food
        })

    }
}