let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let request = require("request");
let searchInput = "";


app.use(bodyParser.urlencoded({extended: true}));

//set default file type
app.set("view engine", "ejs");

//define home page
app.get("/", function(req, res) {
    res.render("search");
});

//define post page
app.get("/search", function(req, res) {
    searchInput = req.query.searchInput;
    console.log(searchInput);
    let url = "http://www.omdbapi.com/?apikey=thewdb&s="+searchInput;
    //get api
    request(url, function(error, response, body) {
        console.log(url);
        if(error) {
            res.send(error);
        } else if(!error && response.statusCode == 200) {
            let parsedData = JSON.parse(body);
            console.log(parsedData)
            res.render("results", {data: parsedData});
        }
    });
});


//server start
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server start");
});