const db = require('../models');

module.exports = {
    create: (req, res, next) => {
        return db.User.findByPk(req.body.UserId, {
            include: [{ model: db.Statistics }]
        })
            .then(user => {
                if (user) {
                    return db.History.create({
                        ...req.body,
                        GameId: req.params.game_id
                    })
                        .then(game => {
                            user.addStatistics(req.game.gameMode, req.body);
                            return res.json(game);
                        })
                        .catch(err => next(err));
                }
                throw {
                    status: 404,
                    message: "Cet utilisateur n'existe pas"
                };
            })
            .catch(err => next(err));
    },

    getByGameId: (req, res, next) => {
        return req.game
            .getHistories({
                include: [
                    { model: db.User, attributes: ['username'] },
                    { model: db.Game, attributes: ['name', 'gameMode'] }
                ]
            })
            .then(histories => res.json(histories))
            .catch(err => next(err));
    }
};
