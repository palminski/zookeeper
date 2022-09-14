const router = require('express').Router();

const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals');

// Get Routes
router.get('/animals', (req,res) => {
    let results =  animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.get('/animals/:id', (req,res) => {
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
router.post('/animals', (req,res) => {
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

module.exports = router;