const { QueryInterface, DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('cng_station_favorites', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      stationId: {
        type: DataTypes.UUID,
        references: {
          model: 'cng_stations',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });

    // Add unique constraint to prevent duplicate favorites
    await queryInterface.addIndex('cng_station_favorites', ['stationId', 'userId'], {
      unique: true,
      name: 'unique_user_cng_station_favorite',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('cng_station_favorites');
  },
};

