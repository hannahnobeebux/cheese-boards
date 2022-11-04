//STEP ONE - REQUIRE ALL THE MODELS 

const { Board, Cheese, User } = require("../models")
const db = require("./db")


//STEP TWO - MAKE AN ASYNC FUNCTION TO INSERT DATA 

async function seed () {
    await db.sync ({
        force: true 
    })

    await Cheese.bulkCreate([
        {title: "Cheddar", description: "Amazing cheese"}, 
        {title: "Mozarella", description: "Pizza cheese"}
        
    ])

    await Board.bulkCreate([
        {type: "French Cheese", description: "Soft Cheese", rating: 5}, 
        {type: "Soft Cheese", description: "Soft Cheese", rating: 5}, 
    ])

    await User.bulkCreate([
        {name: "Felicity", email: "felicity@gmail.com" },
        {name: "Esgrid", email: "esgrid@gmail.com" }
    ])


}

//STEP THREE 
//USING RELATIONSHIPS TO CREATE DATA WITH RELATIONSHIPS 
//EG: ADDBOARDS, SOFTCHEESEBOARDS 

seed()

// module.exports = seed 