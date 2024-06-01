const express = require('express')
const dotenv = require('dotenv')
const workoutRoutes = require('./routes/workout')
const userRoutes = require('./routes/user')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
dotenv.config()

//middlewares
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})


//routes
app.use('/api/workouts',workoutRoutes)
app.use('/api/user', userRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    //listen
    app.listen(process.env.PORT, () => {
        console.log(`connected to database and listening on port 3000`)
    })
})
.catch((error) => {
    console.log(error)
})
