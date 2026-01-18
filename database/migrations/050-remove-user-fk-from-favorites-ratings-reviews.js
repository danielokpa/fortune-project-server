const { QueryInterface } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    const tables = [
      'charging_station_favorites',
      'charging_station_ratings',
      'charging_station_reviews',
      'cng_station_favorites',
      'cng_station_ratings',
      'cng_station_reviews',
    ];

    for (const tableName of tables) {
      try {
        // Query to find foreign key constraints on userId column
        const [results] = await queryInterface.sequelize.query(`
          SELECT CONSTRAINT_NAME
          FROM information_schema.KEY_COLUMN_USAGE
          WHERE TABLE_SCHEMA = DATABASE()
            AND TABLE_NAME = '${tableName}'
            AND COLUMN_NAME = 'userId'
            AND REFERENCED_TABLE_NAME IS NOT NULL
        `);

        // Remove each foreign key constraint found
        for (const row of results) {
          const constraintName = row.CONSTRAINT_NAME;
          try {
            await queryInterface.removeConstraint(tableName, constraintName);
            console.log(`Removed constraint ${constraintName} from ${tableName}`);
          } catch (error) {
            console.log(
              `Could not remove constraint ${constraintName} from ${tableName}:`,
              error.message,
            );
          }
        }
      } catch (error) {
        console.log(`Error processing ${tableName}:`, error.message);
      }
    }
  },

  down: async (queryInterface) => {
    // Re-add foreign key constraints if needed to rollback
    // Note: This would require knowing the exact constraint definitions
    // For now, we'll leave this empty as rollback is not typically needed
  },
};
