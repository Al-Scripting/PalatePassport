let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
var router = express.Router();

let app = express();
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');

// create a user model instance
let userModel = require('../models/user');
let User = userModel.User;
// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

let mongoose = require('mongoose');
let mongoDB = mongoose.connection;
let DB = require('./db');
//mongoose.connect('mongodb://127.0.0.1:27017/students');
mongoose.connect(DB.URI);
mongoDB.on('error',console.error.bind(console,'Connection Error'));
mongoDB.once('open',()=>{console.log("Mongo DB is connected")});
//mongoose.connect(DB.URI);
// Set-up Express-Session
app.use(session({
  secret:"SomeSecret",
  saveUninitialized:false,
  resave:false
}));
// initialize flash-connect
app.use(flash());
// implement a user authentication
passport.use(User.createStrategy());
// Serialize and Deserialize user information
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// initialize the passport
app.use(passport.initialize());
app.use(passport.session());

let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let RecipesRouter = require('../routes/Info_recipe');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/recipelist', RecipesRouter);




/*GOOGLE AUTH*/
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
      clientID: '317265795336-ehkoptf42d8tbne17n5k6l6gbkv6gcq4.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'https://plate-passport.onrender.com/auth/google/callback'
    },
    async function(accessToken, refreshToken, profile, done) {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          // User not found, create a new user
          user = new User({
            googleId: profile.id,
            username: profile.username || profile.displayName, // Adjust according to available data
            displayName: profile.displayName,
            email: profile.emails[0].value, // Assuming the email is available
          });
          await user.save();
        }
        done(null, user);
      } catch (err) {
        done(err);
      }
    }
));

const GitHubStrategy = require('passport-github2').Strategy;

passport.use(new GitHubStrategy({
        clientID: '85f290dfe49bc416e4c1',
        clientSecret: 'dfd89cd47a00d1e38cd7b9293856524e8314f5b9',
        callbackURL: 'https://plate-passport.onrender.com/auth/github/callback'
    },
    async function(accessToken, refreshToken, profile, done) {
        try {
            let user = await User.findOne({ githubId: profile.id });
            if (!user) {
                // User not found, create a new user
                user = new User({
                    githubId: profile.id,
                    username: profile.username,
                    displayName: profile.displayName,
                    email: profile.emails?.[0]?.value || 'No email provided' // Use optional chaining
                });
                await user.save();
            }
            done(null, user);
        } catch (err) {
            done(err);
        }
    }
));


/*Discord Auth*/
const DiscordStrategy = require('passport-discord').Strategy;

passport.use(new DiscordStrategy({
        clientID: '1182472250952261682',
        clientSecret: 'Q6c735J4l-FkuOLYyRMmOgmqJK5On6_C',
        callbackURL: 'https://plate-passport.onrender.com/auth/discord/callback',
        scope: ['identify', 'email'] // Adjust scope according to your needs
    },
    async function(accessToken, refreshToken, profile, done) {
        try {
            let user = await User.findOne({ discordId: profile.id });
            if (!user) {
                // User not found, create a new user
                user = new User({
                    discordId: profile.id,
                    username: profile.username, // Discord username
                    displayName: profile.username, // Discord display name
                    email: profile.emails?.[0]?.value || 'No email provided' // Email, if available
                });
                await user.save();
            }
            done(null, user);
        } catch (err) {
            done(err);
        }
    }
));




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{title:'Error'});
});

module.exports = app;
