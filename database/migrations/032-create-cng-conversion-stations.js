const { QueryInterface, DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('cng_conversion_stations', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      contactPhone: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      openingTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      closingTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      amountPerUnit: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: 'NGN',
      },
      amountPerUnitType: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: 'kwh',
      },
      contactEmail: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      longitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: true,
      },
      latitude: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      stationImage: {
        type: DataTypes.STRING(500),
        allowNull: true,
        defaultValue: 'default.png',
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    });

    await queryInterface.addIndex('cng_conversion_stations', ['name']);
    await queryInterface.addIndex('cng_conversion_stations', ['id']);
    await queryInterface.addIndex('cng_conversion_stations', ['state']);
    await queryInterface.addIndex('cng_conversion_stations', ['country']);
    await queryInterface.addIndex('cng_conversion_stations', ['address']);
    await queryInterface.addIndex('cng_conversion_stations', ['contactPhone']);
    await queryInterface.addIndex('cng_conversion_stations', ['openingTime']);
    await queryInterface.addIndex('cng_conversion_stations', ['closingTime']);
    await queryInterface.addIndex('cng_conversion_stations', ['contactEmail']);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('cng_conversion_stations');
    await queryInterface.removeIndex('cng_conversion_stations', ['name']);
    await queryInterface.removeIndex('cng_conversion_stations', ['id']);
    await queryInterface.removeIndex('cng_conversion_stations', ['state']);
    await queryInterface.removeIndex('cng_conversion_stations', ['country']);
    await queryInterface.removeIndex('cng_conversion_stations', ['address']);
    await queryInterface.removeIndex('cng_conversion_stations', ['contactPhone']);
    await queryInterface.removeIndex('cng_conversion_stations', ['openingTime']);
    await queryInterface.removeIndex('cng_conversion_stations', ['closingTime']);
    await queryInterface.removeIndex('cng_conversion_stations', ['contactEmail']);
  },
};


