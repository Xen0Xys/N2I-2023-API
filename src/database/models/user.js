/* eslint-disable no-unused-vars */
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class user extends Model{
        static associate(models){
            user.hasMany(models.Game, {
                foreignKey: "user_id",
            });
        }
    }
    user.init({
        username: DataTypes.STRING(30),
        password: DataTypes.STRING(30),
    }, {
        sequelize,
        modelName: "User",
        createdAt: "created_at",
        updatedAt: "updated_at",
    });
    return user;
};
