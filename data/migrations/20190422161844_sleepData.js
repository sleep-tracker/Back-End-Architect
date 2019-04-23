
exports.up = function(knex, Promise) {
    return knex.schema.createTable('sleepData', tbl => {
        tbl.increments()
        tbl.integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        tbl.varchar('sleepDate').notNullable()
        tbl.varchar('wakeDate').notNullable()
        tbl.varchar('sleepTime').notNullable()
        tbl.varchar('wakeTime').notNullable()
        tbl.integer('moodBefore').notNullable()
        tbl.integer('moodAfter').notNullable()
        tbl.integer('moodDuring').notNullable()
    })
  };

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('sleepData');
};
