import { sequelize } from '../config/mysql.js';
import { DataTypes } from 'sequelize';

const Patient = sequelize.define('patients', {
    subject: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    group: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    gender: {
        type: DataTypes.CHAR,
        allowNull: false,
    },
    orthodontic_appliance: {
        type: DataTypes.TINYINT,
        allowNull: true,
    },
    marital_status: {
        type: DataTypes.ENUM(['soltero', 'casado', 'divorciado', 'viudo', '']),
        allowNull: true,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    first_surname: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    second_surname: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    birth_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    birth_department: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    birth_city: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    study_years: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    schooling_level: {
        type: DataTypes.ENUM([
            'agrafo', 
            'preescolar', 
            'básica primaria', 
            'básica secundaria', 
            'media', 
            'técnico', 
            'universitario', 
            'postgrado',
        ]),
        allowNull: false,
    },
    family_type: {
        type: DataTypes.ENUM([
            'nuclear',
            'extensa',
            'monoparental madre',
            'monoparental',
            'reconstituida',
            'recompuesta',
            'padres separados',
            'homoparental',
            'cuidador',
        ]),
        allowNull: true,
    },
    socioeconomic_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    institutions_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    leave_school: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    domestic_violence: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    displaced_by_violence: {
        type: DataTypes.TINYINT,
        allowNull: false
    }
}, {
    paranoid: true,
    deletedAt: 'deleted_at',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

export default Patient;