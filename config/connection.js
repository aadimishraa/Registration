const mongoose = require('mongoose');

require("dotenv").config({path:"./.env"});

const _DBUrl = process.env.DB;
mongoose.connect(_DBUrl, {})
    .then(() => console.log("Connection Successful"))
    .catch((err) => console.log(`Connection failed ! Error : ${err}`
));
