const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    /**
     * @swagger
     *  components:
     *    schemas:
     *      User:
     *        type: object
     *        required:
     *          - username
     *          - password
     *        properties:
     *          username:
     *            type: string
     *            unique: true
     *            description: Nom d'utilisateur, doit être unique.
     *          password:
     *            type: string
     *            writeOnly: true
     *            description: Mot de passe.
     *        example:
     *          username: clement284
     *          password: azerty123
     */
    class User extends Model {
        static usernameIsUnique(username) {
            return this.findOne({ where: { username } })
                .then(u => (u ? false : true))
                .catch(err => false);
        }

        static hashPassword(password) {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(12));
        }

        verifyPassword(password) {
            return bcrypt.compareSync(password, this.password);
        }

        addStatistics(gameMode, stats) {
            this.Statistics.increment({
                nbWins: stats.hasWon ? 1 : 0,
                nbLosses: stats.hasLost ? 1 : 0,
                nbGames: 1,
                nbFlags: stats.nbFlags,
                nbDiscoveredFlags: stats.nbDiscoveredFlags,
                nbTraps: stats.nbTraps,
                scoreFlag: gameMode === 'FLAG' ? stats.score : 0,
                scoreTime: gameMode === 'TIME' ? stats.score : 0,
                scoreSupremacy: gameMode === 'SUPREMACY' ? stats.score : 0
            });
        }
    }

    User.init(
        {
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: { len: [3, 50] }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'User',
            defaultScope: {
                attributes: {
                    exclude: ['password']
                }
            },
            scopes: {
                withPassword: {
                    attributes: {}
                }
            }
        }
    );

    User.afterCreate(async (user, options) => {
        await user.createStatistic();
    });

    User.associate = db => {
        User.hasMany(db.Config, { foreignKey: 'OwnerId' });
        User.belongsToMany(db.Team, { through: 'TeamPlayers' });
        User.hasMany(db.Game, { foreignKey: 'AdminId' });
        User.hasMany(db.Invitations);
        User.hasOne(db.Statistics);
        User.hasMany(db.History);
    };

    return User;
};
