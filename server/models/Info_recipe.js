let mongoose = require('mongoose');

// create a model class
let recipeModel = mongoose.Schema({
        Image: String, // Added field for image
        Name: String,
        Discription: String,
        CountryofOrgin: String,
        Time: Number,

    },
    {
        collection: "recipes"
    });

module.exports = mongoose.model('Recipe', recipeModel);
