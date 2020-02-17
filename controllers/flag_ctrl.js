const db = require('../models');

module.exports = {
    getAll: (req, res, next) => {
        return req.config
            .getFlags()
            .then(flags => res.json(flags))
            .catch(err => next(err));
    },

    create: (req, res, next) => {
        const coordinates = req.body.coordinates;

        if (coordinates) {
            return req.config
                .createFlag({ position: { type: 'Point', coordinates } })
                .then(flag => res.json(flag))
                .catch(err => next(err));
        }
        throw { status: 406, message: 'Paramètres invalides' };
    },

    loadById: (req, res, next) => {
        return db.Flag.findByPk(req.params.flag_id)
            .then(flag => {
                if (flag) {
                    req.flag = flag;
                    return next();
                }
                throw {
                    status: 404,
                    message: 'Aucun drapeau ne possède cet identifiant'
                };
            })
            .catch(err => next(err));
    },

    updateById: (req, res, next) => {
        return req.flag
            .update({
                position: {
                    type: 'Point',
                    coordinates: req.body.coordinates
                }
            })
            .then(res.json(req.flag))
            .catch(err => next(err));
    },

    deleteById: (req, res, next) => {
        return req.flag.destroy()
            .then(() => res.json({ message: "Drapeau supprimé" }))
            .catch(err => next(err))
    }
};
