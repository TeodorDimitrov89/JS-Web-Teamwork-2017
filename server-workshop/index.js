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


// const express = require('express')
// const cors = require('cors')
// const bodyParser = require('body-parser')
// const passport = require('passport')
// const localSignupStrategy = require('./passport/local-signup')
// const localLoginStrategy = require('./passport/local-login')
// const authRoutes = require('./routes/auth')
// const petsRoutes = require('./routes/pets')

// const app = express()

// const port = 5000

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
// app.use(passport.initialize())
// app.use(cors())

// passport.use('local-signup', localSignupStrategy)
// passport.use('local-login', localLoginStrategy)

// // routes
// app.use('/auth', authRoutes)
// app.use('/pets', petsRoutes)

// app.listen(port, () => {
//   console.log(`Server running on port ${port}...`)
// })
