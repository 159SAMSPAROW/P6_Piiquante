require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const usersRoutes = require('./routes/user');
const stuffRoutes = require('./routes/sauces');

mongoose.connect('mongodb+srv://SpArOw:znrjDV35Nmx1qR8a@cluster0.6q837te.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader("Cross-Origin-Resource-Policy", "same-site");
  next();
});

app.use('/api/auth', usersRoutes);
app.use('/api/sauces', stuffRoutes);
app.use('/images',express.static(path.join(__dirname,'images')));
app.use(helmet());
module.exports = app;
