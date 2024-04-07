const AuthService = require('./auth.service');

const AuthController = {
    getPermissions: async (req, res) => {
        permissions = await AuthService.getPermissions(req.params.key);
        res.json({ permissions });
    },
};

module.exports = AuthController;
