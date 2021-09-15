if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const nodemailer = require('nodemailer')
const fs = require('fs')
const ejs = require('ejs')
global.succeed=''
// const hbs=require('nodemailer-express-handlebars')
// const sendMail=require('./mail')


const initializePassport = require('./passport-config')
const e = require('express')
initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

const users = []

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

//Static Files
    app.use(express.static('public'))
    app.use('/css', express.static(__dirname + 'public/css'))
    app.use('/js', express.static(__dirname + 'public/js'))
    app.use('/img', express.static(__dirname + 'public/img'))


app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: req.user.name })
})

app.get('/kaniflix', checkAuthenticated, (req, res) => {
    res.render('Kaniflix.ejs', { name: req.user.name })
})

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs', { succeed: global.succeed})
    global.succeed=''
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/kaniflix',
    failureRedirect: '/login',
    failureFlash: true
}))


app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        global.otp= Math.floor(Math.random()*90000) + 10000;
        const email=req.body.email;
        global.sendId=email;
        const name=req.body.name;
        global.sendName=name;
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
    })
    // res.redirect('/login')
    global.success='Success: Email Sent'

    res.redirect('/verify')

    
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    
    // transporter.use('compile', hbs({
    //     viewEngine:'express-handlebars',
    //     viewPath: './views/'
    // }));

    const data = await ejs.renderFile(__dirname + "/views/temp.ejs", { name: name, otp: global.otp });
    let mailOptions={
        from: '"Kaniflix" <noreply.kaniflix@gmail.com>',
        to:email,
        subject:'Verification Code',
        html: data
        // text:`Your verification code is ${otp}`,
        // template: 'temp'
    };
    
    
    transporter.sendMail(mailOptions, function(err, data){
        if(err){
            console.log('Error Occured', err)
        }else{
            console.log('Email Sent Successfully')
        }
    })


    } catch {
    res.redirect('/register')
    }
})


app.get('/verify', checkNotAuthenticated, (req, res) => {
    res.render('verify.ejs', {error: global.otperror, success: global.success})
    global.otperror='';
    global.success='';
})

app.post('/verify', checkNotAuthenticated, (req, res) =>{
    const code=req.body.code;
    console.log(otp)
    if(parseInt(code)!==parseInt(otp)){
        global.otperror='Invalid OTP!!';
        res.redirect('/verify')
        console.log('Incorrect OTP!!')
    }else{
        global.succeed='Success : Sign Up Successfully !'
        res.redirect('/login')
        console.log('Verified')
    }
    
})


app.get('/resend', async(req,res)=>{

    global.success='Success : Email Resent'

    res.redirect('/verify')
    
    global.otp= Math.floor(Math.random()*90000) + 10000;
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    
    // transporter.use('compile', hbs({
    //     viewEngine:'express-handlebars',
    //     viewPath: './views/'
    // }));


    const data = await ejs.renderFile(__dirname + "/views/temp.ejs", { name: global.sendName, otp: global.otp });
    let mailOptions={
        from: '"Kaniflix" <noreply.kaniflix@gmail.com>',
        to:global.sendId,
        subject:'Verification Code',
        html: data
        // text:`Your verification code is ${otp}`,
        // template: 'temp'
    };
    
    
    transporter.sendMail(mailOptions, function(err, data){
        if(err){
            console.log('Error Occured', err)
        }else{
            console.log('Email Sent Successfully')
        }
    })


})


app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
    return next()
    }

    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
    return res.redirect('/')
    }
    next()
}



app.listen(3000)