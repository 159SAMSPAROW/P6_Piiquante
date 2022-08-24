const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    
    bcrypt.hash(req.body.password, 10)
    
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash,
        }); 
        
        user.save()
        .then(() => res.status(200).json({ message: "Compte créé !"}))
        .catch((error) => res.status(400).json({error}));
        console.log(user);
    })
    .catch((error) => res.status(500).json({message: error}));   
};

exports.login = (req, res, next) => {
    
    User.findOne({ email: req.body.email })
    
    .then(user => {
       console.log(user);
        if(!user) {
            return res.status(401).json( {message: "Identifiants incorrects"} )
        }

        bcrypt.compare(req.body.password, user.password)
           
        .then(valid => {
                if(!valid){                     
                      return res.status(401).json({message: "Identifiants incorrects"});
                }
                console.log(user);
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign({userId: user._id}, process.env.TOKEN, {expiresIn: "24h"})
                    });
                
            })
        .catch(error => res.status(400).json({error}));
})
.catch(error => res.status(500).json({ error }));
};