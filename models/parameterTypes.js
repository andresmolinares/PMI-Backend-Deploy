import { sequelize } from '../config/mysql.js';
import { DataTypes } from 'sequelize';

const ParameterTypes = sequelize.define('parameter_types', {
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    paranoid: true,
    deletedAt: 'deleted_at',
    timestamps: false
});

export default ParameterTypes;