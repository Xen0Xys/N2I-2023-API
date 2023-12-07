/* eslint-disable no-unused-vars */
"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class memory_data extends Model{
        static associate(models){

        }
    }
    memory_data.init({
        image: DataTypes.STRING
    }, {
        sequelize,
        modelName: "MemoryData",
        createdAt: "created_at",
        updatedAt: "updated_at",
    });
    return memory_data;
};
