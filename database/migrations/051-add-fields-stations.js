
const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {

    // Add stationBadge enum
    await queryInterface.addColumn('charging_stations', 'stationBadge', {
      type: DataTypes.ENUM('PEPP_OWNED', 'VERIFIED_PARTNER', 'DISCOVERY_ONLY'),
      allowNull: false,
      defaultValue: 'DISCOVERY_ONLY',
    });

    await queryInterface.addColumn('cng_stations', 'stationBadge', {
        type: DataTypes.ENUM('PEPP_OWNED', 'VERIFIED_PARTNER', 'DISCOVERY_ONLY'),
        allowNull: false,
        defaultValue: 'DISCOVERY_ONLY',
    });

    await queryInterface.addIndex('charging_stations', ['stationBadge']);
    await queryInterface.addIndex('cng_stations', ['stationBadge']);
  },

  down: async (queryInterface) => {
    // Drop index if it exists
    try {
      await queryInterface.removeIndex('charging_stations', ['stationBadge']);
    } catch (e) {}
    await queryInterface.removeColumn('charging_stations', 'stationBadge');
    await queryInterface.removeIndex('cng_stations', ['stationBadge']);
    await queryInterface.removeColumn('cng_stations', 'stationBadge');
  },
};
