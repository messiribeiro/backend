const knex = require('../database/connection');
const crypto = require('crypto');
const { serialize } = require('v8');

module.exports = {
    async create(request, response) {
        const {
            name,
            password,
            email,
            telephone,
            uf,
            city
            
        } = request.body;
        
        const nameVerify = name.split("");
        
        const id = await crypto.randomBytes(16).toString('hex');

        if(nameVerify.length > 20) {
            return response.json({error: 'name is too long'})
        }

        const allemail = await knex('company').where('email', email).select('*')

        if(allemail.length > 0) {
            return response.json({error: 'email is already in use'})
        }

        const trx = await knex.transaction();
        const secret = password;

        const hashPassword = await crypto.createHmac('sha256', secret)
            .update('lxgiwylkjkszpjuzumymwjumpjetyecgaa')
            .digest('hex');

        await trx('company').insert({
            name,
            hashPassword,
            email,
            telephone,
            uf,
            city,
            id
        })

        await trx.commit()
        
        return response.json({ success: true })


    },

    async login(request, response) {
        const { email, password } = request.body

        const secret = password;

        const hashPassword = await crypto.createHmac('sha256', secret)
            .update('lxgiwylkjkszpjuzumymwjumpjetyecgaa')
            .digest('hex');

        const company = await knex('company')
            .where('hashPassword', hashPassword)
            .where('email', email)
            .select('*')
        

        return response.json(company)
    },


    async show(request, response) {

        const AllCompany = await knex('company').select('*')

        return response.json(AllCompany)
    }
}