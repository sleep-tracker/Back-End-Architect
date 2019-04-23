const db = require('../data/dbConfig')

module.exports = {
    get,
    insert,
    findBy,
    update,
    remove,
    dataInsert,
    dataRemove,
    dataUpdate
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


// for SLEEEP DATA
function dataInsert(data, id) { 
    return db('sleepData')
    // .where(data.user_id === id)
    .insert(data, data.user_id = id)
    .then(ids => ids[0])
}

function dataRemove(id) {
    return db('sleepData')
    .where({id})
    .del()
}

function dataUpdate(id, user){
    return db('sleepData')
    .where({ id })
    .update(user)
}