import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'postgres'
  }
);

const models = {
  User: sequelize.import('./user'),
  Exercise: sequelize.import('./exercise')
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
