const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const express = require("express");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3001;

const app = express();


//Allow the css and js file to be found
app.use(express.static('public'));

//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
app.use('/api',apiRoutes);
app.use('/',htmlRoutes);



const { animals } = require('./data/animals');







//<><><><><><><>
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});