const express = require('express');
const router = express.Router();//Fonction utilisée pour créer un nouvel objet routeur dans le programme pour gérer les requêtes. 

const auth = require('../middleware/auth');
const multer = require('../middleware/multer.config')
const stuffCtrl = require('../controllers/sauces');

//Création des routes 
router.post('/', auth, multer, stuffCtrl.createSauce);
router.put('/:id', auth, multer, stuffCtrl.modifySauce);
router.delete('/:id', auth, stuffCtrl.deleteSauce);
router.get('/:id', auth, stuffCtrl.getOneSauce);
router.get('/', auth, stuffCtrl.getAllSauce);
router.post("/:id/like", auth, stuffCtrl.likeDislikeSauce);

module.exports = router;

