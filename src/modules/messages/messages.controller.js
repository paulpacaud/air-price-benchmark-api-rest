const MessagesService = require('./messages.service');

const MessagesController = {
    create: async (req, res) => {
        const messageIdx = await MessagesService.create(req.params.message);
        await res.json({ code: messageIdx });
    },

    findOne: async (req, res) => {
        const { code, message }  = await MessagesService.findOne(req.params.id);
        return res.json({ code: code, msg: message});
    },

    findAll: async (req, res) => {
        const messages = await MessagesService.findAll();
        return res.json({ msgs: messages });
    },

    count: async (req, res) => {
        const number = (await MessagesService.findAll()).length;
        return res.json({ nber: number });
    },

    delete: async (req, res) => {
        await MessagesService.delete(req.params.id);
        res.status(204).send();
    },
};

module.exports = MessagesController;
