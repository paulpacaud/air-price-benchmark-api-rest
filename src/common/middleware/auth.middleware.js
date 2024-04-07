const UnauthorizedError = require('../errors/unauthorized.error');
const { API_KEYS } = require('../../db.js');
const isAuthenticated = async (req, _, next) => {
    const token = req.headers.authorization.split(' ')[1].trim();

    if (API_KEYS[token]) {
        next();
    } else {
        next(new UnauthorizedError());
    }
};

module.exports = { isAuthenticated };
