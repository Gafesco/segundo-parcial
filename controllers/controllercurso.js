const db = require('../config/db.config.js');
const Curso = db.Curso;

// Crear un nuevo Curso
exports.create = (req, res) => {
    let curso = {};

    try {
        curso.idCurso = req.body.idCurso;
        curso.NombreCurso = req.body.NombreCurso;
        curso.HorarioInicio = req.body.HorarioInicio;
        curso.HorarioFin = req.body.HorarioFin;
        curso.Jornada = req.body.Jornada;

        Curso.create(curso).then(result => {
            res.status(200).json({
                message: "Curso creado exitosamente con id = " + result.idCurso,
                curso: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo!",
            error: error.message
        });
    }
};

// Recuperar todos los Cursos
exports.retrieveAll = (req, res) => {
    Curso.findAll()
        .then(cursoInfos => {
            res.status(200).json({
                message: "¡Todos los Cursos recuperados exitosamente!",
                cursos: cursoInfos
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

// Recuperar un Curso por ID
exports.getById = (req, res) => {
    let cursoId = req.params.id;
    Curso.findByPk(cursoId)
        .then(curso => {
            if (!curso) {
                res.status(404).json({
                    message: "Curso no encontrado con id = " + cursoId,
                });
            } else {
                res.status(200).json({
                    message: "¡Curso recuperado exitosamente con id = " + cursoId,
                    curso: curso
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

// Actualizar un Curso por ID
exports.updateById = async (req, res) => {
    try {
        let cursoId = req.params.id;
        let curso = await Curso.findByPk(cursoId);

        if (!curso) {
            res.status(404).json({
                message: "No se encontró el Curso para actualizar con id = " + cursoId,
                curso: "",
                error: "404"
            });
        } else {
            // Actualizar los datos del curso
            let updatedObject = {
                idCurso: req.body.idCurso,
                NombreCurso: req.body.NombreCurso,
                HorarioInicio: req.body.HorarioInicio,
                HorarioFin: req.body.HorarioFin,
                Jornada: req.body.Jornada
            };
            let result = await Curso.update(updatedObject, { returning: true, where: { idCurso: cursoId } });

            // Responder al cliente
            if (!result) {
                res.status(500).json({
                    message: "Error -> No se pudo actualizar el Curso con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Curso actualizado exitosamente con id = " + cursoId,
                curso: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo actualizar el Curso con id = " + req.params.id,
            error: error.message
        });
    }
};

// Eliminar un Curso por ID
exports.deleteById = async (req, res) => {
    try {
        let cursoId = req.params.id;
        let curso = await Curso.findByPk(cursoId);

        if (!curso) {
            res.status(404).json({
                message: "No existe un Curso con id = " + cursoId,
                error: "404",
            });
        } else {
            await curso.destroy();
            res.status(200).json({
                message: "Curso eliminado exitosamente con id = " + cursoId,
                curso: curso,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo eliminar el Curso con id = " + req.params.id,
            error: error.message,
        });
    }
};
