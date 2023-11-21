var express = require('express');
var router = express.Router();
//const { router } = require('../config/app');
let Recipe = require('../models/Info_recipe');

module.exports.DislayRecipelist = async (req,res,next)=>{ //< Mark function as async
    try{
        const RecipeList = await Recipe.find(); //< Use of await keyword
        res.render('blogs/list', {
            title: 'Recipe List',
            RecipeList: RecipeList
        });
    }catch(err){
        console.error(err);
        //Handle error
        res.render('blogs/list', {
            error: 'Error on server'
        });
    }
};

module.exports.AddRecipe = async (req,res,next)=>{
    try{
        res.render('blogs/add',
            {
                title: 'Add blogs'
            })
    }
    catch(err)
    {
        console.error(err);
        res.render('blogs/list',
            {
                error: 'Error on the server'
            });
    }
};

module.exports.ProcessRecipe = async (req,res,next)=>{
    try{
        let newRecipe = Recipe({
            "Image": req.body.Image,
            "Name":req.body.Name,
            "Discription": req.body.Discription,
            "Country of Orgin": req.body.CountryofOrgin,
            "Time": req.body.Time
        });
        Recipe.create(newRecipe).then(() =>{
            res.redirect('/recipeList')
        })
    }
    catch(error){
        console.error(err);
        res.render('blogs/list',
            {
                error: 'Error on the server'
            });
    }
};

module.exports.EditRecipe = async (req,res,next)=>{
    try{
        const id = req.params.id;
        const RecipeToEdit = await Recipe.findById(id);
        res.render('blogs/edit',
            {
                title:'EditRecipe',
                Recipe:RecipeToEdit
            })
    }
    catch(error){
        console.error(err);
        res.render('blogs/list',
            {
                error: 'Error on the server'
            });
    }
}

module.exports.ProcessEditRecipe= (req,res,next)=>{
    try{
        const id = req.params.id;
        let updatedRecipe = Recipe({
            "_id":id,
            "Image": req.body.Image,
            "Name":req.body.Name,
            "Discription": req.body.Discription,
            "Country of Orgin": req.body.CountryofOrgin,
            "Time Taken": req.body.Time
        });
        Recipe.findByIdAndUpdate(id,updatedRecipe).then(()=>{
            res.redirect('/recipeList')
        });
    }
    catch(error){
        console.error(err);
        res.render('blogs/list',
            {
                error: 'Error on the server'
            });
    }
}

module.exports.DeleteRecipe= (req,res,next)=>{
    try{
        let id = req.params.id;
        Recipe.deleteOne({_id:id}).then(() =>
        {
            res.redirect('/recipeList')
        })
    }
    catch(error){
        console.error(err);
        res.render('blogs/list',
            {
                error: 'Error on the server'
            });
    }
}