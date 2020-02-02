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

    create: (req, res, next) => {
        const name = req.body.name,
            isPrivate = req.body.isPrivate;

        if (name) {
            return req.user
                .createConfig({ name, isPrivate })
                .then(config => res.json(config))
                .catch(err => next(err));
        }
        throw { status: 406, message: 'Paramètres invalides' };
    },

    getByOwner: (req, res, next) => {
        return req.user
            .getConfigs({ attributes: { exclude: ['OwnerId'] } })
            .then(configs => res.json(configs))
            .catch(err => next(err));
    }
};
