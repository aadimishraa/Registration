const express = require("express")
const app = express();
const router = require("./routes/router")

app.use(express.static('.'));
app.use(express.json());
app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: false }));

require("dotenv").config({ path: "./config/.env" });
require("./config/connection");

app.get("/", (req, res) => {
    res.render("mainpage");
})

app.get("/signup.hbs", (req, res) => {
    res.render("signup");
})

app.get("/login.hbs", (req, res) => {
    res.render("login");
})

app.post("/submit", router);
app.post("/verify", router);

app.listen(3000, () => {
    console.log(`Server is running`);
})