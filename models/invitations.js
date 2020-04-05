const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Invitations extends Model {}

    /**
     * @swagger
     * components:
     *   schemas:
     *     Invitations:
     *       type: object
     *       properties:
     *         accepted:
     *           type: boolean
     *           description: Si l'invitation a été acceptée ou non
     */
    Invitations.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            accepted: {
                type: DataTypes.BOOLEAN
            }
        },
        {
            sequelize,
            modelName: 'Invitations',
            timestamps: false
        }
    );

    Invitations.associate = db => {
        Invitations.belongsTo(db.User);
        Invitations.belongsTo(db.Game);
    };

    return Invitations;
};