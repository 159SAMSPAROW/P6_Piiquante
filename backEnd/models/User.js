const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');//Permet de s' assurer que l' adresse mail ne sera utilisé qu' une seule fois

const userSchema = mongoose.Schema({//Schéma des clé : valeurs requise
    email: {type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);