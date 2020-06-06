const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    /**
     * @swagger
     * components:
     *   schemas:
     *     Statistic:
     *       type: object
     *       required:
     *         - nbGames
     *         - nbWins
     *         - nbLosses
     *         - nbFlags
     *         - nbDiscoveredFlags
     *         - nbTraps
     *         - scoreFlag
     *         - scoreTime
     *         - scoreSupremacy
     *       properties:
     *         nbGames:
     *           type: integer
     *           description: Nombre de parties jouées
     *         nbWins:
     *           type: integer
     *           description: Nombre de parties gagnées
     *         nbLosses:
     *           type: integer
     *           description: Nombre de parties perdues
     *         nbFlags:
     *           type: integer
     *           description: Nombre de drapeaux capturés
     *         nbDiscoveredFlags:
     *           type: integer
     *           description: Nombre de drapeaux découverts
     *         nbTraps:
     *           type: integer
     *           description: Nombre de pièges qui ont fait mouche
     *         scoreFlag:
     *           type: integer
     *           description: Score dans le mode FLAG
     *         scoreTime:
     *           type: integer
     *           description: Score dans le mode TIME
     *         scoreSupremacy:
     *           type: integer
     *           description: Score dans le mode SUPREMACY
     *       example:
     *         nbGames: 5
     *         nbWins: 2
     *         nbLosses: 1
     *         nbFlags: 5
     *         nbDiscoveredFlags: 1
     *         nbTraps: 0
     *         scoreFlag: 1
     *         scoreTime: 234
     *         scoreSupremacy: 3
     */
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
