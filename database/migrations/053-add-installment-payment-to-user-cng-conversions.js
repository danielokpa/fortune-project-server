const { QueryInterface, DataTypes } = require('sequelize');

const TABLE = 'user_cng_conversions';
const COLUMN = 'installmentPayment';
const CONSTRAINT = 'chk_user_cng_installment_payment';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn(TABLE, COLUMN, {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment:
        'Number of installment payments (1–3) toward the expected amount; NULL if unset',
    });

    await queryInterface.sequelize.query(`
      ALTER TABLE \`${TABLE}\`
      ADD CONSTRAINT \`${CONSTRAINT}\`
      CHECK (\`${COLUMN}\` IS NULL OR (\`${COLUMN}\` >= 1 AND \`${COLUMN}\` <= 3))
    `);
  },

  down: async (queryInterface) => {
    await queryInterface.removeConstraint(TABLE, CONSTRAINT);
    await queryInterface.removeColumn(TABLE, COLUMN);
  },
};
