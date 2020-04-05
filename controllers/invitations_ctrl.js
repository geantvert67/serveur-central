const db = require('../models');

module.exports = {
    getPending: (req, res, next) => {
        return req.game
            .getInvitations({
                where: { accepted: null },
                include: [{ model: db.User }]
            })
            .then(invitations => res.json(invitations))
            .catch(err => next(err));
    },

    create: (req, res, next) => {
        return db.User.findByPk(req.body.userId)
            .then(user => {
                if (user) {
                    return db.Invitations.findAll({
                        where: {
                            UserId: req.body.userId,
                            GameId: req.params.game_id
                        }
                    })
                        .then(invitations => {
                            if (invitations.length === 0) {
                                return db.Invitations.create({
                                    UserId: user.id,
                                    GameId: req.game.id,
                                    accepted: req.body.accepted
                                })
                                    .then(() =>
                                        res.json({
                                            message: 'Invitation envoyée'
                                        })
                                    )
                                    .catch(err => next(err));
                            }
                            throw {
                                status: 409,
                                message:
                                    'Cet utilisateur a déjà été invité dans cette partie'
                            };
                        })
                        .catch(err => next(err));
                }
                throw {
                    status: 404,
                    message: "Cet utilisateur n'existe pas"
                };
            })
            .catch(err => next(err));
    },

    loadById: (req, res, next) => {
        return db.Invitations.findOne({
            where: { id: req.params.invitation_id, GameId: req.params.game_id }
        })
            .then(invitation => {
                if (invitation) {
                    req.invitation = invitation;
                    return next();
                }
                throw {
                    status: 404,
                    message: "Cette invitation n'existe pas"
                };
            })
            .catch(err => next(err));
    },

    updateById: (req, res, next) => {
        return req.invitation
            .update({
                accepted: req.body.accepted
            })
            .then(() => res.json({ message: 'Invitation modifiée' }))
            .catch(err => next(err));
    }
};
