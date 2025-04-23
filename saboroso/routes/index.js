var express = require('express');
var conn = require('../inc/db');
var router = express.Router();
var menus = require('../inc/menus');

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
  res.render('contact', {
    title: 'Contato - Restaurante Saboroso',
    background: 'images/img_bg_3.jpg',
    h1: 'Entre em Contato'
  });
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
  res.render('reservations', {
    title: 'Reservas - Restaurante Saboroso',
    background: 'images/img_bg_2.jpg',
    h1: 'Faça sua reserva'
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
