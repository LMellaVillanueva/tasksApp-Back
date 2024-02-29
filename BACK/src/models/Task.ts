import { DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
    sequelize.define('Task', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false
        },
        status:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {timestamps: false});
}