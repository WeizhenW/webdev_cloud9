let express = require("express");
let app = express();

app.use(express.static("public"));//set public folder as the place to hold the stylesheet and js file
app.set("view engine", ".ejs"); //set ejs file as default file type

//home page
app.get("/", function(req, res) {
    res.render("home");
});

//city page - using res.render and variables
app.get("/travel/:continent/:city", function(req, res) {
    let continent = req.params.continent;
    let city = req.params.city;
    
    res.render("city", {
                    contiName: continent, 
                    cityName: city
                    });
});

//list page - using loops in ejs

app.get("/capitals", function(req, res) {
    let capitals = [
        {country: "France", capital: "Paris"},
        {country: "Germany", capital: "Berlin"},
        {country: "Italy", capital: "Rome"}
    ]
    res.render("capitals", {capitalObj: capitals});
});

//start server
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server started");
});