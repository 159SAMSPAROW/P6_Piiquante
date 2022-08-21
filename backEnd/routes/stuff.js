const express = require('express');
const stuffCtrl = require('../controllers/stuff');
const auth = require('auth');

const router = express.Router();


router.post('/', auth, stuffCtrl.createSauce);
router.put('/:id', auth, stuffCtrl.modifySauce);
router.delete('/:id', auth, stuffCtrl.deleteSauce);
router.get('/:id', auth, stuffCtrl.getOneSauce);
router.get('/', auth, stuffCtrl.getAllSauce);

module.exports = router;