const { allMsgs } = require('../../db.js');

const MessagesService = {
    create: async (message) => {
        allMsgs.push(message);
        return allMsgs.length - 1
    },

    findOne: async (id) => {
        const parsedId = parseInt(id, 10);
        if (parsedId >= 0 && parsedId < allMsgs.length) {
            return { code: 1, message: allMsgs[parsedId] };
        } else {
            return { code: 0, message: "Not found" };
        }
    },

    findAll: async () => {
        return allMsgs;
    },

    delete: async (id) => {
        const parsedId = parseInt(id, 10);
        if (parsedId >= 0 && parsedId < allMsgs.length) {
            allMsgs.splice(parsedId, 1);
            return { code: 1 };
        } else {
            return { code: 0 };
        }
    },
};

module.exports = MessagesService;
