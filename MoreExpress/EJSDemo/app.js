let express = require("express");
let app = express();

//home page
app.get("/", function(req, res) {
    res.render("home.ejs");
});

//city page
app.get("/travel/:continent/:city", function(req, res) {
    let continent = req.params.continent;
    let city = req.params.city;
    
    res.render("city.ejs", {
                    contiName: continent, 
                    cityName: city
                    });
});

//start server
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server started");
});