const { QueryInterface, DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn('cng_stations', 'rating', {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });

    await queryInterface.addColumn('cng_stations', 'reviews', {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('cng_stations', 'rating');
    await queryInterface.removeColumn('cng_stations', 'reviews');
  },
};

