const db = require('../models');
const { basicDetails, ownerUsername } = require('../serializers/config');

module.exports = {
    getAll: (req, res, next) => {
        return db.Config.scope('public')
            .findAll({
                ...basicDetails,
                ...ownerUsername
            })
            .then(configs => res.json(configs))
            .catch(err => next(err));
    },

    create: (req, res, next) => {
        const name = req.body.name,
            isPrivate = req.body.isPrivate,
            maxPlayers = req.body.maxPlayers,
            gameMode = req.body.gameMode,
            duration = req.body.duration,
            inventorySize = req.body.inventorySize;

        if (name && gameMode) {
            return req.user
                .createConfig({
                    name,
                    isPrivate,
                    maxPlayers,
                    gameMode,
                    duration,
                    inventorySize
                })
                .then(config => res.json(config))
                .catch(err => next(err));
        }
        throw { status: 406, message: 'Paramètres invalides' };
    },

    getByOwner: (req, res, next) => {
        return req.user
            .getConfigs(basicDetails)
            .then(configs => res.json(configs))
            .catch(err => next(err));
    }
};
