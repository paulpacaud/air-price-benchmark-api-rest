const DataService = require('./data.service');

const DataController = {
    getData: async (req, res, next) => {
        try {
            const result = await DataService.getData(
                req.headers.authorization.split(' ')[1],
                req.params.ond,
                req.params.roundtrip);
            res.json({ result });
        } catch (error) {
            next(error);
        }
    },
};

module.exports = DataController;
