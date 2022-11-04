const db = require("../db/db");
const { Board, Cheese, User } = require("../models");

describe ("Board Model", () => {
    beforeEach( async () => {
        await Board.sync({force: true})
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