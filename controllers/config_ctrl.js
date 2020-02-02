const db = require('../models');

module.exports = {
    getAll: (req, res, next) => {
        return db.Config.scope('public')
            .findAll({
                attributes: { exclude: ['OwnerId'] },
                include: [
                    {
                        model: db.User,
                        as: 'Owner',
                        attributes: ['username']
                    }
                ]
            })
            .then(configs => res.json(configs))
            .catch(err => next(err));
    },

    getByOwner: (req, res, next) => {
        return req.user
            .getConfigs({ attributes: { exclude: ['OwnerId'] } })
            .then(configs => res.json(configs))
            .catch(err => next(err));
    }
};
