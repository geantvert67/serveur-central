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
                type: DataTypes.INTEGER
            },
            gameMode: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isIn: {
                        args: [['FLAG', 'TIME', 'SUPREMACY']]
                    }
                }
            },
            duration: {
                type: DataTypes.INTEGER
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
