
exports.up = function(knex) {
    return knex.schema.createTable('userZap', function (table) {
        table.increments()
        table.string('stage').notNullable()
        table.string('user').notNullable()

    })
},

exports.down = function(knex) {
    return knex.schema.dropTable('userZap');
    
};