const db = require("../db/db");
const { Board, Cheese, User } = require("../models");

describe ("Cheese Model", () => {
    beforeEach(async () => {
        await Cheese.sync({force: true})
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