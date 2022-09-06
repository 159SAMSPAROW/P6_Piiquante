

require('dotenv').config();//Importation du module dotenv pour charger les variables d' environnement 
//et sa fonction config qui lit le fichier .env et l' affecte a process.env

const helmet = require('helmet');//Importation helmet.js aide à sécuriser les applications express. 


const express = require('express');//Importation d' express
const app = express();//Création de l' application express

const mongoose = require('mongoose');//Importation de Mongoose mappeur de document objet (ODM). 
//Cela signifie que Mongoose permet de définir des objets avec un schéma fortement typé mappé sur un document MongoDB..

const path = require('path');//Importation du module path. 
//Le module Path permet de travailler avec des répertoires et des chemins de fichiers.

//Importation des routes
const usersRoutes = require('./routes/user');
const stuffRoutes = require('./routes/sauces');

const { PORT, errorHandler } = require('./config'); 

app.on('error', errorHandler);// Config : Port, Erreurs
app.on('listening', () => {
const address = app.address();
const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
console.log('Listening on ' + bind);
});
//Connection a la base de donnée
mongoose.connect(process.env.mongoDB_Access,
{ useNewUrlParser: true,
useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))

.catch(() => console.log('Connexion à MongoDB échouée !'));

//Appel de la fonction middleware intégrée dans Express qui analyse les requêtes JSON entrantes et place les données analysées dans req.body.
app.use(express.json());

app.use(helmet());//Police de lecture des requêtes en provenance uniquement  du même site

/////Middlware de définition des headers
app.use((req, res, next) => {
//seule les demande provenant du même site
res.setHeader('Cross-Origin-Resource-Policy', 'same-site')
// Accéder à notre API depuis n'importe quelle origine
res.setHeader('Access-Control-Allow-Origin', '*');
// Ajouter les headers mentionnés aux requêtes envoyées vers notre API
res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
// Envoyer des requêtes avec les méthodes mentionnées
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
next();
})
//Ajout d' un middleware pour servir des fichiers statiques à l' application Express
//La méthode path.join() joint les segments de chemin spécifiés en un seul chemin.
app.use('/images', express.static(path.join(__dirname, 'images')));

//Ajout des middleware d' utilisation des routeurs
app.use('/api/auth', usersRoutes);
app.use('/api/sauces', stuffRoutes);

app.listen(process.env.PORT, function(){

console.log("Server listening on PORT", process.env.PORT);
});

//Exportation de l' application
module.exports = app;
