//possibilita a conexão com o banco de dados e também a manipulação dos dados
const dbConfig = require("../database/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sale = require("./sale.model")(sequelize, Sequelize);
db.modality = require("./modality.model")(sequelize, Sequelize);
db.store = require("./store.model")(sequelize, Sequelize);


module.exports = db;