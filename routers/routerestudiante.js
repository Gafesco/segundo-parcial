const express = require('express');
const router = express.Router();

const estudiantes = require('../controllers/controllerestudiante.js');

router.post('/create', estudiantes.create);
router.get('/all', estudiantes.retrieveAll);
router.get('/onebyid/:id', estudiantes.getById);
router.put('/update/:id', estudiantes.updateById);
router.delete('/delete/:id', estudiantes.deleteById);

module.exports = router;
