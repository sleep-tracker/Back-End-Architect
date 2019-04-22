const db = require('../data/dbConfig')

module.exports = {
    get,
    insert,
    findBy,
    update,
    remove
}


function get() {
    return db('users')
}


function insert(user) {
    return db('users')
    .insert(user)
    .then(ids => ids[0])
}

function findBy(credentials) {
    return db('users')
    .where(credentials)
    // .first()
}

function update(id, user){
    return db('users')
    .where({ id })
    .update(user)
}

function remove(id) {
    return db('users')
    .where({id})
    .del()
}