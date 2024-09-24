const db = require('../config/db.config.js');
const Nota = db.Nota;

// Crear un nuevo registro de Nota
exports.create = (req, res) => {
    let nota = {};

    try {
        nota.id_nota = req.body.id_nota;
        nota.id_estudiante = req.body.id_estudiante;
        nota.FechaIngresoMes = req.body.FechaIngresoMes;
        nota.Id_Curso = req.body.Id_Curso;
        nota.NotalTotal = req.body.NotalTotal;
        nota.StatusCurso = req.body.StatusCurso;

        Nota.create(nota).then(result => {
            res.status(200).json({
                message: "Nota creada exitosamente con id = " + result.id_nota,
                nota: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo!",
            error: error.message
        });
    }
};

// Recuperar todos los registros de Notas
exports.retrieveAll = (req, res) => {
    Nota.findAll()
        .then(notaInfos => {
            res.status(200).json({
                message: "¡Todas las Notas recuperadas exitosamente!",
                notas: notaInfos
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error!",
                error: error
            });
        });
};

// Recuperar un registro de Nota por ID
exports.getById = (req, res) => {
    let notaId = req.params.id;
    Nota.findByPk(notaId)
        .then(nota => {
            if (!nota) {
                res.status(404).json({
                    message: "Nota no encontrada con id = " + notaId,
                });
            } else {
                res.status(200).json({
                    message: "¡Nota recuperada exitosamente con id = " + notaId,
                    nota: nota
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error!",
                error: error
            });
        });
};

// Actualizar un registro de Nota por ID
exports.updateById = async (req, res) => {
    try {
        let notaId = req.params.id;
        let nota = await Nota.findByPk(notaId);

        if (!nota) {
            res.status(404).json({
                message: "No se encontró la Nota para actualizar con id = " + notaId,
                nota: "",
                error: "404"
            });
        } else {
            // Actualizar los datos de la nota
            let updatedObject = {
                id_nota: req.body.id_nota,
                id_estudiante: req.body.id_estudiante,
                FechaIngresoMes: req.body.FechaIngresoMes,
                Id_Curso: req.body.Id_Curso,
                NotalTotal: req.body.NotalTotal,
                StatusCurso: req.body.StatusCurso
            };
            let result = await Nota.update(updatedObject, { returning: true, where: { id_nota: notaId } });

            // Responder al cliente
            if (!result) {
                res.status(500).json({
                    message: "Error -> No se pudo actualizar la Nota con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Nota actualizada exitosamente con id = " + notaId,
                nota: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo actualizar la Nota con id = " + req.params.id,
            error: error.message
        });
    }
};

// Eliminar un registro de Nota por ID
exports.deleteById = async (req, res) => {
    try {
        let notaId = req.params.id;
        let nota = await Nota.findByPk(notaId);

        if (!nota) {
            res.status(404).json({
                message: "No existe una Nota con id = " + notaId,
                error: "404",
            });
        } else {
            await nota.destroy();
            res.status(200).json({
                message: "Nota eliminada exitosamente con id = " + notaId,
                nota: nota,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo eliminar la Nota con id = " + req.params.id,
            error: error.message,
        });
    }
};
