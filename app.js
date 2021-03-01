// Connection String: mongodb+srv://testuser:<password>@nodetest.yvakv.mongodb.net/nodetestdatabase?retryWrites=true&w=majority

const express = require('express');
const dbURL = //PASTE YOUR CONNECTION STRING
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')
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

  //BlogRoutes
  app.use('/blogs' ,blogRoutes);

  
  // 404 page
  app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
  });
