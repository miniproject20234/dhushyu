//index.js file

const express = require("express");
const bodyParser = require('body-parser');

const path = require("path");
const collection = require("./config");
const bcrypt = require('bcrypt');

var mongoose = require("mongoose");


const app = express();
app.use(bodyParser.json());
// convert data into json format
app.use(express.json());
// Static file
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
//use EJS as the view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("login");
});


app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.get("/votepage", (req, res) => {
    res.render("votepage");
});



// Register User
app.post("/signup", async (req, res) => {

    const data = {
        name: req.body.username,
        password: req.body.password,

        dept:req.body.dept,
        year: req.body.year
        
    }

    // Check if the username already exists in the database
    const existingUser = await collection.findOne({ name: data.name });

    if (existingUser) {
        res.send("<script>alert('User already exists. Please choose a different username.')</script>"  );
        
        window.location.href = './signup';
        res.redirect('./signup');
    }
    
    else {
        // Hash the password using bcrypt
        const saltRounds = 10; // Number of salt rounds for bcrypt
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword; // Replace the original password with the hashed one

        const userdata = await collection.insertMany(data);
        console.log(userdata);
        res.render("./login");
    }
    
});
 
// Login user 
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username });
        if (!check) {
            res.send("<script>alert('User name not found.Please fill the registered user name.')</script>  ")
            res.render("./login");
        }
        // Compare the hashed password from the database with the plaintext password
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (!isPasswordMatch) {
            res.send ("<script>alert('wrong Password.Pleasse fill the correct details.')</script>  ");
            res.render("./login");
        }
        else {
            res.render("votepage");
        } 
    }
    catch {
        res.send("<script>alert('wrong details.Please fill the correct user name and password.')</script> ");
    }
});


// Define Port for Application
const port = 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});
app.use(bodyParser.json());
const dbName = 'login-users';