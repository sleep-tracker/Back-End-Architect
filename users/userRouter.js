const express = require('express')
const router = express.Router()
const jsonWT = require('jsonwebtoken')

const { restricted, generateToken, update } = require('./middleware.js')

const db = require('../data/dbConfig')
const helpers = require('./helper.js')


router.get('/', restricted, (req, res) => {
    // ONLY the user that matches the token is being returned
    const id = req.decodedJWT.subject


    db('users as u')
    .where('u.id', id)
    // .first()
    .then(users => {
        if(!users){
            res.status(404).send('User Doesn\'t Exist!')
        } else {
            db('sleepData')
            .where('sleepData.user_id', id)
            .then(data => {
                res.status(200).json(
                    
                    users.map(user => ({
                        ...user,
                        data
                    })
                    )
                )
            })
        }
        
    })
    .catch(error => res.status(500).json(error))
})

router.put('/', (req, res)=> {
    //GETTING ID from the decoded token
    const token = req.headers.authorization
    req.decodedJWT = jsonWT.decode(token)
    const id = req.decodedJWT.subject
    const body = req.body

    if(!body.email || !body.name || !body.lastName || !body.password ) {
        res.status(403).json({message: "You can't leave the required fields empty!"})
    } else {
        helpers
        .update(id, body)
        .then(updated => {
            res.status(200).json({message: "Your Profile has been sucessfully updated!"})
    })
        .catch(error => res.status(500).json(error))
    }    
})

router.delete('/', (req, res) => {
    const token = req.headers.authorization
    req.decodedJWT = jsonWT.decode(token)
    const id = req.decodedJWT.subject

    helpers
    .remove(id)
    .then(deleted => {
        if(!deleted) {
            res.status(404)
               .json({message: 'Specified User couldn\'t be found!'})
        } else {
            res.json({ message: "User has been Deleted"}).end()
            req.session.destroy(() => res.send('See you soon!'))
        }
        
    })
    
})


// DATA endpoints

router.post('/data/add', (req, res) => {
    const body = req.body
    const token = req.headers.authorization
    req.decodedJWT = jsonWT.decode(token)
    const id = req.decodedJWT.subject

    //Checks if there is "@" present
    helpers
    
    .dataInsert(body, id)
    
    .then(response => {
        res.status(200).json(id)
    })
})

router.delete('/data/delete/:id', (req, res) => {
    
        const id = req.params.id
    
        helpers
        .dataRemove(id)
        .then(deleted => {
            if (!deleted) {
                res
                .status(404)
                .json({message: `Data with the specified ID of ${id} does not exist.`})
            } else {
                res.json({message: 'Item Has Been Deleted.'}).end()
            }
        })
        .catch(error => res.status(500).json(error))
    
})

module.exports = router











/// Fetching only users data

// router.get('/', restricted, (req, res) => {
//     // ONLY the user that matches the token is being returned
//     const id = req.decodedJWT.subject

//     // helpers
//     // .get()
//     // .then(users => {
//     //     if(!users){
//     //         res.status(404).send('User Doesn\'t Exist!')
//     //     } else {
//     //         res.json(users)
//     //     }
        
//     // })
//     // .catch(error => res.status(500).json(error))
    
//     db('users as u')
//     .where('u.id', id)
//     // .first()
//     .then(users => {
//         if(!users){
//             res.status(404).send('User Doesn\'t Exist!')
//         } else {
//             res.json(users)
//         }
        
//     })
//     .catch(error => res.status(500).json(error))
// })