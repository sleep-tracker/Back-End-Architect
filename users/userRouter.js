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


router.get('/chart/data', restricted, (req, res) => {
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
                if (data.length === 4) {
                    res.status(200).json(data)
                } else {
                    const array = []
                    for( i = data.length - 1; i >=0 ; i--){
                        D1 = data[2] 
                       array.push(D1)
                     }
                     res.status(200).json(array)
                }
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
                .json({message: `Data Entry with the specified ID of ${id} does not exist.`})
            } else {
                res.json({message: 'Item Has Been Deleted.'}).end()
            }
        })
        .catch(error => res.status(500).json(error))
    
})


router.patch('/data/edit/:id', (req, res) => {
    const id = req.params.id
    const body = req.body

        helpers
        .dataUpdate(id, body)
        .then(updated => {
            if (!updated) {
                res
                .status(404)
                .json({message: `Data Entry with a specified ID of ${id} does not exist!`})
            } else {
                res
                .status(200)
                .json({message: `Success! You updated ${updated} item(s)`})
            }  
        })
        .catch(error => res.status(500).json(error))
    
    
})


router.get('/average', restricted, async (req, res) => {
    const id = req.decodedJWT.subject
    const sleepData = await db('sleepData')
    .where({user_id: id})
    // console.log(sleepData)

    // if(sleepData.length <= 30) {
    //     return res.status(200).json({message: "You need 30 or more days to determine your sleep"})
    // }

    const array = []
    const averageArray = []

    for ( i = 0; i < 24; i++ ) {
        averageArray.push({
            hours: i,
            count: 0,
            avg: 0
        })
    }
    // console.log(averageArray)

    for (i = 0; i < sleepData.length; i++) {
        obj = {}
        response = sleepData[i]
        average = (response.moodBefore + response.moodAfter + response.moodDuring) / 3
        average = Math.round(average * 100) / 100
        obj.average = average
        array.push(obj)

        obj1 = {
            hours: null,
            minutes: null,
            time: null
        }

        obj2 = {
            hours: null,
            minutes: null,
            time: null
        }

        hours1 = response.sleepTime[0] + response.sleepTime[1]
        hours2 = response.wakeTime[0] + response.wakeTime[1]

        obj1.hours = Number(hours1)
        obj2.hours = Number(hours2)

        minutes1 = response.sleepTime[3] + response.sleepTime[4]
        minutes2 = response.wakeTime[3] + response.sleepTime[4]

        obj1.minutes = Number(minutes1)
        obj2.minutes = Number(minutes2)

        

        time1 = response.sleepTime[6] + response.sleepTime[7]
        time2 = response.wakeTime[6] + response.sleepTime[7]

        obj1.time = time1
        obj2.time = time2

       

        if(obj1.time === "pm") {
            obj1.hours = Number(obj1.hours) + 12
        } else if (obj2.time === "pm") {
            obj2.hours = Number(obj2.hours) + 12
        }

        let total = null
        if(obj1.time === 'pm') {
           remainder =  24 - obj1.hours - (obj1.minutes / 60)
           rest = obj2.hours + (obj2.minutes / 60)

           total = remainder + rest
        } else if (obj1.time === 'am') {
            wakeUp = obj2.hours + (obj2.minutes / 60)
            sleepTime = obj1.hours + (obj1.minutes / 60)

            total = wakeUp - sleepTime
        }
        total = Math.round(total)
        for (j = 0; j < averageArray.length; j++) {
            index = averageArray[j]
            if(total === index.hours) {
                totalRating = index.avg * index.count
                totalRating = totalRating + average
                index.count = index.count + 1
                index.avg = totalRating / index.count
            }
        }
        obj.sleepLength = total

        
    }

    bestObj = averageArray[0]
    for (j = 0; j < averageArray.length; j++) {
        index = averageArray[j]
        if(bestObj.avg <= index.avg) {
           bestObj.hours = index.hours
           bestObj.count = index.count
           bestObj.avg = index.avg
           
        }
    }

    res.status(200).json({bestSleep: bestObj.hours})
    // console.log(averageArray)
    // console.log(array)
    // moodBefore + moodAfter + moodDuring === 4
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