const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING
    }
  });

  User.associate = models => {
    User.hasMany(models.Message, { onDelete: 'CASCADDE' });
  };

  return User;
};

module.exports = user;
