const db = require('../config/db.config.js');
const Estudiante = db.Estudiante;

// Crear un nuevo Estudiante
exports.create = (req, res) => {
    let estudiante = {};

    try {
        estudiante.IdEstudiante = req.body.IdEstudiante;
        estudiante.NombreCompleto = req.body.NombreCompleto;
        estudiante.Tutor = req.body.Tutor;
        estudiante.FechaNacimiento = req.body.FechaNacimiento;
        estudiante.Genero = req.body.Genero;
        estudiante.UltimoGradoAprobado = req.body.UltimoGradoAprobado;

        Estudiante.create(estudiante).then(result => {
            res.status(200).json({
                message: "Estudiante creado exitosamente con id = " + result.IdEstudiante,
                estudiante: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo!",
            error: error.message
        });
    }
};

// Recuperar todos los Estudiantes
exports.retrieveAll = (req, res) => {
    Estudiante.findAll()
        .then(estudianteInfos => {
            res.status(200).json({
                message: "¡Todos los Estudiantes recuperados exitosamente!",
                estudiantes: estudianteInfos
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

// Recuperar un Estudiante por ID
exports.getById = (req, res) => {
    let estudianteId = req.params.id;
    Estudiante.findByPk(estudianteId)
        .then(estudiante => {
            if (!estudiante) {
                res.status(404).json({
                    message: "Estudiante no encontrado con id = " + estudianteId,
                });
            } else {
                res.status(200).json({
                    message: "¡Estudiante recuperado exitosamente con id = " + estudianteId,
                    estudiante: estudiante
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

// Actualizar un Estudiante por ID
exports.updateById = async (req, res) => {
    try {
        let estudianteId = req.params.id;
        let estudiante = await Estudiante.findByPk(estudianteId);

        if (!estudiante) {
            res.status(404).json({
                message: "No se encontró el Estudiante para actualizar con id = " + estudianteId,
                estudiante: "",
                error: "404"
            });
        } else {
            // Actualizar los datos del estudiante
            let updatedObject = {
                IdEstudiante: req.body.IdEstudiante,
                NombreCompleto: req.body.NombreCompleto,
                Tutor: req.body.Tutor,
                FechaNacimiento: req.body.FechaNacimiento,
                Genero: req.body.Genero,
                UltimoGradoAprobado: req.body.UltimoGradoAprobado
            };
            let result = await Estudiante.update(updatedObject, { returning: true, where: { IdEstudiante: estudianteId } });

            // Responder al cliente
            if (!result) {
                res.status(500).json({
                    message: "Error -> No se pudo actualizar el Estudiante con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Estudiante actualizado exitosamente con id = " + estudianteId,
                estudiante: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo actualizar el Estudiante con id = " + req.params.id,
            error: error.message
        });
    }
};

// Eliminar un Estudiante por ID
exports.deleteById = async (req, res) => {
    try {
        let estudianteId = req.params.id;
        let estudiante = await Estudiante.findByPk(estudianteId);

        if (!estudiante) {
            res.status(404).json({
                message: "No existe un Estudiante con id = " + estudianteId,
                error: "404",
            });
        } else {
            await estudiante.destroy();
            res.status(200).json({
                message: "Estudiante eliminado exitosamente con id = " + estudianteId,
                estudiante: estudiante,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo eliminar el Estudiante con id = " + req.params.id,
            error: error.message,
        });
    }
};
