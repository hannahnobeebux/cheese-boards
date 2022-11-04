//STEP ONE - REQUIRING THE CORRECT FILES TO TEST 
//STEP TWO - TESTING 
//TEST ONE - THE TABLE IS BEING CREATED
//TEST TWO - DATA IS BEING INSERTED 
//TEST THREE - THE TABLE CAN BE DELETED/DROPPED 

//create the database empty 
//add data into it 
//check the data is true 

const seed = require("../db/seed");
const db = require("../db/db");
const { Board, Cheese, User } = require("../models");


//TESTING USER MODEL 
describe("User Model", () => {
    //SYNCING THE USER MODEL WITH DB BEFORE TESTING  
    beforeEach (async () => {
        await db.sync({force: true})
        // await User.create({
        //     name: "Hannah", 
        //     email: "itshannah@outlook.com"
        // })
        await seed()
  
    })

    test ("Can successfully add a name", async () => {
        // expect(user.getDataValue("name")).toMatch('Hannah')
        const user = await User.findOne({where: {name: "Esgrid"}})
        expect(user.name).toBe("Esgrid")
    })

    test("The name is a valid string", async () => {
        const user = await User.findOne({where: {name: "Bradley"}})
        expect(user.getDataValue("name")).toBe("Bradley");
    })

    test("Can successfully add an email", async () => {
        const user = await User.findOne({where: {name: "Esgrid"}})
        expect(user.email).toBe("esgrid@gmail.com")

    })

    test("The email is a valid string", async () => {
        const user = await User.findOne({where: {name: "Bradley"}})
        expect(user.getDataValue("email")).toBe("bradley@gmail.com");
    })

    test("Can successfully create a single row within User", async () => {
        const user = await User.findOne({where: {name: "Esgrid"}})
        // expect(user[0]).toBe({name: "Hannah"}, {email: "itshannah@outlook.com"})
        const numberOfRows = await User.count()
        expect(numberOfRows).toBe(6)
    })


})

//TESTING BOARD MODEL 
describe ("Board Model", () => {
    beforeEach( async () => {
        await db.sync({force: true})
        // await Board.create({
        //     type: "French Cheese Board",
        //     description: "A wondeful selection of French cheeses!", 
        //     rating: 7.5
        // })
        await seed()
    })

    test("Creating rows successfully", async () => {
        const numberOfRows = await Board.count()
        expect(numberOfRows).toBe(5)
    })

    test("Type is successfully created", async () => {
        const board = await Board.findOne({where: {type: "French Cheese"}})
        expect(board.type).toBe("French Cheese")
    })

    test("Description is successfully created", async () => {
        const board = await Board.findOne({where: {type: "French Cheese"}})
        expect(board.description).toBe("A wondeful selection of French cheeses!")
    })

    test("Rating is successfully created", async () => {
        const board = await Board.findOne({where: {type: "French Cheese"}})
        expect(board.rating).toBe(7.5)

    })

    test("Rating is of type INTEGER", async () => {
        const board = await Board.findOne({where: {type: "French Cheese"}})
        // expect(typeof board.rating).toBe(INTEGER)
        expect(board.getDataValue("rating")).toBe(7.5);
    })
})

//TESTING CHEESE MODEL 
describe ("Cheese Model", () => {
    beforeEach(async () => {
        await db.sync({force: true})
        // await Cheese.create({
        //     title: "Gouda",
        //     description: "A tangy taste"
        // })
        await seed()
    })

    test ("Creating one row at a time", async () => {
        const numberOfRows =  await Cheese.count()
        expect(numberOfRows).toBe(6)
    })

    test("The title is being added correctly", async () => {
        const cheese = await Cheese.findOne({where: {title: "Gouda"}})
        expect(cheese.title).toBe("Gouda")
    })

    test("The description is being added correctly", async () => {
        const cheese = await Cheese.findOne({where: {title: "Gouda"}})
        expect(cheese.description).toBe("Typically made from cow's milk, this semi-hard cheese is characterised by its aromatic and caramel-like flavour combined with its dense and springy texture. Hints of nuts with sweet and creamy notes embrace your palate in a graceful sensation and, depending on the age, the finish ranges from smooth to sharp.")
    })
})

