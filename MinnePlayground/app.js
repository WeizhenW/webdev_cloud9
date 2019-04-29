let express = require("express");
let app = express ();
let bodyParser = require("body-parser");
let mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/playground", {useNewUrlParser: true});
app.set("view engine", "ejs"); //set default file type

app.use(bodyParser.urlencoded({extended: true})); //require body-parser

//schema setup
let playgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

let Playground = mongoose.model("Playground", playgroundSchema);

//create new playground

// Playground.create({
//     name: "Williston Treehouse",
//     image: "https://eminnetonka.com/images/williston/treehouse/IMG_0084a.jpg",
//     description: "The Williston Treehouse is an indoor play area at the Williston Fitness Center for children ages 12 and under. Admission is free for Williston Center members and $6 for non-members."
// }, function(error, playground) {
//     if(error) {
//         console.log(error);
//     } else {
//         console.log(playground);
//     }
// });

// let playgrounds =[
//         {name: "InnerActive Minnetonka", image: "https://thriftyminnesota.com/wp-content/uploads/2016/10/InnerActive-indoor-playground-1.jpg"},
//         {name: "Williston Treehouse", image: "https://eminnetonka.com/images/williston/treehouse/IMG_0084a.jpg"},
//         {name: "Ridgedale center play area", image: "https://3h40go1k7x4w3f2n2mbwapbf-wpengine.netdna-ssl.com/wp-content/uploads/2-adc-architecture-design-collaborative-retail-renovation-ridgedale-play-center-minnetonka-mn.jpg"},
//         {name: "Mini-Hops Gymnastics", image: "https://i.ytimg.com/vi/lDsyp_rKnLk/maxresdefault.jpg"},
//         {name: "Maple Maze", image: "https://www.maplegrovemn.gov/files/cache/ee833bb4e869c51836b132081e6f5b07_f2686.JPG"},
//         {name: "Urban Air", image: "https://urbanair.imgix.net/wp-content/uploads/2018/03/meridian-id-24.jpg?auto=format%2Ccompress&w=1200"}
//         ];

//landing page
app.get("/", function(req, res) {
    res.render("landing");
})

//INDEX ROUTE -display a list of playgrounds
app.get("/playgrounds", function(req, res) {
    //retrieve playground from the database
    Playground.find({}, function(error, allPlayground) {
        if(error) {
            console.log(error);
        } else {
            res.render("index", {playgrounds: allPlayground});
        }
    })
})

//CREATE - add new playground to the DB
app.post("/playgrounds", function(req, res) {
    let name = req.body.name;
    let image = req.body.image;
    let desc = req.body.description;
    let newPlayground = {name: name, image: image, description: desc};
    
    //create new playground and save to database
    Playground.create(newPlayground, function(error, newlyCreated) {
        if(error) {
            console.log(error);
        } else {
            res.redirect("/playgrounds");
        }
    })
})

//NEW ROUTE -display form to add new playground
app.get("/playgrounds/new", function(req, res) {
    res.render("new");
})

//SHOW ROUTE - show info about one playground
app.get("/playgrounds/:id", function(req, res) {
    
    Playground.findById(req.params.id, function(error,foundPlayground) {
        if(error) {
            console.log(error);
        } else {
            res.render("show", {playground: foundPlayground});
        }

    });
});

//start server
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server started");
});