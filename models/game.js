const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    /**
     * @swagger
     * components:
     *   schemas:
     *     Game:
     *       type: object
     *       required:
     *         - ip
     *         - port
     *         - name
     *         - gameMode
     *       properties:
     *         ip:
     *           type: string
     *           description: Adresse IP de la partie
     *         port:
     *           type: integer
     *           description: Port de la partie
     *         name:
     *           type: string
     *           minLength: 2
     *           maxLength: 50
     *           description: Nom de la partie
     *         gameMode:
     *           type: string
     *           in: query
     *           enum: ["FLAG", "TIME", "SUPREMACY"]
     *           description: Mode de jeu
     *         published:
     *           type: boolean
     *           default: false
     *           description: Si la partie est visible par tous les joueurs ou non
     *         launched:
     *           type: boolean
     *           default: false
     *           description: Si la partie a déjà commencé
     *         willLaunchAt:
     *           type: string
     *           format: date-time
     *           description: Date à laquelle une partie planifiée va se lancer
     *         ended:
     *           type: boolean
     *           default: false
     *           description: Si la partie est finie
     *       example:
     *         ip: 127.0.0.1
     *         port: 8081
     *         name: partie 1
     *         gameMode: SUPREMACY
     */
    class Game extends Model {}

    Game.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            ip: {
                type: DataTypes.STRING,
                allowNull: false
            },
            port: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            published: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            launched: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            willLaunchAt: {
                type: DataTypes.DATE
            },
            ended: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: { len: [2, 50] }
            },
            gameMode: {
                type: DataTypes.ENUM,
                values: ['FLAG', 'TIME', 'SUPREMACY'],
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'Game',
            timestamps: false
        }
    );

    Game.associate = db => {
        Game.belongsTo(db.User, { as: 'Admin' });
        Game.hasMany(db.Invitations);
        Game.hasMany(db.History);
    };

    return Game;
};
