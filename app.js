const express = require('express');
const app = express();
const routes = require('./routes');
const methodOverride = require('method-override');

const nunjucks = require('nunjucks');

app.use(express.urlencoded({extended:true})); //allows the app to be able to read the http request body
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(routes);

app.set('view engine', 'njk');

nunjucks.configure('views',{
  express:app,
  noCache:true
});

app.listen('5000',() => {
  console.log('Server is running!');
});