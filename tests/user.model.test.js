//STEP ONE - REQUIRING THE CORRECT FILES TO TEST 
// const { User } = require("../models");
// const {DataTypes, Model} = require('sequelize')
// const  db  = require('../db/db')
// const { Sequelize } = require('sequelize')



//STEP TWO - TESTING 
//TEST ONE - THE TABLE IS BEING CREATED

//create the database empty 
//add data into it 
//check the data is true 


//TEST TWO - DATA IS BEING INSERTED 

//TEST THREE - THE TABLE CAN BE DELETED/DROPPED 


const db = require("../db/db");
const { Board, Cheese, User } = require("../models");


//all the user model testing in one describe block
//
describe("User Model", () => {
    beforeEach (async () => {
        await User.sync({force: true})
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