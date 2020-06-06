const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    /**
     * @swagger
     * components:
     *   schemas:
     *     Item:
     *       type: object
     *       required:
     *         - position
     *       properties:
     *         quantity:
     *           type: integer
     *           minimum: 1
     *           maximum: 10
     *           description: Nombre d'items à cette position.
     *         position:
     *           description: Position de l'item.
     *           type: object
     *           properties:
     *             type:
     *               type: string
     *               example: Point
     *             coordinates:
     *               type: array
     *               items:
     *                 type: number
     *                 format: double
     *         effectDuration:
     *           type: integer
     *           minimum: 1
     *           maximum: 31536000
     *           description: Durée de l'effet de l'item.
     *         effectStrength:
     *           type: number
     *           format: double
     *           minimum: 0.1
     *           description: Impact de l'item sur le rayon de visibilité.
     *       example:
     *         quantity: 5
     *         position: { type: 'Point', coordinates: [39.807222,-76.984722]}
     */
    class Item extends Model {}

    Item.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: { len: [2, 50] }
            },
            visibilityRadius: {
                type: DataTypes.DOUBLE,
                validate: {
                    min: 0.01
                }
            },
            actionRadius: {
                type: DataTypes.DOUBLE,
                validate: {
                    min: 0.01,
                    actionGreaterThanVisibility(value) {
                        if (value > this.flagVisibilityRadius) {
                            throw new Error(
                                "Le rayon d'action doit être inférieur ou égal au rayon de visibilité"
                            );
                        }
                    }
                }
            },
            waitingPeriod: {
                type: DataTypes.INTEGER,
                validate: {
                    min: 1,
                    max: 31536000
                }
            },
            autoMove: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            effectDuration: {
                type: DataTypes.INTEGER,
                validate: {
                    min: 1,
                    max: 31536000
                }
            },
            effectStrength: {
                type: DataTypes.DOUBLE,
                validate: {
                    min: 0.01
                }
            },
            quantity: {
                type: DataTypes.INTEGER,
                defaultValue: 1,
                validate: {
                    min: 1,
                    max: 10
                }
            },
            position: {
                type: DataTypes.GEOMETRY('POINT'),
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'Item',
            timestamps: false
        }
    );

    Item.associate = db => {
        Item.belongsTo(db.Config);
    };

    return Item;
};
