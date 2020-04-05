const db = require('../models');

module.exports = {
    getPending: (req, res, next) => {
        return db.Game.findAll({ where: { published: true, launched: false } })
            .then(games => res.json(games))
            .catch(err => next(err));
    },

    create: (req, res, next) => {
        const ip = req.body.ip,
            port = req.body.port,
            name = req.body.name,
            gameMode = req.body.gameMode,
            AdminId = req.body.AdminId;

        if (ip && port && name && gameMode && AdminId) {
            return db.User.findByPk(AdminId)
                .then(user => {
                    if (user) {
                        return user
                            .createGame({ ip, port, name, gameMode })
                            .then(game => res.json(game))
                            .catch(err => next(err));
                    }
                    throw {
                        status: 404,
                        message: 'Aucun utilisateur ne possède cet identifiant'
                    };
                })
                .catch(err => next(err));
        }
        throw { status: 406, message: 'Paramètres invalides' };
    },

    loadById: (req, res, next) => {
        return db.Game.findByPk(req.params.game_id)
            .then(game => {
                if (game) {
                    req.game = game;
                    return next();
                }
                throw {
                    status: 404,
                    message: "Cette partie n'existe pas"
                };
            })
            .catch(err => next(err));
    },

    updateById: (req, res, next) => {
        return req.game
            .update(req.body)
            .then(res.json(req.game))
            .catch(err => next(err));
    },

    deleteById: (req, res, next) => {
        return req.game
            .destroy()
            .then(() => res.json({ message: 'Partie supprimée' }))
            .catch(err => next(err));
    }
};
