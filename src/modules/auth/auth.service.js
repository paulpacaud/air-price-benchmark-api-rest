const { API_KEYS } = require('../../db.js');
const NotFoundError = require("../../common/errors/not-found.error");

const AuthService = {
    getPermissions: async (key) => {
        if (API_KEYS[key]) {
            return API_KEYS[key];
        } else {
            throw new NotFoundError();
        }
    },
};

module.exports = AuthService;
