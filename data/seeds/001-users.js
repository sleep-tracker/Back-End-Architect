
exports.seed = function(knex, Promise) {
    return knex('users').del().then(function(){
      return knex('users').insert([
        {
          email: 'blah@gmail.com',
          name: 'Brooks',
          lastName: 'Poltl',
          password: 'pass',
        },
        {
          email: 'blahblah@gmail.com',
          name: 'Elan',
          lastName: 'Riznis',
          password: 'pass',
          age: '23'
        }
      ]);
    })
};
