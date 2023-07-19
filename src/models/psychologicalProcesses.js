import { sequelize } from '../config/mysql.js';
import { DataTypes } from 'sequelize';

const PsychologicalProcess = sequelize.define('psychological_processes', {
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    max_points: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    instruction: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
{
    timestamps: false
});

export default PsychologicalProcess;