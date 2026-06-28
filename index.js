const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 }= require('uuid');
const methodOverride = require("method-override");




app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));// this used to access patch req in html

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
let posts =[
    {
        id:uuidv4(),

        username : "harsh",
        content : "i love coding"
    },
    {
        id:uuidv4(),
        username : "harsh saini",
        content : "i love heardwork"
    },
    {
        id:uuidv4(),
        username : "harsh khanna",
        content : "bcz hardwrk is most impt to succesful"
    }
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});

});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
});

app.post("/posts",(req,res)=>{
    let{ username, content}=req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
    console.log("post route hit");// connect route
 console.log(req.body);   
 res.send("form sumbitted");
});

app.get("/posts/:id",(req,res)=>{
    let{id}=req.params
    console.log(id);
    //res.send("request working");
    let post= posts.find((p) => id==p.id);// print id
    res.render("show.ejs",{post});
    console.log(post);
});

app.patch("/posts/:id",(req,res)=>{
    let{id}=req.params;
    let newContent = req.body.content;
    let post= posts.find((p) => id==p.id);
    post.content =newContent;
    console.log(post);
    res.redirect("/posts")
});

app.get("/posts/:id/edit",(req,res)=>{
    let{id}=req.params;
    console.log(id);
let post= posts.find((p) => id==p.id);
console.log(post);
res.render("edit.ejs",{post});
});

app.delete("/posts/:id",(req,res)=>{
let{id}=req.params;
 posts= posts.filter((p) => id !== p.id);
res.redirect("/posts");
});
app.listen(port, ()=>{
    console.log("listening to port:8080");
});