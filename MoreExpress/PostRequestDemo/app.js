let express = require("express");
let app = express();
let bodyParser = require("body-parser");

let cities = ["Paris", "Munich", "Rome", "Madrid", "Amsterdam"];


app.use(express.static("public")); //stylesheet location
app.set("view engine", "ejs"); //default file type
app.use(bodyParser.urlencoded({extended: true}));

//define home page
app.get("/", function(req, res) {
    res.render("home");
});

//define cities page
app.get("/cities", function(req, res) {
    res.render("cities", {citiesVar: cities});
})

//define POST request

app.post("/addcity", function(req, res) {
    let newcity = req.body.newCity;
    cities.push(newcity);
    res.redirect("/cities");
})

//start server
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server started");
});