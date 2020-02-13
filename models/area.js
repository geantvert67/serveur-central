const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    /**
     * @swagger
     * components:
     *   schemas:
     *     Area:
     *       type: object
     *       required:
     *         - position
     *         - forbidden
     *       properties:
     *         position:
     *           type: object
     *           properties:
     *             type:
     *               type: string
     *               example: Polygon
     *             coordinates:
     *               type: array
     *               items:
     *                 type: array
     *                 items:
     *                   type: array
     *                   items:
     *                     type: integer
     *           description: Les coordonnées de la zone.
     *         forbidden:
     *           type: boolean
     *           description: Si c'est la zone de jeu ou une zone interdite.
     *       example:
     *         position: { type: 'Polygon', coordinates: [ [[100, 0], [101, 0], [101, 1], [100, 1], [100, 0] ] ] }
     *         forbidden: false
     *
     */
    class Area extends Model {
        static gameZoneIsUnique() {
            return this.findOne({ where: { forbidden: false } })
                .then(a => (a ? false : true))
                .catch(err => false);
        }
    }

    Area.init(
        {
            position: {
                type: DataTypes.GEOMETRY('POLYGON'),
                allowNull: false
            },
            forbidden: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'Area',
            timestamps: false
        }
    );

    Area.associate = db => {
        Area.belongsTo(db.Config);
    };

    return Area;
};
