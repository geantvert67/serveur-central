const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Statistics extends Model {}

    Statistics.init(
        {
            nbGames: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            nbWins: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            nbLosses: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            nbFlags: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            nbDiscoveredFlags: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            nbTraps: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            scoreFlag: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            scoreTime: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            scoreSupremacy: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            }
        },
        {
            sequelize,
            modelName: 'Statistics',
            timestamps: false
        }
    );

    Statistics.associate = db => {
        Statistics.belongsTo(db.User);
    };

    return Statistics;
};
