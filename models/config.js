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
