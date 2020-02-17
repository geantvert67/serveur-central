const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    /**
     * @swagger
     * components:
     *   schemas:
     *     Flag:
     *       type: object
     *       required:
     *         - position
     *       properties:
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
     *         position: { type: 'Point', coordinates: [39.807222,-76.984722]}
     */
    class Flag extends Model { }

    Flag.init(
        {
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
