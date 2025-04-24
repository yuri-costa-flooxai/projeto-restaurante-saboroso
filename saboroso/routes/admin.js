var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

    res.render('admin/index', {
        title: 'Admin - Restaurante Saboroso'
    });
});

router.get('/login', function(req, res, next) {

    if (!req.session.views) req.session.views = 0;
    
    console.log("SESSION: " + req.session.views++);

    res.render('admin/login', {
    });
});

router.get('/emails', function(req, res, next) {
    res.render('admin/emails', {
    });
});

router.get('/menus', function(req, res, next) {
    res.render('admin/menus', {
    });
});

router.get('/reservations', function(req, res, next) {
    res.render('admin/reservations', {
        date: {}
    });
});

router.get('/contacts', function(req, res, next) {
    res.render('admin/contacts', {
    });
});




module.exports = router;