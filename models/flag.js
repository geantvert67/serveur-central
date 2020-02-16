const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    /**
     * @swagger
     * components:
     *   schemas:
     *     Flag:
     *       type: object
     *       required:
     *         - visibilityRadius
     *         - actionRadius
     *         - captureDuration
     *         - position
     *       properties:
     *         visibilityRadius:
     *           type: number
     *           format: decimal
     *           minimum: 0.01
     *           description: Rayon de visibilité du drapeau.
     *         actionRadius:
     *           type: number
     *           format: decimal
     *           minimum: 0.01
     *           description: Rayon d'action du drapeau. Doit être inférieur ou égal au rayon de visibilité.
     *         captureDuration:
     *           type: integer
     *           minimum: 1
     *           maximum: 31536000
     *           description: Durée en secondes pendant laquelle un drapeau appartient à une équipe.
     *         position:
     *           type: object
     *           properties:
     *             type:
     *               type: string
     *               example: Point
     *             coordinates:
     *               type: array
     *               items:
     *                 type: number
     *                 format: decimal
     *       example:
     *         visibilityRadius: 1.5
     *         actionRadius: 1.25
     *         captureDuration: 60
     *         position: { type: 'Point', coordinates: [39.807222,-76.984722]}
     */
    class Flag extends Model {}

    Flag.init(
        {
            visibilityRadius: {
                type: DataTypes.DECIMAL(3, 2),
                allowNull: false,
                validate: {
                    min: 0.01
                }
            },
            actionRadius: {
                type: DataTypes.DECIMAL(3, 2),
                allowNull: false,
                validate: {
                    min: 0.01,
                    actionGreaterThanVisibility(value) {
                        if (value > this.visibilityRadius) {
                            throw new Error(
                                "Le rayon d'action doit être inférieur ou égal au rayon de visibilité"
                            );
                        }
                    }
                }
            },
            captureDuration: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    min: 1,
                    max: 31536000
                }
            },
            position: {
                type: DataTypes.GEOMETRY('POINT'),
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'Flag',
            timestamps: false
        }
    );

    Flag.associate = db => {
        Flag.belongsTo(db.Config);
    };

    return Flag;
};
