
exports.up = function(knex) {
    return knex.schema.createTable('drink', function (table) {
        table.increments()
        table.string('name').notNullable();
        table.string('price').notNullable();
        table.string('image');
        table.string('company_id').notNullable()
        
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('drink');
};