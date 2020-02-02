const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
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
    }

    User.init(
        {
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    min: 3,
                    max: 50
                }
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
                attributes: { exclude: ['password'] }
            },
            scopes: {
                withPassword: {
                    attributes: {}
                }
            }
        }
    );

    User.associate = db => {
        User.hasMany(db.Config, { onDelete: 'CASCADE', foreignKey: 'OwnerId' });
    };

    return User;
};
