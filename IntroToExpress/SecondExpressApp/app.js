let express = require("express");
let app = express();

//home page
app.get("/", function(req, res) {
    res.send("Hi welcome to my assignment");
});

//speak page
app.get("/speak/:animal", function(req, res) {
    let animal = req.params.animal;
    let speak = "";
    if(animal === "pig") {
        speak = "Oink";
    } else if(animal === "cow") {
        speak = "Moo";
    } else if(animal === "dog") {
        speak = "Woof Woof!";
    }
    res.send("The " + animal + " says " + "'" + speak + "'");
});
//repeat
app.get("/repeat/:word/:num", function(req, res) {
    let word = req.params.word;
    let num = req.params.num;
    let result = word;
    for(let i=1; i<num; i++) {
        result = result + " " + word;
    }
    res.send(result);
});
//fall back page
app.get("*", function(req, res) {
    res.send("sorry!");
});

//start server
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server started");
});