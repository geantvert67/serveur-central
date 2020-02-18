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
    }
};
