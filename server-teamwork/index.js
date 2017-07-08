let env = process.env.NODE_ENV || 'development'
const settings = require('./config/settings')[env]
const database = require('./config/database')
const expressCurrentApp = require('./config/express')
const express = require('express')
const passport = require('./config/passport')
let app = express()

database(settings)
expressCurrentApp(app, settings)
passport()
app.listen(settings.port)
console.log(`Server is listening on port ${settings.port}`)
