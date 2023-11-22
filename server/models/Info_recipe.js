let mongoose = require('mongoose');

// create a model class
let recipeModel = mongoose.Schema({

        Name: String,
        Discription: String,
        Time: Number,


    },
    {
        collection: "recipes"
    });

module.exports = mongoose.model('Recipe', recipeModel);
