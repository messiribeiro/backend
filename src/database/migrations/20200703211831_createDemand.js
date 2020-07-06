
exports.up = function(knex) {
    return knex.schema.createTable('demand', function (table) {
        table.increments()
        table.string('clientName')
        table.string('priceOfDemand')
        table.string('longitude')
        table.string('latitude')
        table.string('content')
        table.string('nameOfCompany')

    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('demand');
    
};
