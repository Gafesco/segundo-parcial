module.exports = (sequelize, Sequelize) => {
    const Estudiante = sequelize.define('estudiante', {
        IdEstudiante: {
            type: Sequelize.BIGINT, 
            autoIncrement: true,
            primaryKey: true
        },
        NombreCompleto: {
            type: Sequelize.STRING(100) 
        },
        Tutor: {
            type: Sequelize.STRING(100)
        },
        FechaNacimiento: {
            type: Sequelize.DATEONLY 
        },
        Genero: {
            type: Sequelize.STRING(10) 
        },
        UltimoGradoAprobado: {
            type: Sequelize.STRING(50) 
        }
    });

    return Estudiante;
};
