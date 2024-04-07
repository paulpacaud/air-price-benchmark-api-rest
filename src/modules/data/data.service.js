const pg = require('pg');
const fs = require('fs');
const { API_KEYS } = require('../../db.js');
const UnauthorizedError = require("../../common/errors/unauthorized.error");

const DataService = {
    getData: async (token, ond, origin, destination) => {

        const permissions = API_KEYS[token];
        if (!permissions.onds.includes(ond)) {
            return new UnauthorizedError();
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
            const query = `SELECT main_airline, price_euro
             FROM search_reco 
             WHERE ond='${ond}'`;
            console.log(query);
            const res = await client.query(query);
            return res.rows;
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            await client.end();
        }
    },
};

module.exports = DataService;