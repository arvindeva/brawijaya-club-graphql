const exercise = (sequelize, DataTypes) => {
  const Exercise = sequelize.define('exercise', {
    type: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'A Exercise cannot be empty'
        }
      }
    },
    reps: {
      type: DataTypes.INTEGER
    },
    sets: {
      type: DataTypes.INTEGER
    },
    weight: {
      type: DataTypes.FLOAT
    }
  });

  Exercise.associate = models => {
    Exercise.belongsTo(models.User);
  };

  return Exercise;
};

export default exercise;
