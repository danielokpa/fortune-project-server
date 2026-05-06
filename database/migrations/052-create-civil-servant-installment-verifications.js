const { QueryInterface, DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('civil_servant_installment_payment_proofs', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      fullName: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      idCard: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      paySlip: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      salary: {
        type: DataTypes.DECIMAL(14, 2),
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      status: {
        type: DataTypes.ENUM('PENDING', 'VERIFIED', 'UNVERIFIED'),
        allowNull: false,
        defaultValue: 'PENDING',
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

    await queryInterface.addIndex(
      'civil_servant_installment_payment_proofs',
      ['userId'],
    );
    await queryInterface.addIndex(
      'civil_servant_installment_payment_proofs',
      ['status'],
    );
  },

  down: async (queryInterface) => {
    await queryInterface.removeIndex(
      'civil_servant_installment_payment_proofs',
      ['userId'],
    );
    await queryInterface.removeIndex(
      'civil_servant_installment_payment_proofs',
      ['status'],
    );
    await queryInterface.dropTable('civil_servant_installment_payment_proofs');
  },
};
