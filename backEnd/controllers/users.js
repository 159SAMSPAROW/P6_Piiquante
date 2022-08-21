const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = require('../models/users');


exports.signup = (req, res, next) => {

    bcrypt.hash(req.body.password, 10)
    
    .then(hash => {
    const User = new users({
        email: req.body.email, 
        password: hash
    });
    User.save()
      .then(() => res.status(201).json({ message: 'utilisateur créer !'}))
      .catch(error => res.status(400).json({ error }))
})
.catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
users.findOne({email: req.body.email})
.then(user =>{
    
    if(user === null) {
        res.status(401).json({message: 'incorrect'})
    }else{
        bcrypt.compare(req.body.password, user.pasword)
        .then(valid => {
          
            if(!valid) {
            res.status(401).json({ message: 'incorrect'})
          }else{
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    { userId: user._id },
                    'random_token_secret',
                    { expiresIn: '24h'}
                )
            });
          }
        })

        .catch(error => {
            res.status(500).json({ error })
        })
    }
})
.catch(error => {
    res.status(500).json({ error});
})
};