const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer.config')
const stuffCtrl = require('../controllers/sauces');


//Create Read Uptdate Delete

router.post('/', auth, multer, stuffCtrl.createSauce);
router.put('/:id', auth, multer, stuffCtrl.modifySauce);
router.delete('/:id', auth, stuffCtrl.deleteSauce);
router.get('/:id', auth, stuffCtrl.getOneSauce);
router.get('/', auth, stuffCtrl.getAllSauce);
router.post("/:id/like", auth, stuffCtrl.likeDislikeSauce);

module.exports = router;

