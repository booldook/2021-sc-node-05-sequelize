const fs = require("fs-extra");
const path = require("path");
const Sequelize = require("sequelize"); // sequelize 원본
const basename = path.basename(__filename); // index.js
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

const db = {};
let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname) // ['index.js', 'User.js']
  .filter((file) => {
    // .index.js / !index.js / *.js
    return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model; // db['User'] = model
  });

// ['User', 'Board']
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db); // 관계설정은 영상에서 확인
  }
});

// db => {User}
db.sequelize = sequelize;
db.Sequelize = Sequelize;
// db => { User, sequelize, Sequelize }

module.exports = db;
