const db = require('../models');

createTeams = (config, teams, next) => {
    return teams.map(team => {
        return config
            .createTeam({
                name: team.name,
                color: team.color
            })
            .catch(err => next(err));
    });
};

createAreas = (config, areas, next) => {
    return areas.map(area => {
        return config
            .createArea({
                position: area.position,
                forbidden: area.forbidden
            })
            .catch(err => next(err));
    });
};

createFlags = (config, flags, next) => {
    return flags.map(flag => {
        return config
            .createFlag({ position: flag.position })
            .catch(err => next(err));
    });
};

createItemModels = (config, itemModels, next) => {
    return itemModels.map(itemModel => {
        return config
            .createItemModel({
                name: itemModel.name,
                visibilityRadius: itemModel.visibilityRadius,
                actionRadius: itemModel.actionRadius,
                autoMove: itemModel.autoMove
            })
            .then(im => {
                return createItems(im, itemModel.Items, next);
            })
            .catch(err => next(err));
    });
};

createItems = (itemModel, items, next) => {
    return items.map(item => {
        return itemModel
            .createItem({
                position: item.position,
                quantity: item.quantity
            })
            .catch(err => next(err));
    });
};

module.exports = {
    cloneConfigById: (req, res, next) => {
        return db.Config.findByPk(req.params.config_id, {
            include: { all: true, nested: true }
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
                            flagVisibilityRadius: c.flagVisibilityRadius,
                            flagActionRadius: c.flagActionRadius,
                            flagCaptureDuration: c.flagCaptureDuration
                        })
                        .then(config => {
                            return Promise.all([
                                createTeams(config, c.Teams, next),
                                createAreas(config, c.Areas, next),
                                createFlags(config, c.Flags, next),
                                createItemModels(config, c.ItemModels, next)
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
