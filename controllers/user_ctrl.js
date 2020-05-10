const db = require('../models'),
    { Op } = require('sequelize');

module.exports = {
    getCurrent: (req, res, next) => {
        return res.json(req.user);
    },

    update: (req, res, next) => {
        const username = req.body.username;

        if (username) {
            return db.User.usernameIsUnique(username)
                .then(isUnique => {
                    if (isUnique) {
                        return req.user
                            .update({ username })
                            .then(user => res.json(user))
                            .catch(err => next(err));
                    } else {
                        throw {
                            status: 409,
                            message: "Nom d'utilisateur déjà utilisé"
                        };
                    }
                })
                .catch(err => next(err));
        }
        throw { status: 406, message: 'Paramètres invalides' };
    },

    updatePassword: (req, res, next) => {
        const currentPassword = req.body.currentPassword,
            newPassword = req.body.newPassword;

        if (currentPassword && newPassword) {
            return db.User.scope('withPassword')
                .findByPk(req.user.id)
                .then(user => {
                    if (user.verifyPassword(currentPassword)) {
                        return req.user
                            .update({
                                password: db.User.hashPassword(newPassword)
                            })
                            .then(() =>
                                res.json({ message: 'Mot de passe modifié' })
                            )
                            .catch(err => next(err));
                    }
                    throw { status: 401, message: 'Mot de passe invalide' };
                })
                .catch(err => next(err));
        }
        throw { status: 406, message: 'Paramètres invalides' };
    },

    getInvitations: (req, res, next) => {
        return req.user
            .getInvitations({
                include: [
                    {
                        model: db.Game,
                        where: { ended: false }
                    }
                ]
            })
            .then(invitations => {
                const inv = invitations.map(i => i.get({ plain: true }));
                return res.json(
                    inv.filter(
                        i =>
                            (i.updatedAt >
                                new Date(
                                    new Date() - 7 * 24 * 60 * 60 * 1000
                                ) &&
                                i.accepted === false) ||
                            i.accepted === true ||
                            i.accepted === null
                    )
                );
            })

            .catch(err => next(err));
    },

    deleteInvitationById: (req, res, next) => {
        return db.Invitations.findOne({
            where: { id: req.params.invitation_id, UserId: req.user.id }
        })
            .then(invitation => {
                if (invitation) {
                    return invitation
                        .destroy()
                        .then(() =>
                            res.json({ message: 'Invitation supprimée' })
                        )
                        .catch(err => next(err));
                }
                throw {
                    status: 404,
                    message: "Cette invitation n'existe pas"
                };
            })
            .catch(err => next(err));
    },

    getAll: (req, res, next) => {
        return db.User.findAll({
            where: {
                username: { [Op.like]: `${req.query.username}%` }
            },
            order: ['username'],
            limit: 5
        })
            .then(users => res.json(users))
            .catch(err => next(err));
    },

    getByIdWithStats: (req, res, next) => {
        return db.User.findByPk(req.params.user_id, {
            include: [{ model: db.Statistics }]
        })
            .then(user => {
                if (user) res.json(user);
                throw {
                    status: 404,
                    message: 'Aucune configuration ne possède cet identifiant'
                };
            })
            .catch(err => next(err));
    },

    getLeaderboard: (req, res, next) => {
        let field = '';

        switch (req.query.filter) {
            case 'SUPREMACY':
                field = 'scoreSupremacy';
                break;
            case 'FLAG':
                field = 'scoreFlag';
                break;
            case 'TIME':
                field = 'scoreTime';
                break;
            case 'Victoires':
                field = 'nbWins';
                break;
        }

        return db.User.findAll({
            include: [{ model: db.Statistics }],
            order: [['Statistic', field, 'DESC'], ['username']],
            limit: 25
        })
            .then(users => res.json(users))
            .catch(err => next(err));
    }
};
