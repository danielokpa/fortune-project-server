const { QueryInterface, DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('charging_stations', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      state: {
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
      stationImage: {
        type: DataTypes.STRING(500),
        allowNull: true,
        defaultValue: 'default.png',
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
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
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('charging_stations');
  },
};


