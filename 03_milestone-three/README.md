# Milestone Project Three

This project is a mythology based game where users are presented with a selection of images and must correctly identify the
name of the god being displayed. If so they score 100 points otherwise they are prompted to try again. Users can choose their own game 
pathway from either Greek, Norse or Celtic mythology and the images displayed will be from each mythology chosen. 

The development of this project utilises the Flask framework along with the python programming language to bring together the core components of the application and is deployed using the heroku platform.


## UX
 
The project makes use of the Bootstrap framework to implement many features of the application such as the navigation
and contact form elements in addition to the grid system for structure and layout. As the project is designed to be
a game, user interaction through form submission is a main feature of the project and the logic to handle this aspect
utilises Flask and python. The design also uses artwork and custom fonts to provide a rich game experience and one
that users interested in video games will appreciate both for the art and the text used which aims to be more in
keeping with many of the games in the market today.

Take for example the following user story, and how this project fulfills the goals of the user;

### User Story

User A is interested in video games and game design and is particularly interested in text based and quiz based games. He normally uses
apps or PC games but is interested in exploring web based games which provide a rich design combining artwork and other design 
features such as icons to highlight content. User A would like to be able to view leaderboards to see where he and other players
rank overall and would also like to have a contact facility in order to make suggestions or requests for new features.

**How the Project Fulfills User A's Goals**

This application is rich in both artwork and design elements such as icons from the Font Awesome library which User A would 
likely appreciate as someone interested in video games and game design. In addition the three quiz paths User A can take, which are
Greek, Norse and Celtic quiz based games will provide users interested in quiz based games an interactive and visually interesting experience.
The leaderboards facility will showcase all players where User A can view the scores of all players and finally the contact page provides an
opportunity for User A to make suggestions or comments about the application.

The following resources are also available as part of the UX process for this project;
* [Design Mockups](https://www.dropbox.com/sh/5a4n69nqbmcj13q/AADsE5yzRSF_lAR_rNA2lEn1a?dl=0) - Initial design documentation for project including mockups 


## Features

This project contains the following pages;
* **Login** - The login page accept user logins via a form submission of their username which is then added to users.txt and scores.txt
* **Home** - The home page with a welcome banner to the user who has logged in and each game path available
* **Greek** - This is the greek mythology game path with gods from the greek pantheon
* **Norse** - This is the norse mythology game path with gods from the norse pantheon
* **Celtic** - This is the celtic mythology game path with gods from the celtic pantheon
* **About** - A description of the website is displayed along with links to each game path
* **Leaderboards** - This page shows each user and their score presented in a table
* **Contact** - A contact form with fields which a user can submit
* **Base** - This is the base template which all other templates above extend and includes the navigation and footer elements

### Existing Features

#1 **Login and become a registered user**
* Users are prompted to enter a username to login where users who have already registered have their existing score saved and carried forward

#2 **Play Greek, Norse and Celtic mythology based quiz games**
* Users can play any one of three given quiz paths and are faced with three questions in each where they can play to score points

#3 **View leaderboards**
* Users can view the leaderboards table to see their own and other users scores

#4 **Submit a message**
* Users can also submit a message if they would like to request additional information or features

For reference, the specific files implementing each feature above;
* 1 - *See templates/login.html and the login view function in app.py for details of implementation*
* 2 - *See templates/greek.html, templates/norse.html and templates/celtic.html and the greek, norse and celtic view functions in app.py for more information*
* 3 - *See leaderboards.html and the leaderboards view function in app.py*
* 4 - *See contact.html for more information*


## Technologies Used

- **[HTML5](https://www.w3schools.com/html/default.asp)** - The templates and web pages are presented using HTML5
- **[CSS3](https://www.w3schools.com/css/default.asp)** - Style rules for the project are implemented with CSS3
- **[JQuery](https://jquery.com/)** - Used for enabling other javascript based libraries such as Bootstrap
- **[JavaScript](https://developer.mozilla.org/bm/docs/Web/JavaScript)** - Used for tasks such as declaring a script to hide navigation elements on the login page
- **[Python](https://www.python.org/)** - The application is built with Flask and Python is used to interact with and implement the framework features
- **[Flask](http://flask.pocoo.org/)** - The Flask framework provides the structure of the project and allows for template building and extension in order to remove duplicate code
- **[Jasmine](https://jasmine.github.io/index.html)** - Jasmine is a behavior-driven development framework for testing JavaScript code 
- **[Google Fonts](https://fonts.google.com/)** - The chosen font for the project was sourced from this library
- **[GitHub](https://github.com/)** - The version control system used for tracking changes and storing code
- **[Bootstrap](https://getbootstrap.com/)** - The Bootstrap framework was used to construct components of this website and many features such as its forms and classes were implemented
- **[Font Awesome](https://fontawesome.com/)** - A large library of font icons used in this project
- **[Heroku](https://heroku.com/)** - The chosen deployment platform used to deploy the project
- **[Cloud9](https://c9.io/)** - The IDE used for this project


## Testing

### HTML5 & CSS3

This project has been fully validated by the CSS3 validator;

* CSS3 - https://jigsaw.w3.org/css-validator/

### Jasmine

The JavaScript code used in this application has been tested using the Jasmine framework. 

In order to run the test file;
* Run jasmine/SpecRunner.html to view test results in your browser

In addition the full tests are found in the jasmine/spec directory of this project. Refer to this for details of testing implemented.

The full list of other test scenarios applied to this application can be found by following the link below;
* [Milestone 3 Testing File](https://www.dropbox.com/s/khyggo1d0akpihf/M3_Testing.txt?dl=0)

Additional testing is planned as more features are introduced.


## Deployment

This project is deployed using the heroku platform and can be found via the link below.
1. [Milestone Three Project Link](https://champions-of-myth.herokuapp.com/) 

Deployment requires additional files in order to function including;
- The IP and PORT values need to be specified by creating these in the CONFIG VARS section of the app settings
- A requirements.txt and Procfile are needed for deploying to Heroku in order to specify the language implementation used for the project and that it is to be hosted via the web
- A separate GitHub branch named heroku is also used to commit and push changes (This code is not visible on GitHub)

See **requirements.txt** for the necessary dependencies in order to run this code locally or on a IDE of your choice(Cloud9 was used for this project). In addition the steps for deploying to a Heroku platform are;
1. If not already done, set up an account with [Heroku](https://www.heroku.com/)
2. Create a new app
3. Follow instructions to add heroku branch within your remote Git repository
4. Create a requirements.txt and Procfile
5. Commit all necessary code to the heroku branch
6. Push all changes
7. In the heroku dashboard, be sure to set up IP and PORT CONFIG VARS
8. Restart all dynos and the application should now be live


## Credits

### Acknowledgements
- [Working with and checking existing values in python files](https://stackoverflow.com/questions/28397798/check-existing-values-in-text-file-before-appending-new-values)
- [Calling python functions through Flask](https://stackoverflow.com/questions/27101508/call-python-function-using-html)
- [Useful overview of working with Flask](http://flask.pocoo.org/docs/1.0/quickstart/#a-minimal-application)
- [Helpful discussion on testing element visibility through Jasmine](https://stackoverflow.com/questions/31590552/jasmine-jquery-check-if-element-is-visible)