# Milestone Project Five

This project is a Django driven web application that allows users to create tickets, tickets
that either specify a bug that they would like fixed or a feature that they would like implemented.
The project, called Issue Tracker Prime provides users with a issue tracking mechanism where in addition
to creating new tickets to raise bugs or support features, users can comment on tickets to start a conversation
or make a pledge to support a feature, the higher the amount pledged the sooner the feature will be 
introduced. Using the Stripe API to handle payment processing and the Django framework to implement the project
with built-in user authentication, this project is designed to be both scalable and have secure measures in place to encourage user interaction
by providing a tool that allows users to raise issues they encounter or support features they would like most to see.

Each ticket will be classed as either a BUG or FEATURE. For BUGS each ticket will include the following information;

* Name
* Description
* Upvotes
* Comments
* Date of creation

In addition to the above fields, if the ticket is a feature request, the following fields will be presented;
 
* Total Pledged (Users can support FEATURES by making a payment of €5.00 **see below**)
* Pay with Card facility that allows payments to be made in support of a given feature. The higher the total pledged the sooner the feature will be introduced


## UX
 
The project is centered around issue tracking and as such focuses on user interaction and 
engagement to identify issues that need attention (such as BUGS) and also encourage
continued development of FEATURES that are most supported from within the community of users.

Take for example the following user story, and how this project fulfills the goals of the user;

### User Story

User A is a software tester working for a start-up IT company and would like to have access to a simple service of raising any bugs
or feature requests with a service provider that he feels would benefit his company or improve or expedite his workload.
As his company is a start-up, costs are very important and the service provider chosen must be able to listen to 
customers and provide a simple yet useful mechanism for allowing his company to thrive and as it grows have access to features
that will improve his workflow.

**How the Project Fulfills User A's Goals**

This application allows User A to actively
raise any issues using the ticket system of creating new tickets to submit any bugs that he encountered while using our
service. In addition User A can request features to be introduced, ones that he feels will benefit himself and his
company and based on the support received via pledge support, may be introduced. Different users of the service like
User A will also be actively creating and supporting new features which may have unforeseen benefits to User A and 
his company. Also comments made for bugs or features may provide a simple solution that User A needs and this community
of fellow issue trackers provides a cost effective solution to User A's start-up company and will likely improve his
workflow in the short and long term.

