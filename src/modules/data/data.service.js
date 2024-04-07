const pg = require('pg');
const fs = require('fs');
const { API_KEYS } = require('../../db.js');
const UnauthorizedError = require("../../common/errors/unauthorized.error");

const DataService = {
    getData: async (token, ond, origin, destination) => {

        const permissions = API_KEYS[token];
        if (!permissions.onds.includes(ond)) {
            throw new UnauthorizedError();
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

        client.connect(err => {
            if (err) throw err;
            else {
                queryDatabase();
            }
        });

        console.log(`Running query to PostgreSQL server: ${config.host}`);

        /*const query = `SELECT main_airline, price_euro
             FROM search_reco 
             WHERE ond='${ond}' AND origin_city='${origin}' AND destination_city='${destination}
             AND main_airline = ANY('{${permissions.airlines}}')`;*/
        const query = `SELECT main_airline, price_euro
             FROM search_reco 
             WHERE ond='${ond}' AND origin_city='${origin}' AND destination_city='${destination}`;

        client.query(query)
            .then(res => {
                return res.rows;
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    },
};

module.exports = DataService;
