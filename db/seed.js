//STEP ONE - REQUIRE ALL THE MODELS 

const { Board, Cheese, User } = require("../models")
const db = require("./db")


//STEP TWO - MAKE AN ASYNC FUNCTION TO INSERT DATA 

async function seed () {
    await db.sync ({
        force: true 
    })

    await Cheese.bulkCreate([
       {title: "Parmesan", description:"The flavor power of parmesan can take a savory dish from acceptable to amazing with a dusting of this delicious cheese. Lots of words are used to describe parmesan: rich, tangy, nutty, sharp, complex, fruity, and bold to name a few. It has a somewhat gritty texture and a strong umami taste."},
        {title:"Pecorino", description:"Comes in large cylinders with a hard, yellow rind encasing a yellowish-white interior — is the best known of the genre. Similar to its cousin, Parmigiano Reggiano (parmesan), it's a hard, dry cheese good for grating. Like parmesan, pecorino is used mainly in cooking."},
        {title:"Cheddar", description:"The texture is slightly buttery, moist, and a little melty. It's truly a versatile crowd-pleaser. Aged cheddars become more nutty, crumbly, and sharp. During the aging process the cheese develops a slightly tangier finish, some earthy notes, and some hard salt-like crystals that add a slight crunch to each bite."},
        {title:"Asiago", description:"Asiago is a semi-hard cow's milk cheese that originated in Italy. Depending on how long this versatile cheese is aged, it can assume a variety of textures. Whether you prefer your cheese nice and smooth or enjoy a more crumbly texture, Asiago is the cheese every cheese lover can indulge in."},
        {title:"Gruyere", description:"Gruyère is a firm yellow Swiss cheese. It is named after the town of Gruyères in Switzerland. Gruyère is generally aged for six months or longer and is made from whole cow's milk. It features very few small eyes (or holes), an unusual characteristic for Swiss cheese."},
        {title:"Gouda", description:"Typically made from cow's milk, this semi-hard cheese is characterised by its aromatic and caramel-like flavour combined with its dense and springy texture. Hints of nuts with sweet and creamy notes embrace your palate in a graceful sensation and, depending on the age, the finish ranges from smooth to sharp."}

    ])

    await Board.bulkCreate([
        {type: "French Cheese", description: "A wondeful selection of French cheeses!", rating: 7.5}, 
        {type: "Soft Cheese", description: "Delicate assortment", rating: 5}, 
        {type: "Aged Cheese Board", description: "Gouda, Sharp Cheddar, Gruyere", rating: 6},
        {type: "Crumbly Cheese Board", description: "Goat and Feta Cheese.", rating: 9},
        {type: "Blue Cheese Favourites", description: "Gorgonzola, Stilton, Roquefort.", rating: 10}
    ])

    await User.bulkCreate([
        {name: "Felicity", email: "felicity@gmail.com" },
        {name: "Esgrid", email: "esgrid@gmail.com" }, 
        {name: "Bradley", email: "bradley@gmail.com"}, 
        {name: "Ihsan", email: "ihsan@gmail.com"}, 
        {name: "Omar", email: "omar@gmail.com"}, 
        {name: "Arron", email: "arron@gmail.com"}

    ])


}

//STEP THREE 
//USING RELATIONSHIPS TO CREATE DATA WITH RELATIONSHIPS 
//EG: ADDBOARDS, SOFTCHEESEBOARDS 

// seed()

module.exports = seed 