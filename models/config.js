const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Config extends Model {}

    Config.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            isPrivate: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            maxPlayers: {
                type: DataTypes.INTEGER,
                validate: {
                    min: 1,
                    max: 100
                }
            },
            gameMode: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isIn: {
                        args: [['FLAG', 'TIME', 'SUPREMACY']]
                    },
                    checkDuration(value) {
                        if (value === 'SUPREMACY' && this.duration) {
                            throw new Error("Ce mode de jeu n'a pas de durée");
                        } else if (
                            (value === 'FLAG' || value === 'TIME') &&
                            !this.duration
                        ) {
                            throw new Error(
                                'Ce mode de jeu doit avoir une durée'
                            );
                        }
                    }
                }
            },
            duration: {
                type: DataTypes.INTEGER,
                validate: {
                    min: 60,
                    max: 31536000
                }
            },
            inventorySize: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 2,
                validate: {
                    min: 1,
                    max: 10
                }
            }
        },
        {
            sequelize,
            modelName: 'Config',
            scopes: {
                public: {
                    where: {
                        isPrivate: false
                    }
                }
            }
        }
    );

    Config.associate = db => {
        Config.belongsTo(db.User, { as: 'Owner' });
    };

    return Config;
};
