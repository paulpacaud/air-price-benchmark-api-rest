const AuthService = require('./auth.service');

const AuthController = {
    getPermissions: async (req, res, next) => { // Add `next` to the parameters
        try {
            const permissions = await AuthService.getPermissions(req.params.key);
            res.json({ airlines: permissions.airlines, onds: permissions.onds });
        } catch (error) {
            next(error); // Pass any caught errors to Express's error handling middleware
        }
    },
};

module.exports = AuthController;
