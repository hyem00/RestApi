import connector from '../db.js'; 
import postModel from './post.js';

const sequelize = connector.sequelize;

const db = {
  sequelize,
  // Sequelize,
  Post: postModel(sequelize),
};

export default db;