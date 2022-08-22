const express = require('express');
const app = express();
const mongoose = require('mongoose');

const usersRoutes = require('./routes/users');
const stuffRoutes = require('./routes/stuff');


mongoose.connect('mongodb+srv://SpArOw:znrjDV35Nmx1qR8a@cluster0.6q837te.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Acces-Controle-Allow-Methods', 'GET, POST, PUT, DELETE, PATH, OPTIONS');
  next();
});

app.use('/api/auth', usersRoutes);
app.use('/api/stuff', stuffRoutes);

module.exports = app;
