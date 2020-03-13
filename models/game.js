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
     *       properties:
     *         ip:
     *           type: string
     *           description: Adresse IP de la partie
     *         port:
     *           type: integer
     *           description: Port de la partie
     *       example:
     *         ip: 127.0.0.1
     *         port: 8081
     */
    class Game extends Model {}

    Game.init(
        {
            ip: {
                type: DataTypes.STRING,
                allowNull: false
            },
            port: {
                type: DataTypes.INTEGER,
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
        Game.belongsTo(db.Config);
    };

    return Game;
};
