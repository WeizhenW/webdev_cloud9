let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let mongoose = require("mongoose");

//app config
mongoose.connect("mongodb://localhost:27017/blogapp", {useNewUrlParser: true});//connect to mongoose
app.set("view engine", "ejs"); //default file type
app.use(express.static("public")); //style sheets location
app.use(bodyParser.urlencoded({extended: true})); //use bodyParser

//Mongoose/Model config
let blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

let Blog = mongoose.model("blog", blogSchema);

// Blog.create({
//     title: "Paris",
//     image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80",
//     body: "I love Paris"
// });

//restful routes config
//landing page
app.get("/", function(req, res) {
    res.redirect("/blogs");
})
//index route
 app.get("/blogs", function(req, res) {
     Blog.find({}, function(error, allBlog) {
         if(error) {
             console.log(error);
         } else {
             res.render("index", {blogs: allBlog} );
         }
     });
 });

//server start
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server started");
})