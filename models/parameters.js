import { sequelize } from '../config/mysql.js';
import { DataTypes } from 'sequelize';

const Parameter = sequelize.define('parameters', {
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    code: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    paranoid: true,
    timestamps: false
});

export default Parameter;