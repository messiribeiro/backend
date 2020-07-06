
exports.up = function(knex) {
  return knex.schema.createTable('food', table => {
      table.increments()
      table.string('name').notNullable();
      table.string('description').notNullable();
      table.decimal('price').notNullable();
      table.string('image');
      table.string('company_id').notNullable();

  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('food');
};
