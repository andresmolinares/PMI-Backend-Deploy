import { sequelize } from '../config/mysql.js';
import { DataTypes } from 'sequelize';

const BrainStructure = sequelize.define('brain_structure', {
    short_region_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    long_region_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    hemisphere: {
        type: DataTypes.CHAR,
        allowNull: true,
    },
    lobe: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    is_important: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
    }
},
{
    tableName: 'brain_structure',
    timestamps: false
});

export default BrainStructure;