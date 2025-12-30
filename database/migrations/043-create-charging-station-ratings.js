const { QueryInterface, DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('charging_station_ratings', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      stationId: {
        type: DataTypes.UUID,
        references: {
          model: 'charging_stations',
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
      rating: {
        type: DataTypes.DECIMAL(3, 2),
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

    // Add unique constraint to prevent duplicate ratings from same user
    await queryInterface.addIndex('charging_station_ratings', ['stationId', 'userId'], {
      unique: true,
      name: 'unique_user_station_rating',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('charging_station_ratings');
  },
};

