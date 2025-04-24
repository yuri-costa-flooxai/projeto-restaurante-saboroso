var express = require('express');
var conn = require('../inc/db');
var router = express.Router();
var menus = require('../inc/menus');
var reservations = require('../inc/reservations');
var contacts = require('../inc/contacts');
/* GET home page. */
router.get('/', function(req, res, next) {

  menus.getMenus().then(results => {
    res.render('index', { 
      title: 'Restaurante Saboroso', 
      menus: results 
    });
  })  
});

router.get('/contact', function(req, res, next) {
  contacts.render(req, res);
});

router.post('/contact', function(req, res, next) {

  if (!req.body.name) {
    contacts.render(req, res, "Digite o nome");
  } else if (!req.body.email) {
    contacts.render(req, res, "Digite o email");
  } else if (!req.body.message) {
    contacts.render(req, res, "Digite a mensagem");
  } else {
    contacts.save(req.body).then(results => {
      req.body = {}
      contacts.render(req, res, null, "Mensagem enviada com sucesso");

    }).catch(err => {

      contacts.render(req, res, err.message, null);
    });
  }
});

router.get('/menus', function(req, res, next) {
  menus.getMenus().then(results => {
    res.render('menu', {
      title: 'Menu - Restaurante Saboroso',
      background: 'images/img_bg_1.jpg',
      h1: 'Saboreie Nosso Menu',
      menus: results
  });
});

router.get('/reservations', function(req, res, next) {
  reservations.render(req, res);
});

router.post('/reservations', function(req, res, next) {

  if (!req.body.name) {
    reservations.render(req, res, "Digite o nome");
  } else if (!req.body.email) {
    reservations.render(req, res, "Digite o email");
  } else if (!req.body.people) {
    reservations.render(req, res, "Digite o número de pessoas");
  } else if (!req.body.date) {
    reservations.render(req, res, "Digite a data");
  } else if (!req.body.time) {
    reservations.render(req, res, "Digite a hora");
  } else {

    reservations.save(req.body).then(results => {

      req.body = {}

      reservations.render(req, res, null, 'Reserva realizada com sucesso');

      res.redirect('/reservations');

    }).catch(err => {

      reservations.render(req, res, err, null);
    });
  }
  
  reservations.save(req.body).then(results => {
    reservations.render(req, res, null, "Reserva realizada com sucesso");
  }).catch(err => {
    reservations.render(req, res, err, null);
  });
});

router.get('/services', function(req, res, next) {
  res.render('services', {
    title: 'Serviços - Restaurante Saboroso',
    background: 'images/img_bg_1.jpg',
    h1: 'Nossos Serviços'
  });
});


module.exports = router;
