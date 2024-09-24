module.exports = (sequelize, Sequelize) => {
    const Nota = sequelize.define('nota', {
        id_nota: {
            type: Sequelize.BIGINT, 
            autoIncrement: true,
            primaryKey: true
        },
        id_estudiante: {
            type: Sequelize.BIGINT,
            allowNull: false,
            references: {
                model: 'estudiantes', // Nombre de la tabla de estudiantes
                key: 'IdEstudiante'
            }
        },
        FechaIngresoMes: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        Id_Curso: {
            type: Sequelize.BIGINT,
            allowNull: false,
            references: {
                model: 'cursos', // Nombre de la tabla de cursos
                key: 'idCurso'
            }
        },
        NotalTotal: {
            type: Sequelize.DECIMAL(5, 2),
            allowNull: false
        },
        StatusCurso: {
            type: Sequelize.STRING(50),
            allowNull: false
        }
    });

    return Nota;
};
