//using the built in methods when tables get relationships 
const { Board, Cheese, User } = require("../models")
const db = require("../db/db")


// CREATING A USER AND A BOARD 

// async function main () {
//     const newUser = await User.create({name: "Esgrid", email: "esgrid@gmail.com"})
//     const newBoard = await Board.create({type: "Spanish cheese", description: "yummy", rating:0 })
//     newUser.addBoard(newBoard)
    // console.log(await newUser.getBoards())
// }

// main()
