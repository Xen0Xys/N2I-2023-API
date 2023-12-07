const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Games extends Model{
        static associate(models){
            Games.belongsTo(models.User, {
                foreignKey: "user_id",
            });
        }
    }
    Games.init({
        user_id: DataTypes.INTEGER,
        score: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        current_progress: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        is_finished: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }, {
        sequelize,
        modelName: "Game",
        createdAt: "created_at",
        updatedAt: "updated_at",
    });
    return Games;
};
