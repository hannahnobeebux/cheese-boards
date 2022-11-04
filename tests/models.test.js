//STEP ONE - REQUIRING THE CORRECT FILES TO TEST 

//STEP TWO - TESTING 
//TEST ONE - THE TABLE IS BEING CREATED

//create the database empty 
//add data into it 
//check the data is true 


//TEST TWO - DATA IS BEING INSERTED 

//TEST THREE - THE TABLE CAN BE DELETED/DROPPED 

// const seed = require("../db/seed");
const db = require("../db/db");
const { Board, Cheese, User } = require("../models");



//all the user model testing in one describe block

describe("User Model", () => {
    beforeEach (async () => {
        await db.sync({force: true})
        await User.create({
            name: "Hannah", 
            email: "itshannah@outlook.com"
        })
  
    })

    //SYNCING THE USER MODEL WITH DB BEFORE TESTING  
    test ("Can successfully add a name", async () => {
        // expect(user.getDataValue("name")).toMatch('Hannah')
        const user = await User.findOne({where: {name: "Hannah"}})
        expect(user.name).toBe("Hannah")
    })

    test("Can successfully add an email", async () => {
        const user = await User.findOne({where: {name: "Hannah"}})
        expect(user.email).toBe("itshannah@outlook.com")

    })

    test("Can successfully create a single row within User", async () => {
        const user = await User.findOne({where: {name: "Hannah"}})
        // expect(user[0]).toBe({name: "Hannah"}, {email: "itshannah@outlook.com"})
        const numberOfRows = await User.count()
        expect(numberOfRows).toBe(1)
    })


})


describe ("Board Model", () => {
    beforeEach( async () => {
        await db.sync({force: true})
        await Board.create({
            type: "French Cheese Board",
            description: "A wondeful selection of French cheeses!", 
            rating: 7.5
        })
    })

    test("Creating one row successfully", async () => {
        const numberOfRows = await Board.count()
        expect(numberOfRows).toBe(1)
    })

    test("Type is successfully created", async () => {
        const board = await Board.findOne({where: {type: "French Cheese Board"}})
        expect(board.type).toBe("French Cheese Board")
    })

    test("Description is successfully created", async () => {
        const board = await Board.findOne({where: {type: "French Cheese Board"}})
        expect(board.description).toBe("A wondeful selection of French cheeses!")
    })

    test("Rating is successfully created", async () => {
        const board = await Board.findOne({where: {type: "French Cheese Board"}})
        expect(board.rating).toBe(7.5)

    })
})


describe ("Cheese Model", () => {
    beforeEach(async () => {
        await db.sync({force: true})
        await Cheese.create({
            title: "Gouda",
            description: "A tangy taste"
        })
    })

    test ("Creating one row at a time", async () => {
        const numberOfRows =  await Cheese.count()
        expect(numberOfRows).toBe(1)
    })

    test("The title is being added correctly", async () => {
        const cheese = await Cheese.findOne({where: {title: "Gouda"}})
        expect(cheese.title).toBe("Gouda")
    })

    test("The description is being added correctly", async () => {
        const cheese = await Cheese.findOne({where: {title: "Gouda"}})
        expect(cheese.description).toBe("A tangy taste")
    })
})



