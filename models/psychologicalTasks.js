import { sequelize } from '../config/mysql.js';
import { DataTypes } from 'sequelize';

const PsychologicalTask = sequelize.define('psychological_tasks', {
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    max_score: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    min_score: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    }
},
{
    timestamps: false
});

export default PsychologicalTask;