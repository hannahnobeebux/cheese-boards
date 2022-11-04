const Board = require("./board.model");
const Cheese = require("./cheese.model");
const User = require("./user.model");

//ONE-TO-MANY 
//ONE USER CAN HAVE MANY BOARDS 
User.hasMany(Board)
Board.belongsTo(User)

//MANY-TO-MANY 
//ONE CHEESE CAN BE ON MANY BOARDS 
//ONE BOARD CAN HAVE MANY CHEESES 

Cheese.belongsToMany(Board, {through: 'Cheese_Board'})
Board.belongsToMany(Cheese, {through: 'Cheese_Board'})



module.exports = {Board, Cheese, User}


