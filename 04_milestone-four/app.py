"""
Imports
"""
import os
import csv
import pandas as pd
from mongo_connection import mongo_access
from pandas import DataFrame
from flask import Flask, render_template, redirect, request, url_for
from bson.objectid import ObjectId


"""
Flask and Mongo configuration
"""
app = Flask(__name__)


""" 
Instance of our mongo database imported from mongo_connection
"""
mongo = mongo_access


""" 
Routes
"""
@app.route("/")
@app.route("/get_recipes")
def get_recipes():
    """ 
    Retrieves the recipes from the mongo collection and also stores the selected fields from the collection in a dataframe in order to 
    write out to a csv so that it is always updated when the file is read and visualised in stats.html
    """
    recipes_collection = mongo.db.recipes.find()
    data = DataFrame(list(mongo.db.recipes.find({}, {"_id": 0, "recipe_name": 1, "cuisine": 1, "upvotes": 1})))
    data.to_csv("static/data/data.csv", sep=',', index = False, encoding='utf-8')
    return render_template("recipes.html", page_title = "Recipes", recipes = recipes_collection)
  
  
@app.route("/add_recipe")
def add_recipe():
    """
    Allows users to input new recipes via a form
    """
    return render_template("addrecipe.html", page_title = "Add Recipe")
  
    
@app.route("/insert_recipe", methods = ["POST"])
def insert_recipe():
    """
    Using the form in addrecipe.html, take the contents submitted and insert into the cookbook_app database
    """
    recipes =  mongo.db.recipes
    """
    Format directions into a list by splitting each line while also removing \r characters
    """
    directions = [direction.replace('\r', '') for direction in request.form.get("directions").split("\n")]
    """ 
    A new directions dictionary will have an index key to indicate the step number followed by a direction from the directions list
    """
    directions_new = {}
    for idx, direction in enumerate(directions, start = 1):
        """
        Assign the index as the key to represent the step number with the associated direction as the value
        """
        directions_new[str(idx)] = direction
        
    recipes.insert_one(
        { 
        "recipe_name": request.form.get("recipe-name"),
        "directions": directions_new,
        "image": request.form.get("recipe-image"),
        "ingredients": [ingredients.replace('\r', '') for ingredients in request.form.get("ingredients").split("\n")],
        "author": { "first": request.form.get("author-fname"), "last": request.form.get("author-lname"), "nationality": request.form.get("author-nt") },
        "allergens": request.form.get("allergens").split(","),
        "cuisine": request.form.get("cuisine"),
        "upvotes": 1
        } )
    return redirect(url_for("get_recipes"))
    

@app.route("/edit_recipe/<recipe_id>")
def edit_recipe(recipe_id):
    """
    We need to extract the directions dictionary's keys and values and pass as a variable directly into editrecipe.html
    to avoid looping over each direction again
    """
    recipe_edit =  mongo.db.recipes.find_one({"_id": ObjectId(recipe_id)})
    recipe_edit_directions = recipe_edit["directions"]
    """
    This list will hold the step number and direction
    """
    recipe_edit_directions_list = []
    """
    Allows directions to be returned in a sorted order format
    """
    for key, value in sorted(recipe_edit_directions.items()):
        recipe_edit_directions_list.append([int(key), value])
    recipe_edit_directions_list.sort(key = lambda x: x[0])
    return render_template("editrecipe.html", recipe = recipe_edit, recipe_directions = recipe_edit_directions_list)


@app.route("/update_recipe/<recipe_id>", methods =["POST"])
def update_recipe(recipe_id):
    """ 
    We use request.getlist() to retrieve all form elements with the name and id directions
    """
    recipes = mongo.db.recipes
    new_directions = sorted(request.form.getlist("directions"))
    """ 
    Here we reassign a step number as a key and associate the direction in new_directions as a value
    """
    new_directions_d  = {}
    for idx, direction in enumerate(new_directions, start = 1):
        new_directions_d[str(idx)] = direction 
    recipes.update( {"_id": ObjectId(recipe_id)},
    {"$set": 
        {
        "recipe_name": request.form.get("recipe-name"),
        "directions": new_directions_d,
        "image": request.form.get("recipe-image"),
        "ingredients": [ingredient.replace('\r', '') for ingredient in request.form.get("ingredients").split("\n")],
        "author": { "first": request.form.get("author-fname"), "last": request.form.get("author-lname"), "nationality": request.form.get("author-nt") },
        "allergens": [allergen.replace('\r', '') for allergen in request.form.get("allergens").split(",")],
        "cuisine": request.form.get("cuisine")
    }   } )
    return redirect(url_for("get_recipes"))


@app.route("/delete_recipe/<recipe_id>")
def delete_recipe(recipe_id):
    """
    Removes selected recipe using its _id as an identifier
    """
    mongo.db.recipes.remove( {"_id": ObjectId(recipe_id)} )
    return redirect(url_for("get_recipes"))


@app.route("/stats")
def stats():
    """
    Visualises recipes according to upvotes and cuisine
    """
    return render_template("stats.html", page_title = "Stats")


@app.route("/extract_related_recipes/<recipe_id>")
def extract_related_recipes(recipe_id):
    """
    Displays recipes related to the selected recipe using _id and returns
    recipes with the same cuisine
    """
    recipes = mongo.db.recipes.find({})
    current_recipe_cuisine = mongo.db.recipes.find_one({"_id": ObjectId(recipe_id)})
    related_values = [];
    """
    This looks for other recipes in the recipes collection with the same cuisine as the current recipe while also ensuring the recipe names
    are not the same, then appending the cuisine, recipe name and image to the related values list, this is then passed to the template for 
    rendering the related recipes
    """
    for recipe in recipes:
        if recipe["cuisine"] == current_recipe_cuisine["cuisine"] and recipe["recipe_name"] != current_recipe_cuisine["recipe_name"]:
            related_values.append([recipe["cuisine"], recipe["recipe_name"], recipe["image"]])
    return render_template("relatedrecipes.html", related_recipes = related_values)
    
    
@app.route("/upvote_recipe/<recipe_id>")
def upvote_recipe(recipe_id):
    """
    Handles upvote behaviour for recipes by increasing the number of upvotes for the given recipe in the recipes collection
    """
    recipes = mongo.db.recipes
    current_recipe = mongo.db.recipes.find_one({"_id": ObjectId(recipe_id)})
    new_upvotes = current_recipe["upvotes"] + 1
    recipes.update( {"_id": ObjectId(recipe_id) },
    {"$set":
        {
        "upvotes": new_upvotes 
        }
    } )
    return redirect(url_for("get_recipes"))
    

"""
Flask app debugging and running setup
"""
if __name__ == "__main__":
        app.run(host=os.environ.get("IP"),
        port=int(os.environ.get("PORT")),
        debug=True)
