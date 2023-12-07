/* eslint-disable no-unused-vars */
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class info_data extends Model{
        static associate(models){

        }
    }
    info_data.init({
        type: DataTypes.STRING,
        url: DataTypes.STRING,
        title: DataTypes.STRING,
        content: DataTypes.STRING,
    }, {
        sequelize,
        modelName: "InfoData",
        createdAt: "created_at",
        updatedAt: "updated_at",
    });
    return info_data;
};