The following resources are also available as part of the UX process for this project;
* [Design Mockups](https://www.dropbox.com/sh/i0c3u2iqg09i63l/AAD_Eo7dxRCzM3E00SwlyMNta?dl=0) - Initial design documentation for project including mockups 


## Features

This project contains the following pages;
* **Home Page** - The main page that introduces the service and its offering by providing a description of its key features and characteristics
* **Issue Tracking Page** - This is the main area of the project where users can see current tickets including their name, description, upvotes, comments and date created. In addition authenticated users can support features which will have a total pledged and payment option to support the feature available. Users can also filter the tickets shown based on given criteria including topic (BUG or FEATURE), name, upvotes and status (TO DO, DOING, DONE)
* **Issue Stats Page** - Here using the DC charts library, data is presented visually to highlight key metrics for tickets raised including number of tickets that are bugs and features and also the total amount pledged for all features 
* **Register Page** - A form allows users to register their username, email and password (which must be confirmed) in order to login and access authenticated functionality such as posting a comment and/or make payments in support of features
* **Login Page** - A form allowing registered users to enter their credentials and login. A forgot password option is available and allows user to reset their password by entering an email address

This project also uses custom Django authentication templates to manage URL paths and provide user authentication functionality including;
* **Password Reset Form** - A form allowing users to enter an email and receive a link to reset their password
* **Password Reset Done** - A page that confirms email has been sent to reset password
* **Password Reset Email** - An email template that provides the password reset link and instructions for the user
* **Password Reset Confirm** - A form allowing users to confirm their new password
* **Password Reset Complete** - A page that confirms password has been successfully reset 

### Existing Features

#1 **Creating a ticket**
* Users can create new tickets using a form

#2 **Filtering tickets shown**
* Users can filter what tickets are shown based on criteria including name, upvotes and status

#3 **Adding comments to tickets**
* Users who are logged in can add comments to a ticket

#4 **Make payments to support features**
* Users who are logged in can make payments through Stripe to support a feature

#5 **Register**
* Users can register a username, email and password in order to log in and access additional features

#6 **Login**
* Users can login using a form

#7 **Logout**
* Authenticated users can logout

#8 **Reset Password**
* Users who have forgot their password can request a reset using a form and following the instructions and email link to create a new password

For reference the specific files implementing each feature above;
* 1 - *See templates/tickets.html and tickets app for details of implementation*
* 2 - *See the return tickets view in tickets/views.py for more information*
* 3 - *See the add comment view in tickets/views.py for more information*
* 4 - *See the make payment view in tickets/views.py for more information* 
* 5 - *See the register view in auth/views.py for more information*
* 6 - *See the login view in auth/views.py for more information*
* 7 - *See the logout view in auth/views.py for more information*
* 8 - *See templates/registration/password_reset_form.html for more information*


## Technologies Used

- **[HTML5](https://www.w3schools.com/html/default.asp)** - The templates and web pages are presented using HTML5 and other languages and frameworks including Django
- **[CSS3](https://www.w3schools.com/css/default.asp)** - Style rules for the project are implemented with CSS3
- **[Python](https://www.python.org/)** - The application is built with Django and Python is used to interact and implement the framework features including adding apps with models and views to run the application
- **[Django](https://www.djangoproject.com/)** - The Django framework provides templates for the project in addition to libraries for creating models for working with forms and data and also authentication
- **[JQuery](https://jquery.com/)** - Used for enabling other javascript based libraries such as Bootstrap and also used alongside The DC charting library
- **[JavaScript](https://developer.mozilla.org/bm/docs/Web/JavaScript)** - Used in interacting with and constructing DC chart functionality and also to interact and display the Stripe API checkout
- **[Postgres](https://www.postgresql.org/)** - The database used for storing the data
- **[Heroku](https://heroku.com/)** - The chosen deployment platform used to deploy the project
- **[Jasmine](https://jasmine.github.io/index.html)** - Jasmine is a behavior-driven development framework for testing JavaScript code 
- **[D3.js](https://d3js.org/)** - A JavaScript library for producing dynamic, interactive data visualizations
- **[DC.js](https://dc-js.github.io/dc.js/)** - A javascript based library used for creating visualisations based on D3.js library
- **[Crossfilter.js](http://square.github.io/crossfilter/)** - A javascript library for creating multi dimensional data
- **[Stripe](https://stripe.com/ie)** - An online payment processing system used to handle payments for feature support
- **[Google Fonts](https://fonts.google.com/)** - The chosen font for the project was sourced from this library
- **[GitHub](https://github.com/)** - The version control system used for tracking changes and storing code
- **[Bootstrap](https://getbootstrap.com/)** - The framework was used to construct components of this website and many features such as its forms and classes were implemented
- **[Font Awesome](https://fontawesome.com/)** - A library of font icons used in this project
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
* [Milestone 5 Testing File](https://www.dropbox.com/s/u76rtskcf3pg0kz/M5_Testing.txt?dl=0)

Additional testing is planned as more features are introduced.


## Deployment

Deployment is through the Heroku platform. The project can be accessed via the following URL;
- https://issue-tracker-prime.herokuapp.com/

Deployment requires additional files in order to function including;
- The DATABASE_URL value needs to be specified by creating these in the CONFIG VARS section of the app settings or by manually adding a Postgres add-on to the application from within the Heroku dashboard
- A requirements.txt and Procfile are needed for deploying to Heroku in order to specify the language implementation used for the project and that it is to be a gunicorn web application
- A separate GitHub branch named heroku is also used to commit and push changes (This code is not visible on GitHub)

See **requirements.txt** for the necessary dependencies in order to run this code locally or on a IDE of your choice(Cloud9 was used for this project). In addition the steps for deploying to the Heroku platform are;
1. If not already done, set up an account with [Heroku](https://www.heroku.com/)
2. Create a new app
3. Follow instructions to add heroku branch within your remote Git repository
4. Create a requirements.txt and Procfile
5. Commit all necessary code to the heroku branch
6. Push all changes
7. In the heroku dashboard, be sure to set up DATABASE_URL or manually add a Postgres add-on to your application
8. In order to host static files on Heroku, make sure the whitenoise library is installed (see requirements.txt)
9. Restart all dynos and the application should now be live


## Credits

### Acknowledgements
- [Good discussion for working with Django variables and templates](https://stackoverflow.com/questions/298772/django-template-variables-and-javascript)
- [Useful guide to working with Django filters](https://simpleisbetterthancomplex.com/tutorial/2016/11/28/how-to-filter-querysets-dynamically.html) 
- [Helpful discussion on models in Django and how to integrate separate models using foreign keys](https://stackoverflow.com/questions/38103127/saving-a-comment-object-to-a-post-in-a-blog-in-django-database)