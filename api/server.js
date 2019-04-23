const express = require('express')
const server = express()
const helmet = require('helmet')
const cors = require('cors')


const authRouter = require('../users/authRouter.js')
const userRouter = require('../users/userRouter.js')


server.use(express.json())
server.use(helmet())
server.use(cors())

server.get('/', (req, res) => {
    res.send(
        `<h1>Welcome to our Sleep Tracking App!</h1>`
    )
})

// server.use('/api/users')

server.use('/api/auth', authRouter)
server.use('/api/users', userRouter)


module.exports = server