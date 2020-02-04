const db = require('../models'),
    jwt = require('jsonwebtoken'),
    expressjwt = require('express-jwt'),
    secret = process.env.SECRET;

module.exports = {
    signup: (req, res, next) => {
        const username = req.body.username,
            password = req.body.password;

        if (username && password) {
            return db.User.usernameIsUnique(username)
                .then(isUnique => {
                    if (isUnique) {
                        return db.User.create({
                            username,
                            password: db.User.hashPassword(password)
                        })
                            .then(user => {
                                user.password = undefined;
                                const token = jwt.sign(
                                    { id: user.id },
                                    secret,
                                    {
                                        expiresIn: '365d'
                                    }
                                );
                                return res.json({ user: user, token: token });
                            })
                            .catch(err => next(err));
                    }
                    throw {
                        status: 409,
                        message: "Nom d'utilisateur déjà utilisé"
                    };
                })
                .catch(err => next(err));
        }
        throw { status: 406, message: 'Paramètres invalides' };
    },

    signin: (req, res, next) => {
        const username = req.body.username,
            password = req.body.password;

        if (username && password) {
            return db.User.scope('withPassword')
                .findOne({ where: { username } })
                .then(user => {
                    if (user && user.verifyPassword(password)) {
                        user.password = undefined;
                        const token = jwt.sign({ id: user.id }, secret, {
                            expiresIn: '365d'
                        });
                        return res.json({ user: user, token: token });
                    }
                    throw { status: 401, message: 'Identifiants invalides' };
                })
                .catch(err => next(err));
        }
        throw { status: 406, message: 'Paramètres invalides' };
    },

    isAuthenticated: [
        expressjwt({ secret }),
        (req, res, next) => {
            db.User.findByPk(req.user.id)
                .then(user => {
                    if (!user) {
                        throw {
                            status: 404,
                            message: "Cet utilisateur n'existe pas"
                        };
                    }
                    req.user = user;
                    return next();
                })
                .catch(err => next(err));
        }
    ]
};
