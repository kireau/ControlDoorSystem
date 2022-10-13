require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3667 
const doorsRouter = require('./db/router/doors.router')
const usersRouter = require('./db/router/users.router')
const hwRouter = require('./db/router/hw.router')

app.use(cors())
app.use(express.json())
app.use('/api/door', doorsRouter)
app.use('/api/user', usersRouter)
app.use('/api/hw', hwRouter) //запросы от дверей

const start = async () => {
    try {
        app.listen(PORT, () => 
            console.log(`Сервер запущен и достпен: http://localhost:${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()