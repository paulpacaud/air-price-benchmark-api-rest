const pg = require('pg');
const { API_KEYS } = require('../../db.js');
const UnauthorizedError = require("../../common/errors/unauthorized.error");

const DataService = {
    getData: async (token, ond, roundtrip) => {
        const permissions = API_KEYS[token];
        if (!permissions.onds.includes(ond)) {
            throw new UnauthorizedError(); // Make sure to throw the error, not return it
        }

        const config = {
            host: "air-price-benchmark.postgres.database.azure.com",
            user: "equipeB",
            password: "P3^<a=ow&VadMx,RmK*L",
            database: "postgres",
            port: 5432,
            ssl: true
        };

        const client = new pg.Client(config);
        await client.connect();

        try {
            const query = {
                text: `SELECT main_airline, AVG(price_euro) as average_price, advance_purchase
                       FROM search_reco 
                       WHERE ond=$1 AND trip_type=$2 AND main_airline=ANY($3)
                       GROUP BY main_airline, advance_purchase`,
                values: [ond, roundtrip, permissions.airlines]
            };

            const res = await client.query(query);
            let transformedResults = [];

            let tempData = {};

            // Iterate over each row of the results
            res.rows.forEach(row => {
                // Initialize or update the airline object in tempData
                if (!tempData[row.main_airline]) {
                    tempData[row.main_airline] = {
                        main_airline: row.main_airline,
                        advance_purchase_vs_average_price: {}
                    };
                }

                // Assign or update the average price for the given advance purchase
                tempData[row.main_airline].advance_purchase_vs_average_price[row.advance_purchase] = row.average_price;
            });

            // Convert the aggregated data into the desired array format
            for (let airline in tempData) {
                transformedResults.push(tempData[airline]);
            }

            return transformedResults;
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            await client.end();
        }
    },
};

module.exports = DataService;