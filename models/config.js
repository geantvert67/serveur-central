const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    /**
     * @swagger
     *  components:
     *    schemas:
     *      Config:
     *        type: object
     *        required:
     *          - name
     *          - gameMode
     *        properties:
     *          name:
     *            type: string
     *            minLength: 2
     *            maxLength: 50
     *            description: Nom de la configuration.
     *          isPrivate:
     *            type: boolean
     *            default: true
     *            description: Si la configuration est visible uniquement par la personne qui l'a créée ou également par les autres utilisateurs.
     *          maxPlayers:
     *            type: integer
     *            minimum: 1
     *            maximum: 100
     *            description: Le nombre maximum de joueurs par équipe.
     *          gameMode:
     *            type: string
     *            in: query
     *            enum: ["FLAG", "TIME", "SUPREMACY"]
     *            description: Mode de jeu.
     *          duration:
     *            type: integer
     *            minimum: 60
     *            maximum: 31536000
     *            description: Durée de la partie en secondes, une partie doit durer au minimum 1 minute et au maximum 1 an. Le mode de jeu SUPREMACY ne peut pas avoir de limite de temps.
     *          inventorySize:
     *            type: integer
     *            minimum: 1
     *            maximum: 10
     *            default: 2
     *            description: Nombre d'objets qu'un joueur pourra avoir dans son inventaire.
     *          flagVisibilityRadius:
     *            type: number
     *            format: decimal
     *            minimum: 0.01
     *            description: Rayon de visibilité des drapeaux.
     *          flagActionRadius:
     *            type: number
     *            format: decimal
     *            minimum: 0.01
     *            description: Rayon d'action des drapeaux. Doit être inférieur ou égal au rayon de visibilité.
     *          flagCaptureDuration:
     *            type: integer
     *            minimum: 1
     *            maximum: 31536000
     *            description: Durée en secondes pendant laquelle un drapeau appartient à une équipe.
     *        example:
     *          name: config 1
     *          isPrivate: false
     *          gameMode: FLAG
     *          duration: 600
     *          inventorySize: 7
     *          maxPlayers: 10
     *          flagVisibilityRadius: 1.5
     *          flagActionRadius: 1.25
     *          flagCaptureDuration: 60
     */
    class Config extends Model {}

    Config.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    min: 2,
                    max: 50
                }
            },
            isPrivate: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            maxPlayers: {
                type: DataTypes.INTEGER,
                validate: {
                    min: 1,
                    max: 100
                }
            },
            gameMode: {
                type: DataTypes.ENUM,
                values: ['FLAG', 'TIME', 'SUPREMACY'],
                allowNull: false,
                validate: {
                    checkDuration(value) {
                        if (value === 'SUPREMACY' && this.duration) {
                            throw new Error("Ce mode de jeu n'a pas de durée");
                        } else if (
                            (value === 'FLAG' || value === 'TIME') &&
                            !this.duration
                        ) {
                            throw new Error(
                                'Ce mode de jeu doit avoir une durée'
                            );
                        }
                    }
                }
            },
            duration: {
                type: DataTypes.INTEGER,
                validate: {
                    min: 60,
                    max: 31536000
                }
            },
            inventorySize: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 2,
                validate: {
                    min: 1,
                    max: 10
                }
            },
            flagVisibilityRadius: {
                type: DataTypes.DECIMAL(3, 2),
                validate: {
                    min: 0.01
                }
            },
            flagActionRadius: {
                type: DataTypes.DECIMAL(3, 2),
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
            flagCaptureDuration: {
                type: DataTypes.INTEGER,
                validate: {
                    min: 1,
                    max: 31536000
                }
            }
        },
        {
            sequelize,
            modelName: 'Config',
            scopes: {
                public: {
                    where: {
                        isPrivate: false
                    }
                }
            }
        }
    );

    Config.associate = db => {
        Config.belongsTo(db.User, { as: 'Owner' });
        Config.hasMany(db.Team, { onDelete: 'CASCADE', hooks: true });
        Config.hasMany(db.Area, { onDelete: 'CASCADE', hooks: true });
        Config.hasMany(db.Flag, { onDelete: 'CASCADE', hooks: true });
        Config.hasMany(db.ItemModel, { onDelete: 'CASCADE', hooks: true });
    };

    return Config;
};
