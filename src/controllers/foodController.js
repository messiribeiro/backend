const knex = require('../database/connection');


module.exports = {
    async create(request, response){
        const foodInfo = {
            name,
            stuff,
            price,
            description

        } = request.body

        const company_id = request.headers.authorization

        const [id] = await knex('food').insert({
            name,
            price,
            description,
            company_id
        })



        const food = await knex('food').where('company_id', company_id).where('id', id).select('*')
        
        //olha a coca latão, olha a coca latão
        
        return response.json({food})
    },

    async show(request, response) {
        const food = await knex('food').select('*')

        if(food.length == 0) return response.json({msg:'nothing'})

        return response.json(food)
    },

    async delete(request, response) {
        const company_id = request.headers.authorization

        const {id} = request.params
        
        const food = await knex('food').where('id', id).where('company_id', company_id).select('*')

        if(food.length == 0) {
            return response.json({error: 'item not found'})
        }
        
        await knex('food').where('id', id).where('company_id', company_id).delete()

        return response.json({msg: 'deleted item'})
    }
}