const { QueryInterface } = require('sequelize');
const { randomUUID } = require('crypto');

module.exports = {
  up: async (queryInterface) => {
    // Note: Migration uses STRING fields for country and state, not UUID foreign keys
    // So we'll use the country name "Nigeria" and state names as strings

    // Map user's state names to database state names
    const stateNameMap = {
      'FCT Abuja': 'FCT',
      'Lagos': 'Lagos',
      'Kaduna': 'Kaduna',
      'Benue': 'Benue'
    };

    // EV Charging Stations data
    const stations = [
      {
        name: "Charging Hub (Possible EVS)",
        country: "Nigeria",
        state: "FCT Abuja",
        address: "7 Hombori St, Adetokunbo Ademola Crescent, Abuja",
        latitude: 9.0765,
        longitude: 7.4913
      },
      {
        name: "ECN Hybrid EV Charging Station",
        country: "Nigeria",
        state: "FCT Abuja",
        address: "Energy Commission of Nigeria HQ, Abuja",
        latitude: 9.0616,
        longitude: 7.4869
      },
      {
        name: "Lake Mall EV Charging Station",
        country: "Nigeria",
        state: "FCT Abuja",
        address: "Lake Mall, Jabi, Abuja",
        latitude: 9.0621,
        longitude: 7.4680
      },
      {
        name: "CASS EV Charging Station",
        country: "Nigeria",
        state: "FCT Abuja",
        address: "Wuse District, Abuja",
        latitude: 9.0726,
        longitude: 7.4879
      },
      {
        name: "Spiro Battery Swap Station – Kubwa",
        country: "Nigeria",
        state: "FCT Abuja",
        address: "Kubwa, Abuja",
        latitude: 9.1630,
        longitude: 7.3763
      },
      {
        name: "Spiro Battery Swap Station – Jabi",
        country: "Nigeria",
        state: "FCT Abuja",
        address: "Jabi District, Abuja",
        latitude: 9.0670,
        longitude: 7.5040
      },
      {
        name: "Spiro Battery Swap Station – Gwarinpa",
        country: "Nigeria",
        state: "FCT Abuja",
        address: "Gwarinpa, Abuja",
        latitude: 9.0524,
        longitude: 7.3789
      },
      {
        name: "SAGLEV EV Charging – Mega Plaza",
        country: "Nigeria",
        state: "Lagos",
        address: "Mega Plaza Shopping Mall, Victoria Island, Lagos",
        latitude: 6.4270,
        longitude: 3.4275
      },
      {
        name: "Siltech E-Box EV Charging Station",
        country: "Nigeria",
        state: "Lagos",
        address: "Surulere, Lagos",
        latitude: 6.5091,
        longitude: 3.3792
      },
      {
        name: "NADDC EV Charging Station",
        country: "Nigeria",
        state: "Lagos",
        address: "NADDC Facility, Lagos",
        latitude: 6.4559,
        longitude: 3.3970
      },
      {
        name: "University of Lagos Solar EV Charger",
        country: "Nigeria",
        state: "Lagos",
        address: "University of Lagos (UNILAG), Akoka, Lagos",
        latitude: 6.5127,
        longitude: 3.3859
      },
      {
        name: "Sterling Bank EV Charging Station",
        country: "Nigeria",
        state: "Lagos",
        address: "Sterling Bank Facility, Lagos",
        latitude: null,
        longitude: null
      },
      {
        name: "Qoray – Marina Road EV Charging",
        country: "Nigeria",
        state: "Lagos",
        address: "20 Marina Road, Lagos",
        latitude: 6.4531,
        longitude: 3.3995
      },
      {
        name: "Qoray – Adeola Odeku EV Charging",
        country: "Nigeria",
        state: "Lagos",
        address: "300 Adeola Odeku, Victoria Island, Lagos",
        latitude: 6.4295,
        longitude: 3.4285
      },
      {
        name: "Qoray – Sheraton Hotel EV Charging",
        country: "Nigeria",
        state: "Lagos",
        address: "30 Mobolaji Bank Anthony Way, Ikeja, Lagos",
        latitude: 6.5965,
        longitude: 3.3416
      },
      {
        name: "Virta EV Charging Station",
        country: "Nigeria",
        state: "Kaduna",
        address: "Kaduna City, Kaduna State",
        latitude: 10.5105,
        longitude: 7.4165
      },
      {
        name: "Makurdi EV Charging Station",
        country: "Nigeria",
        state: "Benue",
        address: "Makurdi, Benue State",
        latitude: 7.7300,
        longitude: 8.5200
      }
    ];

    const stationsToInsert = [];
    const now = new Date();

    for (const station of stations) {
      // Check if station already exists
      const existingStation = await queryInterface.sequelize.query(
        `SELECT id FROM charging_stations WHERE name = ? LIMIT 1`,
        {
          replacements: [station.name],
          type: queryInterface.sequelize.QueryTypes.SELECT
        }
      );

      if (existingStation && existingStation.length > 0) {
        console.log(`ℹ️  Station "${station.name}" already exists, skipping`);
        continue;
      }

      // Map state name to database state name
      const dbStateName = stateNameMap[station.state] || station.state;

      // Generate contact details based on station name
      const contactEmail = `info@${station.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;
      const contactPhone = '+2348100000000'; // Default Nigerian phone number

      stationsToInsert.push({
        id: randomUUID(),
        name: station.name,
        country: 'Nigeria', // Use country name as string (default provided)
        state: dbStateName, // Use state name as string (FCT, Lagos, Kaduna, Benue)
        address: station.address,
        contactPhone: contactPhone,
        contactEmail: contactEmail,
        openingTime: '06:00:00', // Default opening time 6 AM
        closingTime: '22:00:00', // Default closing time 10 PM
        amountPerUnit: 50.00, // Default 50 NGN per kWh
        currency: 'NGN', // Nigerian Naira
        amountPerUnitType: 'kwh',
        rating: 0,
        reviews: 0,
        isActive: true,
        latitude: station.latitude,
        longitude: station.longitude,
        createdAt: now,
        updatedAt: now
      });
    }

    if (stationsToInsert.length > 0) {
      try {
        // Insert in batches to avoid issues
        const batchSize = 10;
        let inserted = 0;

        for (let i = 0; i < stationsToInsert.length; i += batchSize) {
          const batch = stationsToInsert.slice(i, i + batchSize);
          await queryInterface.bulkInsert('charging_stations', batch);
          inserted += batch.length;
          console.log(`✅ Inserted batch: ${inserted}/${stationsToInsert.length} charging stations`);
        }

        console.log(`✅ Successfully inserted ${stationsToInsert.length} EV charging stations for Nigeria`);
      } catch (error) {
        console.error('❌ Error inserting charging stations:', error);
        throw error;
      }
    } else {
      console.log('ℹ️  All charging stations already exist, skipping insertion');
    }
  },

  down: async (queryInterface) => {
    // Delete only the stations we seeded (by name pattern or all)
    await queryInterface.sequelize.query(
      `DELETE FROM charging_stations WHERE name IN (
        'Charging Hub (Possible EVS)',
        'ECN Hybrid EV Charging Station',
        'Lake Mall EV Charging Station',
        'CASS EV Charging Station',
        'Spiro Battery Swap Station – Kubwa',
        'Spiro Battery Swap Station – Jabi',
        'Spiro Battery Swap Station – Gwarinpa',
        'SAGLEV EV Charging – Mega Plaza',
        'Siltech E-Box EV Charging Station',
        'NADDC EV Charging Station',
        'University of Lagos Solar EV Charger',
        'Sterling Bank EV Charging Station',
        'Qoray – Marina Road EV Charging',
        'Qoray – Adeola Odeku EV Charging',
        'Qoray – Sheraton Hotel EV Charging',
        'Virta EV Charging Station',
        'Makurdi EV Charging Station'
      )`
    );
    console.log('✅ Deleted seeded EV charging stations');
  },
};

