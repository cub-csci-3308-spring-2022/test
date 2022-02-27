if(process.env.NODE_ENV !== 'production')
{
    require('dotenv').config()
}

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')

const passport = require('passport')

const initializePassport = require('./passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
app.use(methodOverride('_method'))
initializePassport(
    passport, 
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

const users = []

app.set('view-engine', 'ejs')
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(express.urlencoded({extended: false}))

app.use(express.static('src'));
app.use(express.static(__dirname + 'src/css'));
app.use(express.static(__dirname + 'src/js'));
app.use(express.static(__dirname + 'src/imgs'));
app.use(express.static(__dirname + 'src/img'));
app.use(express.static(__dirname + 'src/scss'));
app.get('/', (req, res) => {
    res.render('signup.ejs')
})
app.get('/login.ejs', (req, res) => {
    res.render('login.ejs')
})
app.get('/index.html', checkAuthentication, (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
app.get('/views/signup.ejs', (req, res) => {
    res.render('signup.ejs')
})
app.post('/login.ejs', passport.authenticate('local',{
    successRedirect: '/index.html',
    failureRedirect:'/login.ejs'  ,
    failureFlash: true
}))
app.post('/views/signup.ejs', async(req, res) => {
    try
    {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
    res.redirect('/login.ejs')
    }
    catch
    {
        res.redirect('/views/signup.ejs')
    }
    console.log(users)
})
function checkAuthentication(req,res,next)
{
    if(req.isAuthenticated())
    {
        return next()
    }
    res.redirect('/login.ejs')
}
app.listen(3002)