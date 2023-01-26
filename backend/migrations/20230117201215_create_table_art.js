/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {   
    return knex.schema.createTable('art', table => {
        table.increments('id'),
        table.integer('authorId').references('id').inTable('users')
        table.string('pixels', 27000)
        table.integer('proportion')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('art')
};
