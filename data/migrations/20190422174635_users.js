exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments()
        tbl.varchar('email', 200).notNullable().unique()
        tbl.string('name', 100).notNullable()
        tbl.string('lastName', 100).notNullable()
        tbl.varchar('password', 200).notNullable()
        tbl.integer('age')
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTableIfExists('users');
  };

