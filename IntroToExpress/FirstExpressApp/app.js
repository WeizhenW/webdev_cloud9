let express = require("express");
let app = express();
//home page
app.get("/", function(req, res) {
    res.send("Hello!");
});
// city page
app.get("/city", function(req, res) {
    res.send("Paris!");
});

//route parameters - the pattern
//: in front of anything that is a variable

app.get("/destinations/:cityName", function(req, res) {
    let city = req.params.cityName;
    res.send("This is the page of " + city);
});

//catch all page - order matters - can't be placed at the beginning
app.get("*", function(req, res) {
    res.send("This is a star!");
})
//start server
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server started");
});