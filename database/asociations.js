import { sequelize } from '../config/mysql.js';
import { DataTypes } from 'sequelize';
import User from '../models/users.js';
import Patient from '../models/patients.js';
import Institution from '../models/institutions.js';
import SupplementalData from '../models/supplementalData.js';
import LawViolation from '../models/lawViolation.js';
import Parameter from '../models/parameters.js';
import ParameterType from '../models/parameterTypes.js';
import PsychologicalProcess from '../models/psychologicalProcesses.js';
import PsychologicalTask from '../models/psychologicalTasks.js';
import PsychologicalTest from '../models/psychologicalTests.js';

//usuarios y pacientes (1:M)
Patient.belongsTo(User, {
    foreignKey: 'users_id'
});

User.hasMany(Patient, {
    foreignKey: 'users_id'
});

//pacientes e instituciones (1:1)
Patient.belongsTo(Institution, {
    foreignKey: 'institutions_id'
});

Institution.hasMany(Patient, {
    foreignKey: 'institutions_id'
});

//pacientes y datos complementarios (1:1)
Patient.hasOne(SupplementalData, {
    foreignKey: 'patients_id'
});

SupplementalData.belongsTo(Patient, {
    foreignKey: 'patients_id'
});

//pacientes y violaciones de leyes (1:1)
Patient.hasOne(LawViolation, {
    foreignKey: 'patients_id'
});

LawViolation.belongsTo(Patient, {
    foreignKey: 'patients_id'
});

//tipos de parametros y parametros  (1:M)
ParameterType.hasMany(Parameter, {
    foreignKey: 'parameter_types_id'
});

Parameter.belongsTo(ParameterType, {
    foreignKey: 'parameter_types_id'
});

//pacientes y parametros (M:M)
sequelize.define('patients_has_parameters', {}, { timestamps: false });

Patient.belongsToMany(Parameter, {
    through: 'patients_has_parameters',
    foreignKey: 'patients_id',
    otherKey: 'parameters_id'
});

Parameter.belongsToMany(Patient, {
    through: 'patients_has_parameters',
    foreignKey: 'parameters_id',
    otherKey: 'patients_id'
});

//Pruebas y procesos (1:M)
PsychologicalTest.hasMany(PsychologicalProcess, {
    foreignKey: 'psychological_tests_id'
});

PsychologicalProcess.belongsTo(PsychologicalTest, {
    foreignKey: 'psychological_tests_id'
});

//Procesos y tareas (1:M)
PsychologicalProcess.hasMany(PsychologicalTask, {
    foreignKey: 'psychological_processes_id'
});

PsychologicalTask.belongsTo(PsychologicalProcess, {
    foreignKey: 'psychological_processes_id'
});

//pacientes y tareas (resultados psicologicos) (M:M)
const PatientPsychologicalTask = sequelize.define('psychological_results', {
    patients_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Patient,
            key: 'id'
        }
    },
    psychological_tasks_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: PsychologicalTask,
            key: 'id'
        }
    },
    score: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
},
{
    createdAt: 'created_at',
    updatedAt: false
});

Patient.belongsToMany(PsychologicalTask, {
    through: 'psychological_results',
    foreignKey: 'patients_id',
    otherKey: 'psychological_tasks_id'
});

PsychologicalTask.belongsToMany(Patient, {
    through: 'psychological_results',
    foreignKey: 'psychological_tasks_id',
    otherKey: 'patients_id'
});

export {
    PatientPsychologicalTask
}