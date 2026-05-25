const { QueryInterface, DataTypes } = require('sequelize');

/** Minimum length for OCPP WebSocket station slugs (alphanumeric). */
const MIN_SLUG_LENGTH = 16;

/**
 * Deterministic slugs for seeded station names (006-charging-stations-data.js).
 * Each slug is unique and at least {@link MIN_SLUG_LENGTH} alphanumeric characters.
 */
const SEEDED_STATION_SLUGS_BY_NAME = {
  'Charging Hub (Possible EVS)': 'CPABUJA000000001',
  'ECN Hybrid EV Charging Station': 'CPABUJA000000002',
  'Lake Mall EV Charging Station': 'CPABUJA000000003',
  'CASS EV Charging Station': 'CPABUJA000000004',
  'Spiro Battery Swap Station – Kubwa': 'CPABUJA000000005',
  'Spiro Battery Swap Station – Jabi': 'CPABUJA000000006',
  'Spiro Battery Swap Station – Gwarinpa': 'CPABUJA000000007',
  'SAGLEV EV Charging – Mega Plaza': 'CPLAGOS000000001',
  'Siltech E-Box EV Charging Station': 'CPLAGOS000000002',
  'NADDC EV Charging Station': 'CPLAGOS000000003',
  'University of Lagos Solar EV Charger': 'CPLAGOS000000004',
  'Sterling Bank EV Charging Station': 'CPLAGOS000000005',
  'Qoray – Marina Road EV Charging': 'CPLAGOS000000006',
  'Qoray – Adeola Odeku EV Charging': 'CPLAGOS000000007',
  'Qoray – Sheraton Hotel EV Charging': 'CPLAGOS000000008',
  'Virta EV Charging Station': 'CPKADUNA00000001',
  'Makurdi EV Charging Station': 'CPBENUE000000001',
};

/** ppay DataSeeder station id */
const PAY_SEED_STATION_ID = 'f76693ef-4e18-494b-b530-1184c514eef5';
const PAY_SEED_STATION_SLUG = 'CPSEEDF76693EF4E18';

function slugFromId(id) {
  const hex = String(id).replace(/-/g, '').toUpperCase();
  const suffix = hex.slice(0, MIN_SLUG_LENGTH - 2);
  return `CP${suffix}`.slice(0, 64);
}

function isValidSlug(slug) {
  return typeof slug === 'string' && /^[A-Za-z0-9]{16,64}$/.test(slug);
}

module.exports = {
  up: async (queryInterface) => {
    const table = await queryInterface.describeTable('charging_stations');
    if (!table.stationSlug) {
      await queryInterface.addColumn('charging_stations', 'stationSlug', {
        type: DataTypes.STRING(64),
        allowNull: true,
      });
    }

    const [rows] = await queryInterface.sequelize.query(
      'SELECT id, name, stationSlug FROM charging_stations WHERE deletedAt IS NULL',
    );

    const used = new Set(
      rows.map((r) => r.stationSlug).filter((s) => s && isValidSlug(s)),
    );

    let fallbackIndex = 1;
    for (const row of rows) {
      if (row.stationSlug && isValidSlug(row.stationSlug)) {
        continue;
      }

      let slug =
        SEEDED_STATION_SLUGS_BY_NAME[row.name] ||
        (row.id === PAY_SEED_STATION_ID ? PAY_SEED_STATION_SLUG : null) ||
        slugFromId(row.id);

      while (used.has(slug)) {
        slug = `CPSTATION${String(fallbackIndex++).padStart(9, '0')}`;
      }
      used.add(slug);

      await queryInterface.sequelize.query(
        'UPDATE charging_stations SET stationSlug = ? WHERE id = ?',
        { replacements: [slug, row.id] },
      );
    }

    await queryInterface.changeColumn('charging_stations', 'stationSlug', {
      type: DataTypes.STRING(64),
      allowNull: false,
    });

    await queryInterface.addIndex('charging_stations', ['stationSlug'], {
      name: 'uq_charging_stations_station_slug',
      unique: true,
    });
  },

  down: async (queryInterface) => {
    try {
      await queryInterface.removeIndex(
        'charging_stations',
        'uq_charging_stations_station_slug',
      );
    } catch (_) {
      /* index may not exist */
    }
    await queryInterface.removeColumn('charging_stations', 'stationSlug');
  },
};
