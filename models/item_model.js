const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ItemModel extends Model {}

    /**
     * @swagger
     * components:
     *   schemas:
     *     Item Model:
     *       type: object
     *       required:
     *         - name
     *         - visibilityRadius
     *         - actionRadius
     *       properties:
     *         name:
     *            type: string
     *            minLength: 2
     *            maxLength: 50
     *            description: Nom de l'item.
     *       example:
     */
    ItemModel.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    min: 2,
                    max: 50
                }
            },
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
            delay: {
                type: DataTypes.INTEGER,
                validate: {
                    min: 1,
                    max: 31536000
                }
            }
        },
        {
            sequelize,
            modelName: 'Item Model',
            timestamps: false
        }
    );

    ItemModel.associate = db => {
        ItemModel.belongsTo(db.Config);
    };

    return ItemModel;
};
