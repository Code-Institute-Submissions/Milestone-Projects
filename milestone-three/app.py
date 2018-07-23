##### Imports #####

import os
import json
from flask import Flask, render_template, request, redirect


##### Flask Configuration #####

app = Flask(__name__)


##### Global Variables #####

user = "Test"

all_scores = []


##### Routes and Views #####

@app.route("/", methods=["GET", "POST"])

def login():
    """
    Store existing usernames in a variable from users.txt ensuring they are unique by checking if a username already exists by reading the file
    before appending
    """
    if request.method == "POST":
        with open("data/users.txt", "r") as existing_users:
            existing_users = [l.rstrip("\n") for l in existing_users.readlines()]
        
        with open("data/scores.txt", "a+") as scores:
            if request.form["username"].title() not in existing_users:
                scores.write(request.form["username"] + "," + str(0) + "\n")
                
        with open("data/users.txt", "a+") as users:
            if request.form["username"].title() not in existing_users:
                users.writelines(request.form["username"] + "\n")
                user =  set_user(request.form["username"])
                return index()
            else:
                # If the name does exist, we will use this as the login for this user
                user =  set_user(request.form["username"])
                return index()
                
    return render_template("login.html")


@app.route("/index", methods=["GET", "POST"])

def index():
    return render_template("index.html", username = user)


@app.route("/about", methods=["GET", "POST"])

def about():
    return render_template("about.html")
    

@app.route("/leaderboards", methods=["GET", "POST"])

def leaderboards():
    data = []
    
    with open("data/scores.txt", "r+") as scores:
        for line in scores:
            # Remove whitespace
            line = line.replace(" ", "").strip()  
            
            # Split each line into a list containing two parts. The user
            # and the score. Unpack the list into two variables and append as a list to data
            user, score = line.split(",")
            data.append([user, score])
        
        print (data)
        return render_template("leaderboards.html", scores = data)
    

@app.route("/contact", methods=["GET", "POST"])

def contact():
    return render_template("contact.html")

    
@app.route("/greek", methods=["GET", "POST"])

def greek():
    # We need to have gods_greek.json open when rendering greek.html to generate images and descriptions
    data = []
    
    # An answer variable will store the POST request and will be accessed in each game path page to check if it equals the correct answer
    user_answer_var = "Test answer"
    
    with open("static/json/gods_greek.json", "r") as json_data:
        data = json.load(json_data)
    
    # Handle POST requests for user answers
    if request.method == "POST":
        user_answer_var = request.form.get("answer")
        # Check that variable is equal to user input
        print(user_answer_var)
        print (user)
        
        return render_template("greek.html", greek_gods = data, user_answer = user_answer_var, user = user, user_score = get_user_score(user), update_score = update_score)
    
    return render_template("greek.html", greek_gods = data, user_answer = user_answer_var, user = user, user_score = get_user_score(user), update_score = update_score)
    
    
@app.route("/celtic", methods=["GET", "POST"])

def celtic():
    # We need to have gods_celtic.json open when rendering celtic.html to generate images and descriptions
    data = []

    # An answer variable will store the POST request and will be accessed in each game path page to check if it equals the correct answer
    user_answer_var = "Test answer"
    
    with open("static/json/gods_celtic.json", "r") as json_data:
        data = json.load(json_data)
    
    # Handle POST requests for user answers
    if request.method == "POST":
        user_answer_var = request.form.get("answer")
        # Check that variable is equal to user input
        print(user_answer_var)
        
        return render_template("celtic.html", celtic_gods = data, user_answer = user_answer_var, user = user, user_score = get_user_score(user), update_score = update_score)
        
    return render_template("celtic.html", celtic_gods = data, user_answer = user_answer_var, user = user, user_score = get_user_score(user), update_score = update_score)
    

@app.route("/norse", methods=["GET", "POST"])

def norse():
    # We need to have gods_norse.json open when rendering norse.html to generate images and descriptions
    data = []
    
    # An answer variable will store the POST request and will be accessed in each game path page to check if it equals the correct answer
    user_answer_var = "Test answer"
    
    with open("static/json/gods_norse.json", "r") as json_data:
        data = json.load(json_data)

    # Handle POST requests for user answers
    if request.method == "POST":
        user_answer_var = request.form.get("answer")
        # Check that variable is equal to user input
        print(user_answer_var)
        
        return render_template("norse.html", norse_gods = data, user_answer = user_answer_var, user = user, user_score = get_user_score(user), update_score = update_score)
    
    return render_template("norse.html", norse_gods = data, user_answer = user_answer_var, user = user, user_score = get_user_score(user), update_score = update_score)


##### File I/O #####

# Assigns and stores the current username that is logged in and replaces the global user Test

def set_user(username):
    global user 
    user = username
    return user
    

# Updates the user score each time they play and get an answer correct

def update_score(username, new_score):
    # This dictionary will hold all scores for all users so this data will not be lost when writing to scores.txt
    all_user_scores = {}
    
    # Open scores.txt for writing both the username and score 
    # from the all_scores list with the dictionary for user:score values
    with open("data/scores.txt", "r+") as all_scores:
        for line in all_scores:
            # Remove whitespace
            line = line.replace(" ", "").strip()  
            
            # Split each line into a list containing two parts. The user
            # and the score. Unpack the list into two variables and append as a list to data
            user, score = line.split(",")
            all_user_scores[user] = score
                
        # Now let's run through the user scores dictionary and find the user passed to the function and
        # when found, we update the score for that user with the new_score
        for user, score in all_user_scores.items():
            if user == username:
                all_user_scores[user] = new_score
            
        # Now let's write out the file again with the updated score for the user
        with open("data/scores.txt", "w+") as scores:
            for user, score in all_user_scores.items():
                scores.write(user + "," + str(score) + "\n")
                

##### Ranking and Returning User Scores #####

def rank_users():
    score = 0
    user_score = {}
    
    # Reset all_scores list to ensure empty before appending
    all_scores = []
        
    # Read in the list of users from users.txt and for each user,
    # the user_score dictionary will use this as the key with score
    # as the value for each user
    with open("data/users.txt", "r") as users:
        users = [l.rstrip("\n") for l in users.readlines()]
        for user in users:
            user_score[user] = score
            score += 10
        all_scores.append(user_score)
    
    # Open scores.txt for writing both the username and score 
    # from the all_scores list with the dictionary for user:score values
    with open("data/scores.txt", "w+") as scores:
        for i in all_scores:
            for user, score in sorted(i.items()):
                scores.write(user + "," + str(score) + "\n")
    
    # Check contents of all_scores
    print (all_scores)
    
    return all_scores


def get_user_score(username):
    data = []
    score = 0
    
    # Read from the scores.txt file and extract score for the given user
    with open("data/scores.txt", "r") as scores:
        for line in scores:
            # Remove whitespace
            line = line.replace(" ", "").strip()  
            
            # Split each line into a list containing two parts. The user
            # and the score. Unpack the list into two variables and append as a list to data
            user, score = line.split(",")
            data.append([user, score])
    
    # Now check each entry in data to find the username passed to the function and return the score for that user
    print (data)
    for entry in data:
        if entry[0] == username:
            score = entry[1]
    
    # Check score variable
    print (score)
    
    return score
    
    
##### App Configuration and Debugging #####

app.run(host = os.getenv("IP"), port = os.getenv("PORT"), debug = True)