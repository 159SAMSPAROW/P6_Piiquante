const express = require('express');
const auth = require('auth');
const stuffCtrl = require('../controllers/stuff');

const router = express.Router();

router.post('/', auth, stuffCtrl.createSauce);
router.put('/:id', auth, stuffCtrl.modifySauce);
router.delete('/:id', auth, stuffCtrl.deleteSauce);
router.get('/:id', auth, stuffCtrl.getOneSauce);
router.get('/', auth, stuffCtrl.getAllSauce);

module.exports = router;