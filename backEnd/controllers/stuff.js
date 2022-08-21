const sauce = require('../models/sauce');

exports.createSauce = (req, res, next) => {
    delete req.body._id; 
    const sauce = new sauce({
        ...req.body
     })
     sauce.save()
     .then(() => res.status(201).json({ message: 'sauce enregistré !'}))
     .catch(error=> res.status(400).json({error}));
};

exports.modifySauce = (req, res, next) => {
    sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id})
    .then(() => res.status(200).json({ message: 'objet mofifié'}))
    .catch(error => res.status(400).json({error}))
};

exports.deleteSauce = (req, res, next) => {
    sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
};

exports.getAllSauce = (req, res, next) => {
    sauce.find()
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error }));
    next();
  }