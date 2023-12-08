var express = require('express');
var router = express.Router();
const passport = require('passport');
let DB = require('../config/db');
let userModel = require('../models/user');
let User = userModel.User;

// Route to start authentication
router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback route
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
    });

/*Git Auth*/
router.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
    });

router.get('/auth/github',
    passport.authenticate('github', { scope: ['user:email'] }));


/*Discord Auth*/

router.get('/auth/discord',
    passport.authenticate('discord'));

router.get('/auth/discord/callback',
    passport.authenticate('discord', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });



router.get('/login',function(req,res,next){
  if(!req.user)
  {
    res.render('auth/login',
        {
          title:'Login',
          message: req.flash('loginMessage'),
          displayName: req.user ? req.user.displayName:''
        })
  }
  else{
    return res.redirect('/home')
  }
})

router.post('/login',function(req,res,next){
  passport.authenticate('local',function(err,User,info){
    // server error
    if(err)
    {
      return next(err);
    }
    // login error
    if(!User)
    {
      req.flash('loginMessage',
          'AuthenticationError');
      return res.redirect('/login')
    }
    req.login(User,(err)=>{
      if(err)
      {
        return next(err)
      }
      return res.redirect('/recipelist');
    })
  })(req,res,next)
})

router.get('/register',function(req,res,next){
  if(!req.user)
  {
    res.render('auth/register',
        {
          title:'Register',
          message: req.flash('registerMessage'),
          displayName: req.user ? req.user.displayName: ''
        })
  }
  else{
    return res.redirect('/home')
  }
})

router.post('/register', function(req,res,next){
  let newUser = new User({
    username: req.body.username,
    // password: req.body.password,
    email: req.body.email,
    displayName: req.body.displayName
  })
  User.register(newUser, req.body.password,(err) => {
    if(err)
    {
      console.log("Error in inserting new User");
      if(err.name =='UserExistError')
      {
        req.flash('registerMessage',
            'Registration Error : User already Exist'
        )}
      return res.render('auth/register',
          {
            title:'Register',
            message: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName:''
          })
    }
    else{
      return passport.authenticate('local')(req,res,()=>{
        res.redirect('/recipelist');
      })
    }
  })
})

router.get('/logout',function(req,res,next){
  req.logout(function(err){
    if(err)
    {
      return next(err);
    }
  })
  res.redirect('/home')
})



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', {
    title: 'Home',
    displayName: req.user ? req.user.displayName : ''
  });
});

router.get('/about', function(req, res, next) {
  res.render('about', {
    title: 'About Us',
    displayName: req.user ? req.user.displayName : ''
  });
});

router.get('/contact', function(req, res, next) {
  res.render('contact.ejs', {
    title: 'Contact Us',
    displayName: req.user ? req.user.displayName : ''
  });
});




module.exports = router;

