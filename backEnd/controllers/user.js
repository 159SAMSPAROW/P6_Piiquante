const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
<<<<<<< HEAD
        });       
=======
        }); 
>>>>>>> da2cdfbaaba8177629a409b58fe1824489e76542
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };


  exports.login = (req, res, next) => {
    const secret_token = process.env.SECRET_TOKEN;
    User.findOne({ email: req.body.email })
<<<<<<< HEAD

        .then(user => {console.log(user)
=======
  
        .then(user => {//console.log(user)
>>>>>>> da2cdfbaaba8177629a409b58fe1824489e76542
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