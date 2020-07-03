const knex = require('../database/connection');
const crypto = require('crypto');
const { serialize } = require('v8');

module.exports = {
    async create(request, response) {

        const drinkInfo = {
            name,
            price
        } = request.body

        const company_id = request.headers.authorization




        const [id] = await knex('drink').insert({
            name,
            price,
            company_id
        })

        const drink = await knex('drink').where('company_id', company_id).where('id', id).select('*')
        
        //olha a coca latão, olha a coca latão
        
        return response.json(drink)
    },

    async show(request, response) {
        const items = await knex('drink').select('*')

        return response.json(items)
    },

    async delete(request, response) {
        const company_id = request.headers.authorization

        const {id} = request.params
        
        const drink = await knex('drink').where('id', id).where('company_id', company_id).select('*')

        if(drink.length == 0) {
            return response.json({error: 'item not found'})
        }
        
        await knex('drink').where('id', id).where('company_id', company_id).delete()

        return response.json({msg: 'deleted item'})
    }
}