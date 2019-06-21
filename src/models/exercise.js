const exercise = (sequelize, DataTypes) => {
  const Exercise = sequelize.define('exercise', {
    name: {
      type: DataTypes.ENUM([
        'bench',
        'overhead_press',
        'squat',
        'deadlift',
        'pull_ups'
      ]),
      validate: {
        notEmpty: {
          args: true,
          msg: 'Exercise name cannot be empty'
        }
      }
    },
    reps: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Reps cannot be empty'
        }
      }
    },
    sets: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Sets cannot be empty'
        }
      }
    },
    weight: {
      type: DataTypes.FLOAT,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Weight cannot be empty'
        }
      }
    }
  });

  Exercise.associate = models => {
    Exercise.belongsTo(models.User);
  };

  return Exercise;
};

export default exercise;
