const express = require("express");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3001;

const app = express();

//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

const { animals } = require('./data/animals');

function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    let filteredResults = animalsArray;

    if (query.personalityTraits) {
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        }
        else
        {
            personalityTraitsArray = query.personalityTraits;
        }

        //Loop through each trait in the personality traits array
        personalityTraitsArray.forEach(trait => {
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1 //I am confused by what the negative 1 does here...
            );
        });
    }
    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults
}

function validateAnimal(animal) {
    if (!animal.name || typeof animal.name !== "string"){
        return false;
    }
    if (!animal.species || typeof animal.species !== "string"){
        return false;
    }
    if (!animal.diet || typeof animal.diet !== "string"){
        return false;
    }
    if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)){
        return false;
    }
    return true;
}

function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
}

function createNewAnimal(body, animalsArray) {
    const animal = body;
    animalsArray.push(animal);

    fs.writeFileSync(
        path.join(__dirname, './data/animals.json'), //Why not just use the relative filepath?
        JSON.stringify({ animals: animalsArray }, null, 2)
    );

    return animal;
}

// Get Routes
app.get('/api/animals', (req,res) => {
    let results =  animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.get('/api/animals/:id', (req,res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    }
    else 
    {
        res.send(404);
    }
});

//Post Routes
app.post('/api/animals', (req,res) => {
    // req.body is where our incoming content will be
    
    //Adds ID to new animal
    req.body.id = animals.length.toString();

    //send back 400 error if data isnt valid
    if (!validateAnimal(req.body)) 
    {
        res.status(400).send("Please properly format the animals data");
    }
    else
    {
        const animal = createNewAnimal(req.body, animals);
        res.json(animal);
    }
    //add the new data to the JSON file and animals array
    
});


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});