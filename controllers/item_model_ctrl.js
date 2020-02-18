const db = require('../models');

module.exports = {
    getAll: (req, res, next) => {
        return req.config.getItemModels()
            .then(itemModels => res.json(itemModels))
            .catch(err => next(err));
    },

    create: (req, res, next) => {
        if (req.body.name && req.body.visibilityRadius && req.body.actionRadius) {
            return db.ItemModel.nameIsUnique(req.body.name, req.config.id)
                .then(isUnique => {
                    if (isUnique) {
                        return req.config.createItemModel(req.body)
                            .then(itemModel => res.json(itemModel))
                            .catch(err => next(err));
                    }
                    throw {
                        status: 409,
                        message: "Cet item existe déjà"
                    };
                })
                .catch(err => next(err))
        }
        throw { status: 406, message: 'Paramètres invalides' };
    }
}