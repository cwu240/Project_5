const express = require('express');
const res = require('express/lib/response');
const controller = require('../controllers/mainController')

const router = express.Router();
//Get Home
router.get('/', controller.home);

//GET About
router.get('/about', controller.about);

//GET Contact
router.get('/contact', controller.contact);

module.exports = router;