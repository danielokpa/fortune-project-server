const { QueryInterface, DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('user_cng_conversions', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      conversionCenter: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'cng_conversion_stations',
          key: 'id',
        },
      },
      fullName: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      contactPhone: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      nin: {
        type: DataTypes.STRING(11),
        allowNull: false,
      },
      vehicleRegisterationNo: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      brandOfVehicle: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      makeOfVehicle: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      yearOfManufacture: {
        type: DataTypes.STRING(4),
        allowNull: false,
      },
      vinNumber: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      registerationExpiryDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      engineCapacity: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      cylinder: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      engineCondition: {
        type: DataTypes.ENUM('EXCELLENT', 'GOOD', 'FAIR', 'POOR'),
        allowNull: false,
      },
      fuelType: {
        type: DataTypes.ENUM('PETROL', 'DIESEL', 'CNG', 'HYBRID', 'ELECTRIC'),
        allowNull: false,
      },
      transmission: {
        type: DataTypes.ENUM('MANUAL', 'AUTOMATIC'),
        allowNull: false,
      },
      mileage: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      usualRoute: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      operatingMotorPark: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      residentialState: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      lga: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      additionalNote: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING(200),
        allowNull: false,
        defaultValue: UserCngConversionStatus.IN_DRAFT,
      },
      hasCompletedRegistration: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      hasCompletedOnlineInspection: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      exteriorInspectionImages: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      interiorInspectionImages: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      engineImages: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      keyAreasImages: {
        type: DataTypes.TEXT,
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

    await queryInterface.addIndex('user_cng_conversions', ['userId']);
    await queryInterface.addIndex('user_cng_conversions', ['email']);
    await queryInterface.addIndex('user_cng_conversions', ['contactPhone']);
    await queryInterface.addIndex('user_cng_conversions', ['nin']);
    await queryInterface.addIndex('user_cng_conversions', ['vehicleRegisterationNo']);
    await queryInterface.addIndex('user_cng_conversions', ['brandOfVehicle']);
    await queryInterface.addIndex('user_cng_conversions', ['color']);
    await queryInterface.addIndex('user_cng_conversions', ['makeOfVehicle']);
    await queryInterface.addIndex('user_cng_conversions', ['yearOfManufacture']);
    await queryInterface.addIndex('user_cng_conversions', ['operatingMotorPark']);
    await queryInterface.addIndex('user_cng_conversions', ['conversionCenter']);

  },
  down: async (queryInterface) => {
    await queryInterface.removeIndex('user_cng_conversions', ['userId']);
    await queryInterface.removeIndex('user_cng_conversions', ['email']);
    await queryInterface.removeIndex('user_cng_conversions', ['contactPhone']);
    await queryInterface.removeIndex('user_cng_conversions', ['nin']);
    await queryInterface.removeIndex('user_cng_conversions', ['vehicleRegisterationNo']);
    await queryInterface.removeIndex('user_cng_conversions', ['brandOfVehicle']);
    await queryInterface.removeIndex('user_cng_conversions', ['color']);
    await queryInterface.removeIndex('user_cng_conversions', ['makeOfVehicle']);
    await queryInterface.removeIndex('user_cng_conversions', ['yearOfManufacture']);
    await queryInterface.removeIndex('user_cng_conversions', ['operatingMotorPark']);
    await queryInterface.removeIndex('user_cng_conversions', ['conversionCenter']);
    await queryInterface.dropTable('user_cng_conversions');
  },
};


