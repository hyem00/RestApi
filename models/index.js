import initModels from './init-models.js'
import { Sequelize } from 'sequelize';
// TODO : 뭐냐 진짜로 !!!!!
import config from "../config/config.json" assert { type: "json" };

const env = process.env.NODE_ENV || 'development';
const { database, username, password } = config[env];

const sequelize = new Sequelize(database, username, password, config);

// 모델과 테이블 간의 관계가 맺어진다.
const models = initModels(sequelize);

export default models;