import { sequelize } from '../config/mysql.js';
import { DataTypes } from 'sequelize';

const Mri = sequelize.define('mri', {
    mri_route: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
}, {
    createdAt: 'created_at',
    updatedAt: false,
    tableName: 'mri'
});

export default Mri;