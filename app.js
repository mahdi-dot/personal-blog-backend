const express = require("express");
const Sequelize = require("sequelize");
const { Post,Comment } = require("./models");

const port = 8888

const DataBase = new Sequelize('sql6424905', 'sql6424905', 'wZQ7qTkPbn', {
    host: 'sql6.freemysqlhosting.net',
    dialect: "mysql"
});

DataBase.sync().then(()=>{
    console.log("connected succesfully!!!!!!")
});

const app = express();
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Virgool API!");
});

/**get all posts */
app.get("/api/posts", (req, res) => {
    const posts = Post.findAll();
    if (!posts)
        return res.sendStatus(404);
    return res.json(posts);
})

/*get a post by id */
app.get("/api/posts/:id", async (req,res) => {
    let id = req.params.id;
    const post = await Post.findByPk(id);
    if(!post)
        return res.sendStatus(404);
    
    return res.json(post);
});

/*get all posts of a category */
app.get("/api/posts/:categorie",(req,res)=>{
    let categorie = req.params.categorie;
    const posts = Post.findAll({where: {categorie: categorie}});
    if(!posts)
        return res.sendStatus(404);
    return res.json(posts);
});

/*get all comments by post id */
app.get("/api/posts/:id/comments",(req,res)=>{
    let id = req.params.id;
    const comments = Comment.findAll({
        where: {
          PostID: id
        }
    });
    if(!comments)
        return res.sendStatus(404);
    return res.json(comments);
});


/** get a comment by post id and comment id */
app.get("/api/posts/:id/comments/:commentId",(req,res)=>{
    let id = req.params.id;
    let commentId = req.params.commentId;
    const comment = Comment.findone({where: {id: commentId,PostID:id}});
    if(!comment)
        return res.sendStatus(404);
    
    return res.json(comment);
})

/** post a new post */
app.post("/api/posts",(req,res)=>{
    const newPost = {
        Title: req.body.Title,
        description: req.body.description,
        text: req.body.Text,
        Categorie: req.body.Categorie
    };
    console.log(newPost);
    Post.create(newPost);
});

/**post a new comment on a post by post id */
app.post("/api/posts/:id/comments",(req,res)=>{
    const newComment = {
        PostID: req.body.PostId,
        userName: req.body.userName,
        text: req.body.text
    };
    console.log(newComment);
    Comment.create(newComment);
});

app.listen(port, ()=>{
    console.log("app is running on port:",port);
})

