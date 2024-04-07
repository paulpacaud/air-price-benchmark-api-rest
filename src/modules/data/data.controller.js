const DataService = require('./data.service');

const DataController = {
    getData: async (req, res) => {
        data = await DataService.getData(
            req.headers.authorization.split(' ')[1],
            req.params.ond,
            req.params.origin,
            req.params.destination);
        res.json({ data });
    },
};

module.exports = DataController;
