let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let methodOverride = require("method-override");
let expressSanitizer = require("express-sanitizer");

//app config
mongoose.connect("mongodb://localhost:27017/blogapp", {useNewUrlParser: true});//connect to mongoose
mongoose.set('useFindAndModify', false); //set useFindAndModify to false
app.set("view engine", "ejs"); //default file type
app.use(express.static("public")); //style sheets location
app.use(bodyParser.urlencoded({extended: true})); //use bodyParser
app.use(expressSanitizer());
app.use(methodOverride("_method")); //use methodOverride

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
 
 //new route
 app.get("/blogs/new", function(req, res) {
     res.render("new");
 })

//create route
app.post("/blogs", function(req, res) {
    req.body.blog.body = req.sanitize(req.body.blog.body); //sanitizing: remove any scripts
    Blog.create(req.body.blog, function(error, newBlog) {
        if(error) {
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    });
        
});

//show route
app.get("/blogs/:id", function(req, res) {
    Blog.findById(req.params.id, function(error, foundBlog) {
        if(error) {
            res.redirect("/blogs");
        } else {
            res.render("show", {blog:foundBlog});
        }
    });
});

//edit route
app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(error, foundBlog) {
        if(error) {
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: foundBlog});

        }
    })
})

//update route
app.put("/blogs/:id", function(req, res) {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(error, updatedBlog) {
        if(error) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    })
    
})

//destroy route

app.delete("/blogs/:id", function(req, res) {
    Blog.findByIdAndRemove(req.params.id, function(error) {
        if(error) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    })
})


//server start
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server started");
})