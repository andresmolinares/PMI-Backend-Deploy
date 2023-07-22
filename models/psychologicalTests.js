import { sequelize } from '../config/mysql.js';
import { DataTypes } from 'sequelize';

const PsychologicalTest = sequelize.define('psychological_tests', {
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    short_description: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
{
    timestamps: false
});

export default PsychologicalTest;