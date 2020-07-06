
exports.up = function(knex) {
    return knex.schema.createTable('company', table => {
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('hashPassword').notNullable();
        table.string('uf').notNullable();
        table.string('city').notNullable();
        table.string('telephone').notNullable();
        table.integer('latitude').notNullable();
        table.integer('longitude').notNullable();
    });
}


exports.down = function(knex) {
    return knex.schema.dropTable('company');
};
