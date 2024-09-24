module.exports = (sequelize, Sequelize) => {
    const Curso = sequelize.define('curso', {
        idCurso: {
            type: Sequelize.BIGINT, 
            autoIncrement: true,
            primaryKey: true
        },
        NombreCurso: {
            type: Sequelize.STRING(100) 
        },
        HorarioInicio: {
            type: Sequelize.TIME 
        },
        HorarioFin: {
            type: Sequelize.TIME
        },
        Jornada: {
            type: Sequelize.STRING(50) 
        }
    });

    return Curso;
};
