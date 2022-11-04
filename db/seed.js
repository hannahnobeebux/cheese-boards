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


}

//STEP THREE 
//USING RELATIONSHIPS TO CREATE DATA WITH RELATIONSHIPS 
//EG: ADDBOARDS, SOFTCHEESEBOARDS 

seed()