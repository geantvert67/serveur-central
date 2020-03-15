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
     *                 format: double
     *       example:
     *         quantity: 5
     *         position: { type: 'Point', coordinates: [39.807222,-76.984722]}
     */
    class Item extends Model {}

    Item.init(
        {
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
        Item.belongsTo(db.ItemModel);
    };

    return Item;
};
