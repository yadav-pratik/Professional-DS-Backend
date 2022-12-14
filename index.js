const express = require('express')
const cors = require('cors')

const configureDB = require('./config/database')
const router = require('./config/routes')

const app = express()

app.use(express.json())
app.use(cors())
app.use(router)

configureDB()

const port = 3300

app.listen(port , ()=> {
    console.log('server running on port 3300')
})