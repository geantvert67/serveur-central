const db = require('../models'),
    { ownerUsername } = require('../serializers/config_serializer');

module.exports = {
    getAll: (req, res, next) => {
        return db.Game.findAll({
            include: [
                {
                    model: db.Config,
                    ...ownerUsername
                }
            ]
        })
            .then(games => res.json(games))
            .catch(err => next(err));
    },

    create: (req, res, next) => {
        const ip = req.body.ip,
            port = req.body.port,
            configId = req.body.configId;

        if (ip && port && configId) {
            return db.Config.findByPk(configId)
                .then(config => {
                    if (config) {
                        return config
                            .createGame({ ip, port })
                            .then(game => res.json(game))
                            .catch(err => next(err));
                    }
                    throw {
                        status: 404,
                        message:
                            'Aucune configuration ne possède cet identifiant'
                    };
                })
                .catch(err => next(err));
        }
        throw { status: 406, message: 'Paramètres invalides' };
    },

    deleteById: (req, res, next) => {
        return db.Game.findByPk(req.params.game_id)
            .then(game => {
                if (game) {
                    return game
                        .destroy()
                        .then(() => res.json({ message: 'Partie supprimée' }))
                        .catch(err => next(err));
                }
                throw {
                    status: 404,
                    message: "Cette partie n'existe pas"
                };
            })
            .catch(err => next(err));
    }
};
