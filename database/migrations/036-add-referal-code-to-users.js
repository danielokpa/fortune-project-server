const { QueryInterface, DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn('users', 'referalCode', {
      type: DataTypes.STRING(10),
      allowNull: true,
      unique: true,
    });

    // Add index for better query performance
    await queryInterface.addIndex('users', ['referalCode'], {
      unique: true,
      name: 'users_referal_code_unique',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeIndex('users', 'users_referal_code_unique');
    await queryInterface.removeColumn('users', 'referalCode');
  },
};

