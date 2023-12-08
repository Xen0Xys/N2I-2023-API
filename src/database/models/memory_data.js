/* eslint-disable no-unused-vars */
"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class MemoryData extends Model{
        static associate(models){

        }
    }
    MemoryData.init({
        image: DataTypes.STRING
    }, {
        sequelize,
        modelName: "MemoryData",
        tableName: "memory_data",
        createdAt: "created_at",
        updatedAt: "updated_at",
    });
    return MemoryData;
};
