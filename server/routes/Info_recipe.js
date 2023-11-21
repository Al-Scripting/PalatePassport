var express = require('express');
var router = express.Router();
//const { router } = require('../config/app');
let Recipe = require('../models/Info_recipe');
let RecipeController = require('../controllers/Info_recipe')
/* Get route for the Info Recipe list */
// Read Operation
router.get('/', RecipeController.DislayRecipelist);
/* Get route for Add Recipe page --> Create */
router.get('/add', RecipeController.AddRecipe);
/* Post route for Add Recipe page --> Create */
router.post('/add', RecipeController.ProcessRecipe);
/* Get route for displaying the Edit Recipe page --> Update */
router.get('/edit/:id', RecipeController.EditRecipe);
/* Post route for processing the Edit Recipe page --> Update */
router.post('/edit/:id', RecipeController.ProcessEditRecipe);
/* Get to perform Delete Operation --> Delete Operation */
router.get('/delete/:id', RecipeController.DeleteRecipe);
module.exports = router;