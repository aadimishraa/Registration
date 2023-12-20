const express = require("express")
const app = express();
const router = require("./routes/router")
const session = require("express-session")

app.use(express.static('.'));
app.use(express.json());
app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
}));

app.use((req, res, next) => {
  // Set no-cache headers
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Pragma', 'no-cache');
    res.header('Expires', '-1');
    next();
});

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

app.get("/homepage.hbs", (req, res) => {
    res.render("homepage");
})

const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    } else {
        res.redirect('/login.hbs');
        return;
    }
};

app.get("/logout", isAuthenticated, (req, res) => {
    req.session.destroy(err => {
    if (err) {
        console.error('Error destroying session:', err);
        res.status(500).send('Internal Server Error');
    } else {

        res.redirect('/login.hbs'); // Redirect to login page after successful logout
    }
    });
})

app.listen(3000, () => {
    console.log(`Server is running`);
})