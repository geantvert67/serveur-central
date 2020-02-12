const db = require('../models')

module.exports = {
    getAll: (req, res, next) => {
        return req.config.getTeams()
            .then(teams => res.json(teams))
            .catch(err => next(err))
    },

    create: (req, res, next) => {
        if (req.body.name && req.body.color) {
            return req.config.createTeam(req.body)
                .then(team => res.json(team))
                .catch(err => next(err))
        }
        throw { status: 406, message: 'Paramètres invalides' };
    }
}