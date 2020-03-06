const db = require('../models');

module.exports = {
    getAll: (req, res, next) => {
        return req.config
            .getTeams()
            .then(teams => res.json(teams))
            .catch(err => next(err));
    },

    create: (req, res, next) => {
        if (req.body.name && req.body.color) {
            return req.config
                .createTeam(req.body)
                .then(team => res.json(team))
                .catch(err => next(err));
        }
        throw { status: 406, message: 'Paramètres invalides' };
    },

    loadById: (req, res, next) => {
        return db.Team.findOne({
            where: { id: req.params.team_id, ConfigId: req.params.config_id }
        })
            .then(team => {
                if (team) {
                    req.team = team;
                    return next();
                }
                throw {
                    status: 404,
                    message: "Cette équipe n'existe pas"
                };
            })
            .catch(err => next(err));
    },

    updateById: (req, res, next) => {
        req.team
            .update(req.body)
            .then(team => res.json(team))
            .catch(err => next(err));
    },

    deleteById: (req, res, next) => {
        return req.team
            .destroy()
            .then(() => res.json({ message: 'Équipe supprimée' }))
            .catch(err => next(err));
    },

    getPlayers: (req, res, next) => {
        return req.team
            .getUsers({
                attributes: ['id', 'username'],
                joinTableAttributes: []
            })
            .then(players => res.json(players))
            .catch(err => next(err));
    },

    addPlayer: (req, res, next) => {
        return req.team
            .countUsers()
            .then(nbUsers => {
                const maxPlayers = req.config.maxPlayers;
                if (nbUsers < maxPlayers || maxPlayers === null) {
                    return db.User.findOne({
                        where: { username: req.body.username }
                    })
                        .then(user => {
                            if (user) {
                                return req.team
                                    .hasUser(user)
                                    .then(hasUser => {
                                        if (!hasUser) {
                                            return req.team
                                                .addUser(user)
                                                .then(() => res.json(user))
                                                .catch(err => next(err));
                                        }
                                        throw {
                                            status: 409,
                                            message:
                                                'Cet utilisateur est déjà dans cette équipe'
                                        };
                                    })
                                    .catch(err => next(err));
                            }
                            throw {
                                status: 404,
                                message: "Cet utilisateur n'existe pas"
                            };
                        })
                        .catch(err => next(err));
                }
                throw {
                    status: 400,
                    message: 'Cette équipe est pleine'
                };
            })
            .catch(err => next(err));
    },

    removePlayer: (req, res, next) => {
        return db.User.findByPk(req.params.user_id)
            .then(user => {
                if (user) {
                    return req.team
                        .removeUser(user)
                        .then(() => res.json({ message: 'Membre retiré' }))
                        .catch(err => next(err));
                }
                throw { status: 404, message: "Cet utilisateur n'existe pas" };
            })
            .catch(err => next(err));
    }
};
