# Milestone Project Four

This project is an online cookbook application which allows users to create, edit and delete recipes they submit through 
online forms which provide further information relating to the recipe including;
* Recipe name
* Directions on how to prepare the recipe
* Image of the recipe
* Author name and nationality
* Ingredients
* Allergens
* Cuisine (which can be any of the following, Atlantic, Mediterranean, Italian, Asian, Indian, South American)
 

Using a MongoDB database to store the collection of recipes, each with its own information, this is then retrieved
and presented to the user in order to provide an overview of the recipes in their collection.


## UX
 
The project is centred on food enthusiasts looking for a simple and effective way of keeping record of their favourite recipes, while enabling them
to manage these recipes in order to provide control over those that they favour most using an upvotes feature while also allowing recipes to be
modified or deleted if needed.

Take for example the following user story, and how this project fulfills the goals of the user;

### User Story

User A is a food enthusiast looking for a simple way to create and keep record of his favourite recipes that she finds
online or elsewhere. User A also wants to have editing control of the recipes, while also being able to upvote certain recipes
she likes the most and have these presented visually so that she can digest information readily and efficiently.

**How the Project Fulfills User A's Goals**

This application provides a recording mechanism for which User A can add, edit and delete recipes using a simple online 
form to do so. In addition User A can upvote her favourite recipes and this information, combined with the recipe name
and cuisine type is presented visually using Google Charts to provide a visual interface that presents the recipes
across each cuisine and the number of upvotes for each.

The following resources are also available as part of the UX process for this project;
* [Wireframes]() - 
* [Mockups]() -
* [Schema]() -


## Features

This project contains the following pages;
* Home Page - Here is the hub of the website, which collates all recipes from the collection and presents each recipe and its associated details including the image, name, cuisine, author, directions and upvotes. In addition users can perform all CRUD operations here including adding, editing and deleting recipes or upvoting selecting recipes
* Add Recipe Page - Users can also go directly to the add recipe form using this page and this provides an additional path for users to achieve their end goals of adding recipes
* Edit Recipe Page - This page provides a form containing all the current information for the recipe that is being edited and enables users to update any of this information which will then be available to see in the home page
* Stats Page - Here using Google Charts, the fields cuisine, recipe name and upvotes are presented to highlight in a visually appealling manner the highest and lowest voted recipes enabling users to see this at a glance

 
### Existing Features

* 1 - **Adding a Recipe**
    1. Users can add new recipes to the project using an online form
* 2 - **Editing a Recipe**
    2. Users can edit existing recipes using an online form (pre-filled with existing values)
* 3 - **Deleting a Recipe**
    3. Users can delete existing recipes using a delete button
* 4 - **Upvote a Recipe**
    4. Users can upvote a recipe using a recipe button below each recipe
* 5 - **See Related Recipes According to Cuisine**
    5. Users can see other recipes with the same cuisine by clicking on a button to direct them to a page showing the related recipe images
* 6 - **Visualise Recipe Data**
    6. Users can see recipes, their cuisine and upvotes presented in a Google Chart with optional filtering on cuisine and number of upvotes

For reference the specific files implementing each feature above;
* 1 - *See templates/addrecipe.html and the add recipe and insert recipe routes in app.py for details of implementation*
* 2 - *See templates/editrecipe.html and the edit recipe and update recipe routes in app.py*
* 3 - *See delete recipe route in app.py for more information*
* 4 - *See upvote recipe in app.py for more* 
* 5 - *See templates/relatedrecipes.html and extract related recipes route for details*
* 6 - *See templates/stats.html and stats route in app.py for more*
 

### Features Left to Implement
- A **search bar function** to return recipes by name would be a useful feature particularly as the list of recipes grows larger


## Technologies Used

- **[HTML5](https://www.w3schools.com/html/default.asp)** - The templates and web pages are presented using HTML5 and other languages and frameworks including Flask
- **[CSS3](https://www.w3schools.com/css/default.asp)** - Style rules for the project are implemented with CSS3
- **[Python](https://www.python.org/)** - The application is built with Flask and Python is used to interact and implement the framework features including routes and interacting with the MongoDB database
- **[Flask](http://flask.pocoo.org/)** - The Flask framework provides the structure of the project and allows for template building and extension in order to remove duplicate code
- **[JQuery](https://jquery.com/)** - Used for enabling other javascript based libraries such as Bootstrap and also used alongside Google Charts
- **[JavaScript](https://developer.mozilla.org/bm/docs/Web/JavaScript)** - Used in interacting with and constructing Google Chart functionality
- **[MongoDB](https://www.mongodb.com/)** - The database used for storing the data is a MongoDB document related database provided by mLab
- **[mLab](https://mlab.com/)** - This was the cloud hosting MongoDB provider that was used to store the database
- **[Heroku](https://heroku.com/)** - The chosen deployment platform used to deploy the project
- **[Google Charts](https://developers.google.com/chart/)** - A javascript based library used for creating visualisations
- **[Google Fonts](https://fonts.google.com/)** - The chosen font for the project was sourced from this library
- **[GitHub](https://github.com/)** - The version control system used for tracking changes and storing code
- **[Bootstrap](https://getbootstrap.com/)** - The framework was used to construct components of this website and many features such as its forms and classes were implemented
- **[MaterializeCSS](https://materializecss.com/)** - A CSS library with many useful styling features including icons were used in this project
- **[Cloud9](https://c9.io/)** - The IDE used for this project


## Testing

Testing has been done on the project across different devices. While the project functions solidly on mobile and desktop screen sizes, there
are some changes to how elements are presented on screen which should be noted;
* **Google Charts** - The chart is not fully responsive on a mobile screen and so will overflow outside the boundary when viewed vertically. However when rotated horizontally
Users can still view and navigate the filters without issue, and for this reason compacting the chart and filters to such a size as would fit
within a mobile vertical boundary was not implemented and would potentially make chart elements less easier to navigate
* **Recipes** - Recipe information on mobile now falls beneath the image for the recipe instead of adjacent to it as in desktop but all
functionality including buttons and navigation are fully usable and the user is in no way hindered from using the application
* **Forms** - Forms elements are fully responsive and not of any issue

Along with these observations, the following are some tested scenarios in order to ensure functionality was present.
- **Scenario 1 - Submitting Recipes With Tabbing and/or Spacing**
    1. When adding a recipe, do not place directions as instructed on a separate line and indent list ingredients
    2. Then while editing the same recipe, verify no escape characters or erroneous data are present 

- **Scenario 2 - Apply Filters to Google Chart**
    1. Go to Recipe Statistics and drag the slider to adjust the number of upvotes (***NOTE** this will only work when there is more than one value*)
    2. Apply a filter to the cuisine category and verify chart changes to match applied filter

- **Scenario 3 - Show Related Recipes for Chosen Recipe**
    1. Find a recipe in the Home page and click on Show Related Recipes button
    2. Ensure that the recipes shown are also of the same cuisine and **_not_** the same as the current recipe

Additional testing is planned as more features are introduced.


## Deployment

Deployment is through the Heroku platform. The project can be accessed via the following URL;
- https://custom-online-cookbook-app.herokuapp.com/

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

### Content
- The sample recipes provided are from the [BBC](https://www.bbc.com/food).

### Acknowledgements
- [BlackrockDigital](https://github.com/BlackrockDigital/startbootstrap-portfolio-item) for providing the Portfolio Item Bootstrap theme used in this project.
