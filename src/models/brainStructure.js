import { sequelize } from '../config/mysql.js';
import { DataTypes } from 'sequelize';

const BrainStructure = sequelize.define('brain_structure', {
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
{
    tableName: 'brain_structure',
    timestamps: false
});

export default BrainStructure;