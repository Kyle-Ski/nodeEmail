
exports.up = function(knex, Promise) {
    return knex.schema.createTable('review', function (table) {
        table.increments()
        table.string('name')
        table.string('description', 505)
        table.string('subject')
        table.integer('rating')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('review')
};
