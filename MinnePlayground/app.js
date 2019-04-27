let express = require("express");
let app = express ();

app.set("view engine", "ejs");




//landing page
app.get("/", function(req, res) {
    res.render("landing");
})

//playgrounds
app.get("/playgrounds", function(req, res) {
    res.render("playgrounds");
})

//start server
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server started");
});