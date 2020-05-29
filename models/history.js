const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    /**
     * @swagger
     * components:
     *   schemas:
     *     History:
     *       type: object
     *       required:
     *         - score
     *         - nbFlags
     *         - nbDiscoveredFlags
     *         - nbTraps
     *         - hasWon
     *         - hasLost
     *         - teamName
     *         - teamColor
     *         - teamScore
     *       properties:
     *         score:
     *           type: integer
     *           description: Score du joueur
     *         nbFlags:
     *           type: integer
     *           description: Nombre de drapeaux capturés par le joueur
     *         nbDiscoveredFlags:
     *           type: integer
     *           description: Nombre de drapeaux découverts par le joueur
     *         nbTraps:
     *           type: integer
     *           description: Nombre de pièges du joueur qui ont fait mouche
     *         hasWon:
     *           type: boolean
     *           description: Si l'équipe du joueur a gagné ou non
     *         hasLost:
     *           type: boolean
     *           description: Si l'équipe du joueur a perdu ou non
     *         teamName:
     *           type: string
     *           description: Nom de l'équipe du joueur
     *         teamColor:
     *           type: string
     *           description: Couleur de l'équipe du joueur
     *         teamScore:
     *           type: string
     *           description: Score de l'équipe du joueur
     *       example:
     *         score: 5
     *         nbFlags: 5
     *         nbDiscoveredFlags: 1
     *         nbTraps: 0
     *         hasWon: false
     *         hasLost: true
     *         teamName: équipe 1
     *         teamColor: #e6e6e6
     *         teamScore: 36
     */
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
