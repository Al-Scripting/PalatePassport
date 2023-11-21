var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', {
    title: 'Home'
  });
});

router.get('/about', function(req, res, next) {
  res.render('about', {
    title: 'About Us'
  });
});

router.get('/contact', function(req, res, next) {
  res.render('contact.ejs', {
    title: 'Contact Us'
  });
});



module.exports = router;

