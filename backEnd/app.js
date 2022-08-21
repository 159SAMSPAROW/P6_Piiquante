const express = require('express');
const app = express();
const mongoose = require('mongoose');

//const stuffRoutes = require('./routes/stuff');
const usersRoutes = require('./routes/users');

mongoose.connect('mongodb+srv://SpArOw:XfI2nfSmljIU5GxQ@cluster0.6q837te.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', usersRoutes);
module.exports = app;
