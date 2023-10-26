var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var morgan = require('morgan')
var nocache=require('nocache')
var cookieParser = require('cookie-parser');
var session = require('express-session')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }))
router.use(morgan('tiny'))
const app=express()

app.use(nocache())
/* GET home page. */
// router.use(cookieParser());
router.use(session({
  secret: 'secret key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 600000 }
}))

router.get('/', function (req, res) {
  let user = req.session.user;
  console.log(user);
  if (user) { // Check if email is stored in the session
    res.render('main', { content: user.email })
  } else {
    res.redirect('/login');
  }
});
// else{
//   res.redirect('./error')
//   console.log('home enter');
// }
router.get('/login', function (req, res) {
  if(req.session.user){
    res.redirect('/')
  }
  else{
    // res.render('login');
    res.render('login')
  }
});
router.get('/home', function (req, res) {


  res.render('main');
});
// router.get('/home', function (req, res) {
//   const email = req.session.email; // Retrieve the email from the session
//   if (email) {
//     res.render('main', { content: email });
//   }
//   else {
//     res.redirect('/'); // Redirect to login if no email found in session
//   }
//   // res.render('main',{ content: req.body.email })
// });

// const user = {
//   email: "shanu@gmail.com",
//   password: "pass"
// };

router.post('/check', (req, res) => {
  const user = {
    email: "shanu@gmail.com",
    password: "pass"
  }
  if (req.body.email === user.email && req.body.password === user.password) {

    req.session.user = user; // Save the email in the session
    // res.cookie('loggedIn', 'true', { maxAge: 900000, httpOnly: true }); // Optionally, set a cookie
    // res.render('/home',)
    res.redirect('/')
  } else {
    // res.render('login')
    res.redirect('/error')
    res.send("unathorised user")
  }
});


router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/login')
})
// router.get('/logout', (req, res) => {
//   req.session.destroy((err) => {
//     if(err) {
//       return console.log(err);
//     }
//     res.clearCookie('loggedIn'); // Clear the 'loggedIn' cookie
//     res.redirect('/login');
//   });
// });




module.exports = router;
