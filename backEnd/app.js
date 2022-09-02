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

const rateLimit = require('express-rate-limit')// limite le nombre de connexion à l'app

const apiLimiter = rateLimit({// Définition des règles de limitation
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limite chaque IP à 100 requêtes par `window` (ici, par 15 minutes ) 
	standardHeaders: true, // Renvoie les informations de limite de débit dans les en-têtes `RateLimit-*` 
	legacyHeaders: false, // Désactive les en-têtes `X-RateLimit-*`
})



//Importation des routes
const usersRoutes = require('./routes/user');
const stuffRoutes = require('./routes/sauces');

//Connection a la base de donnée
mongoose.connect(process.env.mongoDB_Access,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//Appel de la fonction middleware intégrée dans Express qui analyse les requêtes JSON entrantes et place les données analysées dans req.body.
app.use(express.json());

app.use(helmet({CrossOriginResourcePolicy: { policy: "same-site"}}));

/////Middlware de définition des headers
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "same-site");//Seules les demandes provenant du même site peuvent lire la ressource et  la protection contre certaines demandes d'autres origines
  res.setHeader('Access-Control-Allow-Origin', '*');//Accéder à notre API depuis n'importe quelle origine ( '*' ) ;
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');//Ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');//Envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
  next();
});

//Ajout d' un middleware pour servir des fichiers statiques à l' application Express
//La méthode path.join() joint les segments de chemin spécifiés en un seul chemin.
app.use('/images', express.static(path.join(__dirname, 'images')));

//Ajout des middleware d' utilisation des routeurs
app.use('/api/auth', usersRoutes);
app.use('/api/sauces', stuffRoutes);

//
app.use('/api', apiLimiter)

//Exportation de l' application
module.exports = app;
