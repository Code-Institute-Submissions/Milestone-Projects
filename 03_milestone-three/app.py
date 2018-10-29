##### Imports #####

import os
import json
from flask import Flask, render_template, request, redirect, url_for


##### Flask Configuration #####

app = Flask(__name__, static_url_path = '/static')


##### Routes and Views #####

# Login.html route
@app.route("/", methods=["GET", "POST"])

def login():
    """
    Creates users using the request and a initial score value of 0 in scores.txt ensuring the user is unique by checking 
    the existing_users variable if a user already exists and setting the value of user using the set_user function 
    """
    if request.method == "POST":
        with open("03_milestone-three/data/users.txt", "r") as existing_users:
            existing_users = [l.rstrip("\n") for l in existing_users.readlines()]
        
        with open("03_milestone-three/data/scores.txt", "a+") as scores:
            if request.form["username"].title() not in existing_users:
                scores.write(request.form["username"] + "," + str(0) + "\n")
                
        with open("03_milestone-three/data/users.txt", "a+") as users:
            if request.form["username"].title() not in existing_users:
                users.writelines(request.form["username"] + "\n")
                user =  set_user(request.form["username"])
                return index()
            else:
                # If the name does exist, we will use this as the login for this user
                user =  set_user(request.form["username"])
                return index()
                
    return render_template("login.html")


# Index.html route
@app.route("/index", methods=["GET", "POST"])

def index():
    """
    Return index.html template
    """
    return render_template("index.html", username = user)


# About.html route
@app.route("/about", methods=["GET", "POST"])

def about():
    """
    Return about.html template
    """
    return render_template("about.html")
 
    
# Leaderboards.html route
@app.route("/leaderboards", methods=["GET", "POST"])

def leaderboards():
    """
    Reads the scores.txt file and adds contents to scores variable which is sorted and displayed in table format in the
    leaderboards.html template
    """
    data = []
    
    with open("03_milestone-three/data/scores.txt", "r+") as scores:
        for line in scores:
            # Remove whitespace
            line = line.replace(" ", "").strip()  
            
            # Split each line into a list containing two parts. The user
            # and the score. Unpack the list into two variables and append as a list to data
            user, score = line.split(",")
            data.append([user, int(score)])
        
        # Check data of user and score before passing to template ensuring sorted function has been applied to 
        # get highest scoring players first
        print (sorted(data, key = lambda data: data[1], reverse = True))
        return render_template("leaderboards.html", scores = sorted(data, key = lambda data: data[1], reverse = True))
    

# Contact.html route
@app.route("/contact", methods=["GET", "POST"])

def contact():
    """
    Return the contact.html template
    """
    return render_template("contact.html")


# Greek.html route    
@app.route("/greek", methods=["GET", "POST"])

def greek():
    # We need to have gods_greek.json open when rendering greek.html to generate images and descriptions
    data = []
    
    # Declare answer variables
    answer_one = ""
    answer_two = ""
    answer_three = ""
    
    with open("03_milestone-three/static/json/gods_greek.json", "r") as json_data:
        data = json.load(json_data)
        game_answers = []
        
        # The correct variable will determine what gets presented on screen and if the user score should increase
        # while the index specifies which dictionary in data should be accessed depending on the answer submitted
        correct = False
        index = 0
        
        # Retrieve name attributes from data for comparison with user input        
        for god in data:
            game_answers.append(god["name"])

        # Handle POST requests for user answers
        if request.method == "POST":
            
            # Retrieve the form answers submitted
            if request.form.get("answer1") is not None: 
                answer_one = request.form.get("answer1").title()
            if request.form.get("answer2") is not None:    
                answer_two = request.form.get("answer2").title()
            if request.form.get("answer3") is not None:
                answer_three = request.form.get("answer3").title()
            
            # Compare each answer variable to correct answers stored in game_answers
            # and set the correct variable to True if correct and the index to the 
            # position in the data where this answer is correct in order to access that
            # data's attributes in the template
            if answer_one == game_answers[0]:
                correct = True
                index = 0
        
            if answer_two == game_answers[1]:
                correct = True
                index = 1
                
            if answer_three == game_answers[2]:
                correct = True
                index = 2
    
    return render_template("greek.html", greek_gods = data, user = user, correct = correct, index = index, user_score = get_user_score(user), update_score = update_score)
    

# Norse.html route
@app.route("/norse", methods=["GET", "POST"])

def norse():
    data = []

    answer_one = ""
    answer_two = ""
    answer_three = ""
    
    with open("03_milestone-three/static/json/gods_norse.json", "r") as json_data:
        data = json.load(json_data)
        game_answers = []
        
        correct = False
        index = 0
        
        for god in data:
            game_answers.append(god["name"])

        if request.method == "POST":
            
            if request.form.get("answer1") is not None: 
                answer_one = request.form.get("answer1").title()
            if request.form.get("answer2") is not None:    
                answer_two = request.form.get("answer2").title()
            if request.form.get("answer3") is not None:
                answer_three = request.form.get("answer3").title()
        
            if answer_one == game_answers[0]:
                correct = True
                index = 0
        
            if answer_two == game_answers[1]:
                correct = True
                index = 1
                
            if answer_three == game_answers[2]:
                correct = True
                index = 2
    
    return render_template("norse.html", norse_gods = data, user = user, correct = correct, index = index, user_score = get_user_score(user), update_score = update_score)


# Celtic.html route    
@app.route("/celtic", methods=["GET", "POST"])

def celtic():
    data = []
    
    answer_one = ""
    answer_two = ""
    answer_three = ""
    
    with open("03_milestone-three/static/json/gods_celtic.json", "r") as json_data:
        data = json.load(json_data)
        game_answers = []
        
        correct = False
        index = 0
        
        for god in data:
            game_answers.append(god["name"])

        if request.method == "POST":

            if request.form.get("answer1") is not None: 
                answer_one = request.form.get("answer1").title()
            if request.form.get("answer2") is not None:    
                answer_two = request.form.get("answer2").title()
            if request.form.get("answer3") is not None:
                answer_three = request.form.get("answer3").title()
     
            if answer_one == game_answers[0]:
                correct = True
                index = 0
        
            if answer_two == game_answers[1]:
                correct = True
                index = 1
                
            if answer_three == game_answers[2]:
                correct = True
                index = 2
    
    return render_template("celtic.html", celtic_gods = data, user = user, correct = correct, index = index, user_score = get_user_score(user), update_score = update_score)

    
##### File I/O #####

def set_user(username):
    """
    Assigns and stores the current username that is logged in
    """
    global user 
    user = username
    return user


def update_score(username, new_score):
    """
    Updates the user score for username with the new_score parameter passed to the function
    """
    # This dictionary will hold all scores for all users so this data will not be lost when writing to scores.txt
    all_user_scores = {}
    
    # Open scores.txt for writing both the username and score 
    # from the all_scores list with the dictionary for user:score values
    with open("03_milestone-three/data/scores.txt", "r+") as all_scores:
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
        with open("03_milestone-three/data/scores.txt", "w+") as scores:
            for user, score in all_user_scores.items():
                scores.write(user + "," + str(score) + "\n")
                

def get_user_score(username):
    """
    Reads the scores.txt file and finds the score for the username passed to the function parameter                
    """
    data = []
    score = 0
    
    # Read from the scores.txt file and extract score for the given user
    with open("03_milestone-three/data/scores.txt", "r") as scores:
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

app.run(host = os.getenv("IP"), port = os.getenv("PORT"), debug = False)