const express = require('express');
const router = express.Router();

const cursos = require('../controllers/controllercurso.js');

router.post('/create', cursos.create);
router.get('/all', cursos.retrieveAll);
router.get('/onebyid/:id', cursos.getById);
router.put('/update/:id', cursos.updateById);
router.delete('/delete/:id', cursos.deleteById);

module.exports = router;
