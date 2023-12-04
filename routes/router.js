const express = require("express");
require('dotenv').config({ path: '../.env'});

const {
    signup,
    login
} = require('../controllers/userControler');

const router = express.Router();

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.URL);
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Credentials", "true")
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE, PATCH");
    next();
});

router.post("/submit", signup);
router.post("/verify", login);

module.exports = router;