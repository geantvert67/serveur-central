const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    /**
     * @swagger
     * components:
     *   schemas:
     *     ItemModel:
     *       type: object
     *       required:
     *         - name
     *       properties:
     *         name:
     *           type: string
     *           minLength: 2
     *           maxLength: 50
     *           description: Nom de l'item.
     *         visibilityRadius:
     *           type: number
     *           format: decimal
     *           minimum: 0.01
     *           description: Rayon de visibilité de l'item.
     *         actionRadius:
     *           type: number
     *           format: decimal
     *           minimum: 0.01
     *           description: Rayon d'action de l'item. Doit être inférieur ou égal au rayon de visibilité.
     *         waitingPeriod:
     *           type: integer
     *           minimum: 1
     *           maximum: 31536000
     *           description: Période de carence (en secondes) durant laquelle un item est visible mais ne peut pas être ramassé.
     *         autoMove:
     *           type: boolean
     *           default: false
     *           description: Si l'item va se téléporter aléatoirement à chaque fois qu'un joueur en ramasse.
     *       example:
     *         name: Mine
     *         visibilityRadius: 1.5
     *         actionRadius: 1.25
     *         waitingPeriode: 600
     *         autoMove: false
     */
    class ItemModel extends Model {
        static nameIsUnique(name, ConfigId) {
            return this.findOne({ where: { name, ConfigId } })
                .then(i => (i ? false : true))
                .catch(err => false);
        }
    }

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
                type: DataTypes.DECIMAL,
                validate: {
                    min: 0.01
                }
            },
            actionRadius: {
                type: DataTypes.DECIMAL,
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
            }
        },
        {
            sequelize,
            modelName: 'ItemModel',
            timestamps: false,
            indexes: [
                {
                    unique: true,
                    fields: ['ConfigId', 'name']
                }
            ]
        }
    );

    ItemModel.associate = db => {
        ItemModel.belongsTo(db.Config);
        ItemModel.hasMany(db.Item, { onDelete: 'CASCADE', hooks: true });
    };

    return ItemModel;
};
