import { sequelize, Sequelize } from './sequelize';

const Product = sequelize.define('products', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
  price: Sequelize.INTEGER,
  category: Sequelize.TEXT,
  image: Sequelize.TEXT,
  color: Sequelize.TEXT,
  rating: Sequelize.INTEGER,
});

export default Product;
