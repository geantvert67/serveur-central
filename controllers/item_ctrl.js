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
    }
}