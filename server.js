const express = require('express') // What we use to build out the API - CRUD functionality.
const app = express()
const mongoose = require('mongoose') // Mongoose enables us to interact with our database. Models - schema, etc. 
const passport = require('passport') // Passport is the package which handles our authentication. Passport has strategies for enabling people to sign in. 
const session = require('express-session') 
const MongoStore = require('connect-mongo')(session) // require('express-session') and  require('connect-mongo')(session) are used to store our session information in our database. We use sessions to keep track of our users. 
const flash = require('express-flash') // This enables us to use flash messages. 
const logger = require('morgan') // This is used to log our requests. 
const connectDB = require('./config/database') // This is used to connect our database. 
const mainRoutes = require('./routes/main') // This is used to handle our main routes. 
const todoRoutes = require('./routes/todos') // This is used to handle our todo routes. 

require('dotenv').config({path: './config/.env'}) // Here, we are requiring .env from config folder. 

// Passport config
require('./config/passport')(passport) // Passport is found in our config folder

connectDB() // This is used to connect our database.

app.set('view engine', 'ejs') // This is used to set our view engine to ejs.
app.use(express.static('public')) // This is used to set our public folder, so that any static files in this folder are served up. 
app.use(express.urlencoded({ extended: true })) // This is used to parse our form data.
app.use(express.json()) // This is used to parse our JSON data.
app.use(logger('dev')) // This is used to log our requests.
// Sessions
app.use(
    session({ // This is used to store our session information in our database.
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    }) // cookie stored as part of the session so if someone leaves the app, closes the page, and comes back, they don't have to login again.
  )
  
// Passport middleware
app.use(passport.initialize()) // This is used to initialize our passport
app.use(passport.session()) // This is used to store our session information in our database. 

app.use(flash()) // This is used to use flash messages. E.g. If we put the wrong password in, a flash message comes up saying you have put in an invalid password. 
  
app.use('/', mainRoutes) // This is used to handle our main routes.
app.use('/todos', todoRoutes) // This is used to handle our todo routes.
 
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    // This is used to listen for requests on the port. 



// app.get('/', (req, res)=>{
//     res.render('index', {user: req.user})
// }