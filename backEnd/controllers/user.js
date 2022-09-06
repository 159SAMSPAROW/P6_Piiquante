const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('password-validator');

exports.signup =  (req, res) => {//Middleware qui permet de créer et de sauvegarder un nouvel utilisateur en cryptant son mot de passe
   
   bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        }); 
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};


exports.login = (req, res) => {//Middleware qui permet d' authentifier un utilisateur en récupérant la variable 
    const secret_token = process.env.SECRET_TOKEN;//d' environement, puis en recherchant par adresse mail si existant dans la bdd, puis 
    User.findOne({ email: req.body.email })//en comparant les hashs des password
  
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(400).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            secret_token,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};