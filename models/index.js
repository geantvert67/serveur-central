const fs = require('fs'),
    Sequelize = require('sequelize'),
    NODE_ENV = process.env.NODE_ENV;

const sequelize = new Sequelize(
    NODE_ENV === 'staging' ? process.env.TEST_DB_NAME : process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PWD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: NODE_ENV === 'development' ? console.log : false
    }
);

sequelize
    .authenticate()
    .then(() => {
        console.log('Connecté à la base de données');
    })
    .catch(err => {
        console.error('Impossible de se connecter : ', err);
    });

const db = {};

fs.readdirSync(__dirname)
    .filter(filename => filename !== 'index.js')
    .forEach(filename => {
        const model = sequelize.import('./' + filename);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    try {
        db[modelName].associate(db);
    } catch (e) {}
});

sequelize.sync({ alter: true });

module.exports = db;
