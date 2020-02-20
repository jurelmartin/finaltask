
module.exports = {
  name: 'ClientModel',
  datasource: 'db',
  definition: function(datasource, DataTypes) {
    const ClientModel = datasource.define('ClientModel', {
      id : {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      }, 
      name : {
        type: DataTypes.STRING,
        allowNull: false
      },
      secret : {
        type: DataTypes.STRING,
        allowNull: false
      },
      userId : {
        type: DataTypes.STRING,
        allowNull: false
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
  