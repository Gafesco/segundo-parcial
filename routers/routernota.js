const express = require('express');
const router = express.Router();

const notas = require('../controllers/controllernota.js');

router.post('/create', notas.create);
router.get('/all', notas.retrieveAll);
router.get('/onebyid/:id', notas.getById);
router.put('/update/:id', notas.updateById);
router.delete('/delete/:id', notas.deleteById);

module.exports = router;
