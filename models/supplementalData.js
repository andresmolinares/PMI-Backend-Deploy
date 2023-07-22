import { sequelize } from '../config/mysql.js';
import { DataTypes } from 'sequelize';


const SupplementalData = sequelize.define('supplemental_data', {
    children: {
        type: DataTypes.TINYINT,
        allowNull: true,
    },
    children_quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    sibling: {
        type: DataTypes.TINYINT,
        allowNull: true,
    },
    sibling_quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    sibling_disciplinary_record: {
        type: DataTypes.TINYINT,
        allowNull: true,
    },
    sibling_spa_use: {
        type: DataTypes.TINYINT,
        allowNull: true,
    },
    gangster: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    spa_use: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    smokes: {
        type: DataTypes.TINYINT,
        allowNull: true,
    },
    drink_alcohol: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    weed: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    cocaine: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
},
{
    timestamps: false
}
);

export default SupplementalData;