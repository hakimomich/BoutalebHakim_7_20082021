const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const articleRoutes = require('./routes/article');
const commentRoutes = require('./routes/comment');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');

const mysql = require('mysql');

console.log('Get connection ...');

const conn = mysql.createConnection({
  database: 'groupomonia',
  host: "localhost",
  user: "hakim",
  password: "zouzoukill92"
});
 
conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use('/images',express.static(path.join(__dirname, 'images')));

app.use('/api/article', articleRoutes);
app.use('/api/comment', commentRoutes)
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

module.exports = conn;
module.exports = app;

