
const router = require('express').Router();
const path = require('path');

//Serving up HTML
router.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'))
});

router.get('/animals', (req,res) => {
    res.sendFile(path.join(__dirname, '../../public/animals.html'));
});

router.get('/zookeepers', (req,res) => {
    res.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
});

router.get('*', (req,res) => {  //Wildcard must go last or everything will go tothis page
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;