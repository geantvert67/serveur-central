const db = require('../models');

module.exports = {
    getAllFromConfig: (req, res, next) => {
        return req.config
            .getItems()
            .then(items => res.json(items))
            .catch(err => next(err));
    },

    deleteAllFromConfig: (req, res, next) => {
        return req.config
            .getItems()
            .then(items => {
                return Promise.all(items.map(i => i.destroy()))
                    .then(() => res.json({ message: 'Items supprimés' }))
                    .catch(err => next(err));
            })
            .catch(err => next(err));
    },

    create: (req, res, next) => {
        const coordinates = req.body.coordinates;

        if (coordinates) {
            return req.config
                .createItem({
                    ...{ position: { type: 'Point', coordinates } },
                    ...req.body
                })
                .then(item => res.json(item))
                .catch(err => next(err));
        }
        throw { status: 406, message: 'Paramètres invalides' };
    },

    loadById: (req, res, next) => {
        return db.Item.findOne({
            where: {
                id: req.params.item_id,
                ConfigId: req.params.config_id
            }
        })
            .then(item => {
                if (item) {
                    req.item = item;
                    return next();
                }
                throw {
                    status: 404,
                    message: "Cet item n'existe pas"
                };
            })
            .catch(err => next(err));
    },

    updateById: (req, res, next) => {
        const coordinates = req.body.coordinates;
        req.body.position = coordinates && { type: 'Point', coordinates };

        return req.item
            .update(req.body)
            .then(item => res.json(item))
            .catch(err => next(err));
    },

    deleteById: (req, res, next) => {
        return req.item
            .destroy()
            .then(() => res.json({ message: 'Item supprimé' }))
            .catch(err => next(err));
    }
};
