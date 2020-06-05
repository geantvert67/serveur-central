const db = require('../models');

const createAreas = (config, areas, next) => {
    return areas.map(area => {
        return config
            .createArea({
                position: area.position,
                forbidden: area.forbidden
            })
            .catch(err => next(err));
    });
};

const createFlags = (config, flags, next) => {
    return flags.map(flag => {
        return config
            .createFlag({ position: flag.position })
            .catch(err => next(err));
    });
};

const createItemModels = (config, itemModels, next) => {
    return itemModels.map(itemModel => {
        return config
            .createItemModel({
                name: itemModel.name,
                visibilityRadius: itemModel.visibilityRadius,
                actionRadius: itemModel.actionRadius,
                autoMove: itemModel.autoMove,
                waitingPeriod: itemModel.waitingPeriod,
                effectStrength: itemModel.effectStrength,
                effectDuration: itemModel.effectDuration
            })
            .catch(err => next(err));
    });
};

const createItems = (config, items, next) => {
    return items.map(item => {
        return config
            .createItem({
                position: item.position,
                quantity: item.quantity,
                name: item.name,
                visibilityRadius: item.visibilityRadius,
                actionRadius: item.actionRadius,
                autoMove: item.autoMove,
                waitingPeriod: item.waitingPeriod,
                effectStrength: item.effectStrength,
                effectDuration: item.effectDuration
            })
            .catch(err => next(err));
    });
};

module.exports = {
    cloneConfigById: (req, res, next) => {
        return db.Config.findByPk(req.params.config_id, {
            include: [
                { model: db.Area },
                { model: db.Flag },
                { model: db.ItemModel },
                { model: db.Item }
            ]
        })
            .then(c => {
                if (c) {
                    return req.user
                        .createConfig({
                            name: c.name,
                            isPrivate: true,
                            maxPlayers: c.maxPlayers,
                            gameMode: c.gameMode,
                            duration: c.duration,
                            inventorySize: c.inventorySize,
                            playerVisibilityRadius: c.playerVisibilityRadius,
                            playerActionRadius: c.playerActionRadius,
                            flagVisibilityRadius: c.flagVisibilityRadius,
                            flagActionRadius: c.flagActionRadius,
                            flagCaptureDuration: c.flagCaptureDuration
                        })
                        .then(config => {
                            return Promise.all([
                                createAreas(config, c.Areas, next),
                                createFlags(config, c.Flags, next),
                                createItemModels(config, c.ItemModels, next),
                                createItems(config, c.Items, next)
                            ])
                                .then(() => res.json(config))
                                .catch(err => next(err));
                        })
                        .catch(err => next(err));
                }
                throw {
                    status: 404,
                    message: 'Aucune configuration ne possède cet identifiant'
                };
            })
            .catch(err => next(err));
    }
};
