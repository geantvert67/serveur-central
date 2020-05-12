const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class History extends Model {}

    History.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            score: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            nbFlags: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            nbDiscoveredFlags: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            nbTraps: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            hasWon: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            hasLost: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            teamName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: { len: [2, 50] }
            },
            teamColor: {
                type: DataTypes.STRING,
                allowNull: false
            },
            teamScore: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'History',
            timestamps: true,
            updatedAt: false
        }
    );

    History.associate = db => {
        History.belongsTo(db.User);
        History.belongsTo(db.Game);
    };

    return History;
};
