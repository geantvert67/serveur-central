const db = require('../models');

_updateById = (req, res, next) => {
    return req.itemModel
        .update(req.body)
        .then(itemModel => res.json(itemModel))
        .catch(err => next(err));
};

module.exports = {
    getAll: (req, res, next) => {
        return req.config
            .getItemModels()
            .then(itemModels => res.json(itemModels))
            .catch(err => next(err));
    },

    create: (req, res, next) => {
        if (
            req.body.name &&
            req.body.visibilityRadius &&
            req.body.actionRadius
        ) {
            return db.ItemModel.nameIsUnique(req.body.name, req.config.id)
                .then(isUnique => {
                    if (isUnique) {
                        return req.config
                            .createItemModel(req.body)
                            .then(itemModel => res.json(itemModel))
                            .catch(err => next(err));
                    }
                    throw {
                        status: 409,
                        message: 'Cet item existe déjà'
                    };
                })
                .catch(err => next(err));
        }
        throw { status: 406, message: 'Paramètres invalides' };
    },

    loadById: (req, res, next) => {
        return db.ItemModel.findOne({
            where: {
                id: req.params.item_model_id,
                ConfigId: req.params.config_id
            }
        })
            .then(itemModel => {
                if (itemModel) {
                    req.itemModel = itemModel;
                    return next();
                }
                throw {
                    status: 404,
                    message: "Ce modèle d'item n'existe pas"
                };
            })
            .catch(err => next(err));
    },

    updateById: (req, res, next) => {
        if (!req.body.name) {
            return _updateById(req, res, next);
        }

        return db.ItemModel.nameIsUnique(req.body.name, req.config.id)
            .then(isUnique => {
                if (isUnique) {
                    return _updateById(req, res, next);
                }
                throw {
                    status: 409,
                    message: 'Cet item existe déjà'
                };
            })
            .catch(err => next(err));
    },

    deleteById: (req, res, next) => {
        return req.itemModel
            .destroy()
            .then(() => res.json({ message: "Modèle d'item supprimé" }))
            .catch(err => next(err));
    }
};
