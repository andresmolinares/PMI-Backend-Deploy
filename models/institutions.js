import { sequelize } from '../config/mysql.js';
import { DataTypes } from 'sequelize';

const Center = sequelize.define('institutions', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
{
    timestamps: false
});

export default Center;