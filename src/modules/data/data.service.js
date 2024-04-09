const pg = require('pg');
const { API_KEYS } = require('../../db.js');
const UnauthorizedError = require("../../common/errors/unauthorized.error");

const DataService = {
    getData: async (token, ond, roundtrip) => {
        const permissions = API_KEYS[token];
        if (!permissions.onds.includes(ond) && !(token === 'admin')) {
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
            let query = {
                text: `SELECT main_airline, AVG(price_euro) as average_price, advance_purchase, passengers_string
                       FROM search_reco 
                       WHERE ond=$1 AND trip_type=$2
                       ${token !== 'admin' ? 'AND main_airline=ANY($3)' : ''}
                       GROUP BY main_airline, advance_purchase, passengers_string`,
                values: token !== 'admin' ? [ond, roundtrip, permissions.airlines] : [ond, roundtrip],
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

                // the column passengers_string has string values like "TIM:2,TIN:2,TIF:1"
                // we need to extract the number of passengers for each type and sum them to get the number of passagers in the ticket
                // so that we then can calculate the average price per passenger
                let passengers = row.passengers_string.split(',').reduce((acc, curr) => {
                    let [type, count] = curr.split(':');
                    return acc + parseInt(count);
                }, 0);

                // Assign or update the average price for the given advance purchase
                tempData[row.main_airline].advance_purchase_vs_average_price[row.advance_purchase] = row.average_price/passengers;
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