const db = require('../models');

const basicDetails = {
    attributes: ['id', 'name', 'gameMode', 'isPrivate', 'createdAt']
};

const ownerUsername = {
    include: [
        {
            model: db.User,
            as: 'Owner',
            attributes: ['username']
        }
    ]
};

module.exports = {
    basicDetails,
    ownerUsername
};