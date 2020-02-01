const db = require('../models');

module.exports = {
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
    }
};
