const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const { generateToken } = require('./middleware.js')


const db = require('./helper.js')

// REGISTER endpoint
router.post('/register', (req, res) => {
    let user = req.body
    const hash = bcrypt.hashSync(user.password, 4)
    user.password = hash

    //Checks if there is "@" present
    if(!user.email.includes('@')){
        res.status(403).send("Please make sure you entered correct e-mail address")
    } else {
        db
        .insert(user)
        .then(registered => res.status(201).json(registered))
        .catch(error => res.status(500).json(error))
    }
    
})

//LOGIN endpoint, Hashes password and returns the token
router.post('/login', (req, res) => {
    let { email, password } = req.body

    db
    .findBy({ email })
    .first()
    .then(user => {
        // req.session.user = user
        if(user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user)
            res.status(200).json({message: `Logged In! Your ID is ${user.id}`, token})
        } else {
            res.status(401).json({ message: "Please Provide Correct Credentials"})
        }
    })
    .catch(error => res.status(500).json(error))
})

//LOGOUT endpoint
router.get('/logout', (req, res) => {
    if(req.session) {
        req.session.destroy(error => {
            if(error) {
                res.status(500).json({ message: "You shall not Leave!"})
            } else {
                res.send('See you soon!')
            }
        })
    }
})



module.exports = router