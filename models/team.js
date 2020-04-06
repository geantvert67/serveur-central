const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Team extends Model {}

    /**
     * @swagger
     * components:
     *   schemas:
     *     Team:
     *       type: object
     *       required:
     *         - name
     *         - color
     *       properties:
     *         name:
     *           type: string
     *           minLength: 2
     *           maxLength: 50
     *           description: Nom de l'équipe, doit être unique dans la configuration.
     *         color:
     *           type: string
     *           pattern: ^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$
     *           description: Couleur de l'équipe, doit être unique dans la configuration.
     *       example:
     *         name: equipe 1
     *         color: '#e1e1e1'
     */
    Team.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: { len: [2, 50] }
            },
            color: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    is: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i
                }
            }
        },
        {
            sequelize,
            modelName: 'Team',
            timestamps: false,
            indexes: [
                {
                    unique: true,
                    fields: ['ConfigId', 'name']
                },
                {
                    unique: true,
                    fields: ['ConfigId', 'color']
                }
            ]
        }
    );

    Team.associate = db => {
        Team.belongsTo(db.Config);
        Team.belongsToMany(db.User, { through: 'TeamPlayers' });
    };

    return Team;
};
