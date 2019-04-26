let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let request = require("request");
let searchId = "";


app.use(bodyParser.urlencoded({extended: true}));

//set default file type
app.set("view engine", "ejs");

//define home page
app.get("/", function(req, res) {
    res.render("home");
});

//define post page
app.post("/searchmovie", function(req, res) {
    searchId = req.body.imdbID;
    console.log(searchId);
    let url = "http://www.omdbapi.com/?apikey=thewdb&i="+searchId;
    //get api
    request(url, function(error, response, body) {
        console.log(url);
        if(error) {
            console.log("something went wrong!");
            console.log(error);
        } else if(!error && response.statusCode == 200) {
            let parsedData = JSON.parse(body);
            console.log(parsedData);
            res.render("result", {resultObj: parsedData});
        }
    });
});


//server start
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server start");
});