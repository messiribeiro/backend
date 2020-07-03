
exports.up = function(knex) {
    return knex.schema.createTable('company', table => {
        table.string('id').notNullable()
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('hashPassword').notNullable();
        table.string('uf').notNullable();
        table.string('city').notNullable();
        table.string('telephone').notNullable();
    });
}


exports.down = function(knex) {
    return knex.schema.dropTable('company');
};
