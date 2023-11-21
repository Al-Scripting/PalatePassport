let mongoose = require('mongoose');

// create a model class
let recipeModel = mongoose.Schema({
        Name: String,
        Time: Number,
        Discription: String,
        CountryofOrgin: String,
        Image: String  // Added field for image
    },
    {
        collection: "recipes"
    });

module.exports = mongoose.model('Recipe', recipeModel);
