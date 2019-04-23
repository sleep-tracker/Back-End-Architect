
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
      // Inserts seed entries
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
   
};
