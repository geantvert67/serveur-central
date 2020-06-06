const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Invitations extends Model {}

    /**
     * @swagger
     * components:
     *   schemas:
     *     Invitation:
     *       type: object
     *       properties:
     *         accepted:
     *           type: boolean
     *           description: Si l'invitation a été acceptée ou non
     *       example:
     *         accepted: true
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
            modelName: 'Invitations'
        }
    );

    Invitations.associate = db => {
        Invitations.belongsTo(db.User);
        Invitations.belongsTo(db.Game);
    };

    return Invitations;
};
