const { QueryInterface, DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.renameTable('referred_users', 'referal_users');

    await queryInterface.removeColumn('referal_users', 'completedRides');
    await queryInterface.removeColumn('referal_users', 'hasRewarded');

    await queryInterface.addColumn('referal_users', 'hasCompletedFirstTrip', {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });

    await queryInterface.addIndex('referal_users', ['hasCompletedFirstTrip']);
  },

  down: async (queryInterface) => {
    await queryInterface.removeIndex('referal_users', ['hasCompletedFirstTrip']);
    await queryInterface.removeColumn('referal_users', 'hasCompletedFirstTrip');

    await queryInterface.addColumn('referal_users', 'completedRides', {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });
    await queryInterface.addColumn('referal_users', 'hasRewarded', {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });

    await queryInterface.renameTable('referal_users', 'referred_users');
  },
};
