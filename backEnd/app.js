require('dotenv').config();//Importation du module dotenv pour charger les variables d' environnement 
                           //et sa fonction config qui lit le fichier .env et l' affecte a process.env

const helmet = require('helmet');//Importation helmet.js aide à sécuriser les applications express. 
                                 //Il configure divers en-têtes HTTP pour 
                                 // empêcher les attaques telles que Cross-Site-Scripting (XSS), clickjacking, etc.

const express = require('express');//Importation d' express, Il fournit des mécanismes pour :
                                  
//-Écrire des fonctions de traitement pour différentes requêtes HTTP répondant à différentes URI (par le biais des routes).
                                 
//-Intégrer avec les moteurs de rendu de « vues » dans le but de générer des
//réponses en insérant des données dans des modèles (« templates »).
                                  
//-Configurer certains paramètres d'applications comme le port à utiliser à la connexion et
//l'emplacement des modèles nécessaires pour la mise en forme de la réponse.
                                  
//-Ajouter des requêtes de traitement « middleware » (intergiciel) où vous le voulez dans
//le tunnel gestionnaire de la requête

const app = express();//Création de l' application express

const mongoose = require('mongoose');//Importation de Mongoose mappeur de document objet (ODM). 
//Cela signifie que Mongoose permet de définir des objets avec un schéma fortement typé mappé sur un document MongoDB..

const path = require('path');//Importation du module path. 
//Le module Path permet de travailler avec des répertoires et des chemins de fichiers.

//Importation des routes
const usersRoutes = require('./routes/user');
const stuffRoutes = require('./routes/sauces');

//Connection a la base de donnée
mongoose.connect('mongodb+srv://SpArOw:znrjDV35Nmx1qR8a@cluster0.6q837te.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//Appel de la fonction middleware intégrée dans Express qui analyse les requêtes JSON entrantes et place les données analysées dans req.body.
app.use(express.json());

/////Middlware de définition des headers
//Accéder à notre API depuis n'importe quelle origine ( '*' ) ;
//Ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
//Envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
//Seules les demandes provenant du même site peuvent lire la ressource et  la protection contre certaines demandes d'autres origines
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
