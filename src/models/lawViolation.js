import { sequelize } from '../config/mysql.js';
import { DataTypes } from 'sequelize';

const LawViolation = sequelize.define('law_violations', {
    sentence_months: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    admission_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    recidivist: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    recidivism_quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    }
}, 
{
    timestamps: false
}
);

export default LawViolation;