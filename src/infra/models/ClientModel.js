
module.exports = {
  name: 'ClientModel',
  datasource: 'db',
  definition: function(datasource, DataTypes) {
    const ClientModel = datasource.define('ClientModel', {
      id : {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      }, 
      name : {
        type: DataTypes.STRING
      },
      secret : {
        type: DataTypes.STRING
      },
      userId : {
        type: DataTypes.STRING
      },
    }, {
      tableName: 'clients',
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

    return ClientModel;
  }
};
  