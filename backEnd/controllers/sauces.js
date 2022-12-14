//Importation du modelsauce
const Sauce = require('../models/sauces');

//Permet d'avoir accès aux différentes opérations liées au système de fichiers
const fs = require('fs'); 

//Fonction pour créer une sauce
exports.createSauce = (req, res) => {
    
    const sauceObject = JSON.parse(req.body.sauce);
      
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
        
    });console.log(req.body.sauce);
    sauce.save()
        .then(() => res.status(201).json({ message: "Sauce enregistrée !" }))
        .catch((error) => res.status(400).json({ error }));
};
//Fonction pour modifier la sauce 
exports.modifySauce = (req, res) => {
    
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    
    delete sauceObject._userId;
    Sauce.findOne({_id: req.params.id})
        .then((sauce) => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message : 'Not authorized'});
            } else {
                Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Objet modifié!'}))
                .catch(error => res.status(401).json({ error }));
            }  
        })

        .catch((error) => {
            res.status(400).json({ error });
        });
 };
//Effacé une sauce 
 exports.deleteSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id})
        .then(sauce => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({message: 'Not authorized'});
            } else {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch( error => {res.status(500).json({ error })});
 };
//Récupération d'une sauce
exports.getOneSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id})
        .then(sauce => res.status(200).json(sauce))
        .catch(error => {
            console.log(error);
            res.status(404).json({ message: error.message });
        });
};
//Récupération des sauces
exports.getAllSauce = (req, res) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => {
            console.log(error);
            res.status(404).json({ message: error.message });
        });
};
//Fonction de likes et dislikes
exports.likeDislikeSauce = (req, res) => {
    console.log(req.body)
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {

            // like d'une sauce 
            // si userliked n'est pas présent dans le body de userId et que le like dans le body n'est pas strictement = à 1
            if (!sauce.usersLiked.includes(req.body.userId) && req.body.like === 1) {
                Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId } })
                    .then(() => res.status(200).json({ message: 'sauce liked !' }))
                    .catch(error => res.status(400).json({ error }));
            }

            // unlike d'une sauce 
            if (sauce.usersLiked.includes(req.body.userId) && req.body.like === 0) {
                Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } })
                    .then(() => res.status(200).json({ message: 'sauce unliked ' }))
                    .catch(error => res.status(400).json({ error }));
            }

            // disliked d'une sauce 
            if (!sauce.usersDisliked.includes(req.body.userId) && req.body.like === -1) {
                Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId } })
                    .then(() => res.status(200).json({ message: 'sauce dislike ' }))
                    .catch(error => res.status(400).json({ error }));
            }

            // retrait du disliked d'une sauce 
            if (sauce.usersDisliked.includes(req.body.userId) && req.body.like === 0) {
                Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId } })
                    .then(() => res.status(200).json({ message: 'sauce undisliked' }))
                    .catch(error => res.status(400).json({ error }));
            }

        })
};