const express = require("express");
const app = express();
const path = require("path");

const { v4: uuidv4 } = require('uuid');  //for generating id

const methodOverride = require("method-override");

const port = 8080;

app.use(express.urlencoded({extended: true})); 
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static (path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        name: "Rohini",
        title: "Skydiving",
        content: "I enjoyed swimming into water",
        tags: "#water #fishes",
    },
    {
        id: uuidv4(),
        name: "Lucy",
        title: "Mountains",
        content: "The weather there was amazing",
        tags: "#winter #snow",
    },
    {
        id: uuidv4(),
        name: "Henry",
        title: "Beach",
        content: "The water was too salty there",
        tags: "#sunny #tides",
    },
]

app.get("/posts", (req, res) => {
    // res.send("The app is working");
    res.render("index.ejs", {posts});
})

app.listen(port, ()=> {
    console.log("Listening on port 8080");
})

//new post
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
})

app.post("/posts", (req, res) => {
    // console.log(req.body);
    let id = uuidv4();
    let {name, title, content, tags} = req.body;
    posts.push({id, name, title, content, tags});
    // res.send("req is working");
    res.redirect("/posts");
})

//see in detail
app.get("/posts/:id", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id == p.id);
    // console.log(post);
    res.render("show.ejs", {post});
})

app.post("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id == p.id);
    // console.log(post);
    res.render("show.ejs", {post});
})

//update post

app.patch("/posts/:id", (req, res) => {
    let {id} = req.params;

    let newName = req.body.name;
    let newTitle = req.body.title;
    let newContent = req.body.content;
    let newTag = req.body.tags;
    
    // console.log(newContent);
    // console.log(id);
    let post = posts.find((p) => id === p.id);
    post.name = newName;
    post.title = newTitle;
    post.content = newContent;
    post.tags = newTag;
    console.log(post);
    // res.send("patch req working");
    res.redirect("/posts");
})

app.get("/posts/:id/edit", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});
})


//delete post
app.delete("/posts/:id", (req, res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id != p.id);
    res.redirect("/posts");
})