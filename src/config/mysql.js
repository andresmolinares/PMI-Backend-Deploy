import { Sequelize } from 'sequelize';

const database = process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;
const port = process.env.MYSQL_PORT;

const sequelize = new Sequelize(database, username, password, {
    host, dialect: 'mysql', port: port,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: true,        
        }
    }   
});

const dbConnectMySQL = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export { sequelize, dbConnectMySQL };
