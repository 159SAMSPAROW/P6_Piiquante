const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');//Permet de s' assurer que l' adresse mail ne sera utilisé qu' une seule fois

const userSchema = mongoose.Schema({//Création du schéma User grace a mongoose
    email: {type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);//Connect mongoose unique validator au schéma 

module.exports = mongoose.model('User', userSchema);//Exportation du model basé sur userSchema