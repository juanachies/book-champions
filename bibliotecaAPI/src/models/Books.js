import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const Books = sequelize.define('books', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rating: {
        type: DataTypes.INTEGER,
    },
    pageCount: {
        type: DataTypes.INTEGER,
    },
    summary: {
        type: DataTypes.TEXT,
    },
    imageUrl: {
        type: DataTypes.STRING,
    },
    available: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, 
{timestamps: false})

export default Books;