const { QueryInterface, DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('user_cng_stations', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      cngStationId: {
        type: DataTypes.UUID,
        references: {
          model: 'cng_stations',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      isFavorite: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      longitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: true,
      },
      latitude: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: true,
      },
      distance: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: true,
      },
      selfTripStatus: {
        type: DataTypes.ENUM('START_TRIP', 'ONGOING_TRIP', 'CANCEL', 'END_TRIP'),
        allowNull: true,
      },
      userType: {
        type: DataTypes.ENUM('SUPER_ADMIN', 'PEPP_ADMIN', 'PEPP_MANAGER', 'USER', 'DRIVER'),
        allowNull: true,
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
    await queryInterface.dropTable('user_cng_stations');
  },
};

