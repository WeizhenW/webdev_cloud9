let express = require("express");
let app = express ();

let playgrounds =[
        {name: "InnerActive Minnetonka", image: "https://thriftyminnesota.com/wp-content/uploads/2016/10/InnerActive-indoor-playground-1.jpg"},
        {name: "Williston Treehouse", image: "https://eminnetonka.com/images/williston/treehouse/IMG_0084a.jpg"},
        {name: "Ridgedale center play area", image: "https://3h40go1k7x4w3f2n2mbwapbf-wpengine.netdna-ssl.com/wp-content/uploads/2-adc-architecture-design-collaborative-retail-renovation-ridgedale-play-center-minnetonka-mn.jpg"},
        {name: "Mini-Hops Gymnastics", image: "https://i.ytimg.com/vi/lDsyp_rKnLk/maxresdefault.jpg"},
        {name: "Maple Maze", image: "https://www.maplegrovemn.gov/files/cache/ee833bb4e869c51836b132081e6f5b07_f2686.JPG"},
        {name: "Urban Air", image: "https://urbanair.imgix.net/wp-content/uploads/2018/03/meridian-id-24.jpg?auto=format%2Ccompress&w=1200"}
        ];

app.set("view engine", "ejs"); //set default file type

let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true})); //require body-parser


//landing page
app.get("/", function(req, res) {
    res.render("landing");
})

//playgrounds page
app.get("/playgrounds", function(req, res) {
    res.render("playgrounds", {playgrounds: playgrounds});
})

//POST route to add new one into the playgrounds page
app.post("/playgrounds", function(req, res) {
    let name = req.body.name;
    let image = req.body.image;
    let newPlayground = {name: name, image: image};
    playgrounds.push(newPlayground);
    res.redirect("/playgrounds");
})

//add new playground page
app.get("/playgrounds/new", function(req, res) {
    res.render("new");
})
//start server
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server started");
});