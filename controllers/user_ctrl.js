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
    }
};
