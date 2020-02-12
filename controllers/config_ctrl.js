const db = require('../models');
const {
    basicDetails,
    ownerUsername
} = require('../serializers/config_serializer');

const _this = module.exports = {
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
        if (req.body.name && req.body.gameMode) {
            return req.user
                .createConfig(req.body)
                .then(config => res.json(config))
                .catch(err => next(err));
        }
        throw { status: 406, message: 'Paramètres invalides' };
    },

    loadById: (req, res, next) => {
        return db.Config.findByPk(req.params.config_id, ownerUsername)
            .then(config => {
                if (config) {
                    req.config = config;
                    return next();
                }
                throw {
                    status: 404,
                    message: 'Aucune configuration ne possède cet identifiant'
                };
            })
            .catch(err => next(err));
    },

    configIsPublicOrIsConfigOwner: (req, res, next) => {
        if (req.config.isPrivate) {
            return _this.isConfigOwner(req, res, next);
        }
        return next();
    },

    isConfigOwner: (req, res, next) => {
        return req.config
            .getOwner()
            .then(owner => {
                if (owner.id === req.user.id) {
                    return next();
                }
                throw {
                    status: 401,
                    message: "Vous n'êtes pas autorisé à effectuer cette action"
                };
            })
            .catch(err => next(err));
    },

    getById: (req, res, next) => {
        return res.json(req.config);
    },

    updateById: (req, res, next) => {
        return req.config
            .update(req.body)
            .then(() => res.json(req.config))
            .catch(err => next(err));
    },

    deleteById: (req, res, next) => {
        return req.config
            .destroy()
            .then(() => res.json({ message: 'Configuration supprimée' }))
            .catch(err => next(err));
    },

    getByOwner: (req, res, next) => {
        return req.user
            .getConfigs(basicDetails)
            .then(configs => res.json(configs))
            .catch(err => next(err));
    }
};
