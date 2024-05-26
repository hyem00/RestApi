import { DataTypes } from 'sequelize';
import initPost from './post';

function initModels(sequelize) {
  const post = initPost(sequelize, DataTypes);

  return { post };
}

export default initModels;
export { initModels };