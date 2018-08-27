# Imports
import os
import matplotlib.pyplot as plt
import numpy
import csv
import pandas as pd
from pandas import DataFrame
from flask import Flask, render_template, redirect, request, url_for
from flask_pymongo import PyMongo
from bson.objectid import ObjectId

# Flask and Mongo configuration
app = Flask(__name__)
app.config["MONGO_DBNAME"] = "cookbook_app"
app.config["MONGO_URI"] = "mongodb://admin:magelight_81@ds125272.mlab.com:25272/cookbook_app"

# Instance of our mongo database
mongo = PyMongo(app)

## Routes ##

# Default route
@app.route("/")
@app.route("/get_recipes")
def get_recipes():
    recipes_collection = mongo.db.recipes.find()
    # Store the selected fields from the collection in a dataframe and write out to csv so that it is always updated
    # when the file is read and displayed in stats.html
    data = DataFrame(list(mongo.db.recipes.find({}, {"_id": 0, "cuisine": 1, "recipe_name": 1, "upvotes": 1})))
    data.to_csv("static/data/data.csv", sep=',', index = False, encoding='utf-8')
    print (data)
    return render_template("recipes.html", page_title = "Recipes", recipes = recipes_collection)
  
# Add recipe route
@app.route("/add_recipe")
def add_recipe():
    return render_template("addrecipe.html", page_title = "Add Recipe")
    
# Using the form in addrecipe.html, take the contents submitted and insert into the cookbook_app database
@app.route("/insert_recipe", methods = ["POST"])
def insert_recipe():
    recipes =  mongo.db.recipes
    # Format directions into a list by splitting each form line and checking contents to confirm while also removing escape characters
    directions = [direction.replace('\r', '') for direction in request.form.get("directions").split("\n")]
    print (directions)
    
    # A new directions dictionary will have an index key followed by a direction from directions list
    directions_new = {}
    for idx, direction in enumerate(directions, start = 1):
        directions_new[str(idx)] = direction
        
    recipes.insert_one(
        { 
        "recipe_name": request.form.get("recipe-name"),
        "directions": directions_new,
        "image": request.form.get("recipe-image"),
        # Ensures escape characters are omitted when inserting the data
        "ingredients": [ingredients.replace('\r', '') for ingredients in request.form.get("ingredients").split("\n")],
        "author": { "first": request.form.get("author-fname"), "last": request.form.get("author-lname"), "nationality": request.form.get("author-nt") },
        "allergens": request.form.get("allergens").split(","),
        "cuisine": request.form.get("cuisine"),
        "upvotes": 1
        } )
    return redirect(url_for("get_recipes"))
    
# Edit recipe
@app.route("/edit_recipe/<recipe_id>")
def edit_recipe(recipe_id):
    recipe_edit =  mongo.db.recipes.find_one({"_id": ObjectId(recipe_id)})
    # We need to extract the directions dictionary keys values and pass as a variable directly into editrecipe.html
    # to avoid looping over each direction again
    recipe_edit_directions = recipe_edit["directions"]
    for key, value in recipe_edit_directions.items():
        pass
    print(recipe_edit)
    print(recipe_edit_directions)
    # Now sort the directions by keys (steps) in order to pass these to the view for presenting to the user
    # sorted_directions = sorted(recipe_edit['directions'].items())
    # print(sorted_directions)
    return render_template("editrecipe.html", recipe = recipe_edit, recipe_directions = recipe_edit_directions)

# Update changes to recipe
@app.route("/update_recipe/<recipe_id>", methods =["POST"])
def update_recipe(recipe_id):
    recipes = mongo.db.recipes
    recipes.update( {"_id": ObjectId(recipe_id)},
    {
        "recipe_name": request.form.get("recipe-name"),
        "directions": { "" : request.form.getlist("directions") },
        "image": request.form.get("recipe-image"),
        "ingredients": request.form.get("ingredients").split("\n"),
        "author": { "first": request.form.get("author-fname"), "last": request.form.get("author-lname"), "nationality": request.form.get("author-nt") },
        "allergens": request.form.get("allergens").split(","),
        "cuisine": request.form.get("cuisine")
    } )
    return redirect(url_for("get_recipes"))

# Delete recipe
@app.route("/delete_recipe/<recipe_id>")
def delete_recipe(recipe_id):
    mongo.db.recipes.remove( {"_id": ObjectId(recipe_id)} )
    return redirect(url_for("get_recipes"))

# Stats.html to show recipes by the numbers
@app.route("/stats")
def stats():
    return render_template("stats.html", page_title = "Stats")

## Helper functions ##

# Running
if __name__ == "__main__":
        app.run(host=os.environ.get("IP"),
        port=int(os.environ.get("PORT")),
        debug=True)
