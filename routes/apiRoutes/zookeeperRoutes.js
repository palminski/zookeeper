const router = require('express').Router();

const { filterByQuery, findById, createNewZookeeper, validateZookeeper } = require('../../lib/zookeepers');
const { zookeepers } = require('../../data/zookeepers');

router.get('/zookeepers', (req,res) => {
    let results =  zookeepers;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.get('/zookeepers/:id', (req,res) => {
    const result = findById(req.params.id, zookeepers);
    if (result) {
        res.json(result);
    }
    else 
    {
        res.send(404);
    }
});

//Post Routes
router.post('/zookeepers', (req,res) => {
    // req.body is where our incoming content will be
    
    //Adds ID to new keeper
    req.body.id = zookeepers.length.toString();

    //send back 400 error if data isnt valid
    if (!validateZookeeper(req.body)) 
    {
        res.status(400).send("Please properly format the zookeepers data");
    }
    else
    {
        const zookeeper = createNewZookeeper(req.body, zookeepers);
        res.json(zookeeper);
    }
    //add the new data to the JSON file and zookeepers array
    
});

module.exports = router;