//TESTING ASSOCIATIONS 
describe ("ONE-TO-MANY RELATIONSHIP BETWEEN USER AND BOARD", () => {
    beforeEach(async () => {
        // await db.sync({force: true})
        await seed()
    })

    test("The User can own one Board", async () => {
        const newUser = await User.create({name: "Esgrid", email: "esgrid@gmail.com"})
        const newBoard = await Board.create({type: "Spanish cheese", description: "yummy", rating:0 })
        await newUser.addBoard(newBoard)
        expect(Board.UserId).toBe()
    })

    // test("The User can own several Boards", async () => {
    //     const newUser2 = await User.create(
    //         {name:"Ihsan", email: "Ihsan@gmail.com"})
    //     const newBoard2 = await Board.create({type: "Turkish cheese", description: "one of a kind", rating: 10})
    //     const newBoard3 = await Board.create({type: "Spanish cheese", description: "yummy", rating:0 })
        // const allBoards = await Board.findOne({where: {Userid: 1}})
        // await newUser2.addBoards([newBoard2, newBoard3])
        // expect(newUser2.Boards.length).toBe(2)
        // expect(allBoards[0].UserId && allBoards[1].UserId).toBe(1)
        // expect(allBoards.UserId).toBe(1)
    //     expect(await (newUser2.getBoards).length).toBe(2)
    // })

    test("The User can own several Boards", async () => {
        let user = await User.findOne({where: {name: "Felicity"}})
        // let user = await User.findByPk(1)
        let boards = await Board.findAll()
        await user.addBoards(boards)
        expect(await user.countBoards()).toBe(5)

    })
})

describe ("MANY-TO-MANY RELATIONSHIP BETWEEN BOARDS AND CHEESE + EAGER LOADING", () => {
     test("Cheese can be on many boards", async () => {
        let cheese = await Cheese.findByPk(1)
        let board1 = await Board.findOne({where: {type: "French Cheese"}})
        let board2 = await Board.findOne({where: {type: "Soft Cheese"} })
        await cheese.addBoards([board1, board2])
        // expect(await frenchCheese.getCheeses().getDataValue).toBe("parmesan")
        expect(await cheese.countBoards()).toBe(2)
        // console.log(board1)
    })

    test("A board can have several cheeses", async () => {
        let cheese1 = await Cheese.findByPk(1)
        let cheese2 = await Cheese.findByPk(2)
        let cheese3 = await Cheese.findByPk(3)
        let board = await Board.findByPk(1)
        let allCheeses = await board.addCheeses([cheese1, cheese2, cheese3])
        expect(await board.countCheeses()).toBe(3)
    })

    //Finding the cheese with PK = 1 and searching for all the BOARDS that has this cheese associated with it
    test("Testing a cheese and its associated boards",  async () => {
        let findParmesan = await Cheese.findByPk(1 , {
            include: Board
        })
        // expect(findParmesan.getDataValue("type")).toMatch("")
        expect(await findParmesan.countBoards()).toBe(2)
        // console.log(JSON.stringify(findParmesan, null, 2))
    })

    test("Testing a board and its associated cheeses",  async () => {
        let frenchCheese = await Board.findByPk(1 , {
            include: Cheese
        })
        //A BOARD BEING LOADED WITH ITS CHEESES 
        console.log("example: A BOARD BEING LOADED WITH ITS CHEESES")
        console.log(JSON.stringify(frenchCheese, null, 2))
        expect(await frenchCheese.countCheeses()).toBe(3)
    })

    test("Testing a user and their associated boards" ,  async () => {
        let user2 = await User.findByPk(1, {
            include: Board
        })
        expect(await user2.countBoards()).toBe(5)
    })
})

//CODE/METHODS THAT DON'T WORK/HELPED ME FIND A SOLUTION 
///---1---
// describe ("Eager Loading" , async () => {
//     beforeEach(async () => {
//         await db.sync({force: true})
//         await seed()
//     })
//     test("Testing that a board has certain cheeses",  async () => {
//         let findParmesan = await Cheese.findByPk(1 , {
//             include: Board
//         })
//         console.log(JSON.stringify(findParmesan, null, 2))
//     })
// })

//---2---
    // test("The Board table has a User id", async () => {
    //     let aBoard = await Board.findOne({where: {}})
    // })

    // test("Cheese can be on many boards", async () => {
    //     const 
    // })

