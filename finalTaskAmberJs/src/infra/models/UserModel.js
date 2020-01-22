const { hashPassword } = require('../encryption/hashPassword');


module.exports = {
  name: 'UserModel',
  datasource: 'db',
  definition: function(datasource, DataTypes) {
    const UserModel = datasource.define('UserModel', {
      id : {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      }, 
      email : {
        type: DataTypes.STRING
      },
      password : {
        type: DataTypes.STRING
      },
      role: {
        type: DataTypes.STRING
      },
      firstName : {
        type: DataTypes.STRING
      },
      lastName : {
        type: DataTypes.STRING
      },
      middleName : {
        type: DataTypes.STRING
      },
    }, {
      hooks: {
        beforeCreate: user => {
          user.password = hashPassword(user.password)
        }
      },
      tableName: 'users',
      timestamps: true
    });

    /**
     * Examples on how to associate or set relationship with other models
     * 
     *  UserModel.associate = function () {
     *   UserModel.belongsTo(datasource.models.GroupModel, {
     *     foreignKey: 'groupId',
     *     as: 'group',
     *   });
     *  };
     * 
     * refer to sequelize documentation https://sequelize.org/master/manual/associations.html
     */

    return UserModel;
  }
};
  