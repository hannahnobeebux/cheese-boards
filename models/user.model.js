const {DataTypes, Model} = require('sequelize')
const db = require('../db/db')

class User extends Model {}

User.init ({
    // id: {
    //     type: DataTypes.INTEGER, 
    //     autoIncrement: true, 
    //     primaryKey: true, 
    //     allowNull: false
    // },
    name: {
        type: DataTypes.STRING,
        allowNull: false 
    }, 
    email: {
        type: DataTypes.STRING, 
        allowNull: false 
    }
}, {
    sequelize: db
})

module.exports = User 
