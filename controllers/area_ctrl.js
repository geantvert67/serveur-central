const db = require('../models');

const _create = (req, res, next) => {
    return req.config
        .createArea({
            position: {
                type: 'Polygon',
                coordinates: [req.body.coordinates]
            },
            forbidden: req.body.forbidden
        })
        .then(area => res.json(area))
        .catch(err => next(err));
};

module.exports = {
    getAll: (req, res, next) => {
        return req.config
            .getAreas()
            .then(areas => res.json(areas))
            .catch(err => next(err));
    },

    create: (req, res, next) => {
        const coordinates = req.body.coordinates,
            forbidden = req.body.forbidden;

        if (coordinates && forbidden !== null) {
            if (!forbidden) {
                return db.Area.gameZoneIsUnique(req.config.id)
                    .then(isUnique => {
                        if (isUnique) {
                            return _create(req, res, next);
                        }
                        throw {
                            status: 409,
                            message: 'Une zone de jeu a déjà été créée'
                        };
                    })
                    .catch(err => next(err));
            }
            return _create(req, res, next);
        }
        throw { status: 406, message: 'Paramètres invalides' };
    },

    deleteAll: (req, res, next) => {
        return db.Area.destroy({ where: { ConfigId: req.params.config_id } })
            .then(() => res.json({ message: 'Zones supprimées' }))
            .catch(err => next(err));
    },

    loadById: (req, res, next) => {
        return db.Area.findOne({
            where: { id: req.params.area_id, ConfigId: req.params.config_id }
        })
            .then(area => {
                if (area) {
                    req.area = area;
                    return next();
                }
                throw {
                    status: 404,
                    message: "Cette zone n'existe pas"
                };
            })
            .catch(err => next(err));
    },

    updateById: (req, res, next) => {
        return req.area
            .update({
                position: {
                    type: 'Polygon',
                    coordinates: [req.body.coordinates]
                }
            })
            .then(area => res.json(area))
            .catch(err => next(err));
    },

    deleteById: (req, res, next) => {
        return req.area
            .destroy()
            .then(() => res.json({ message: 'Zone supprimée' }))
            .catch(err => next(err));
    }
};
