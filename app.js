// Connection String: mongodb+srv://testuser:<password>@nodetest.yvakv.mongodb.net/nodetestdatabase?retryWrites=true&w=majority

const express = require('express');
const dbURL = //PASTE YOUR DATABASE CONNECTION STRING HERE
const mongoose = require('mongoose');
const Blog = require('./models/blog')
const app = express();
app.set('view engine' , 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));


mongoose.connect(dbURL, { useNewUrlParser: true , useUnifiedTopology: true })
.then(() => {app.listen(3000)})
.catch((err) => {console.log(err)});



app.get('/', (req, res) => {
      res.redirect('/blogs');
  });
  
  app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
  });
  
  app.get('/blogs', (req, res) => {
    Blog.find().sort({createdAt: -1})
    .then((result) => {res.render('index' , {title: 'All Blogs' , blogs: result})})
    .catch((err) => {console.log(err)})
  });
  
  // BLOG ROUTES================================================
  app.post('/blogs', (req, res) => {
    console.log(req.body);
    const blog = new Blog(req.body)
    blog.save()
    .then((result) => {res.redirect('/blogs')})
    .catch((err) => {console.log(err)})
  });

  app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
  });
  
  app.get('/blogs/:id', (req, res) => {
    const id = req.params.id
    // console.log(id);
    Blog.findById(id)
    .then((result) => {res.render('details' , {blog: result , title: 'Blog Details'})})
    .catch((err) => {console.log(err)})
  });
  
  app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
      .then(result => {res.json({ redirect: '/blogs' });})
      .catch(err => {console.log(err);});
  });
  

  
  // 404 page
  app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
  });
