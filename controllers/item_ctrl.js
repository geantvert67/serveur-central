const db = require('../models');

module.exports = {
    getAll: (req, res, next) => {
        return req.itemModel.getItems()
            .then(items => res.json(items))
            .catch(err => next(err));
    },

    create: (req, res, next) => {
        const coordinates = req.body.coordinates,
            quantity = req.body.quantity;

        if (coordinates) {
            return req.itemModel
                .createItem({ position: { type: 'Point', coordinates }, quantity })
                .then(item => res.json(item))
                .catch(err => next(err));
        }
        throw { status: 406, message: 'Paramètres invalides' };
    },

    loadById: (req, res, next) => {
        return db.Item.findOne({
            where: {
                id: req.params.item_id,
                itemModelId: req.params.item_model_id
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
    }
}