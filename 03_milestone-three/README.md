# Milestone Project Three

This project is a mythology based game where users are presented with a selection of images and must correctly identify the
name of the god being displayed, if so they score 100 points otherwise they are prompted to try again. Users can choose their own game 
pathway from either Greek, Norse or Celtic mythology and the images displayed will be from each mythology chosen. 

The development of this project has utilised the flask framework along with python 3 and a Start Bootstrap template aptly called Heroic Features
to bring together the components of the project into a functioning website. The project was then deployed
using the heroku platform.


## UX
 
The project 

Take for example the following user story, and how this project fulfills the goals of the user;

### User Story

User A is interested in renting a property in Ireland and would like to be able to view information on rental
trends and which property types are the most and least expensive. In addition he would like to see how number
of bedrooms affects the rent paid. User A would like links and further information about where he can get more 
reports as he wants to give enough time and consideration before renting a property, but would like a concise
summary of the most important trends that he should be aware of before he enters the rental property market.

**How the Project Fulfills User A's Goals**

This application provides a summary of the key trends in the Irish rental market that User A should be aware of including
the average rent paid according to property type and number of rooms for the previous five years. There are further resources
available and the About section of this website provides sample data and links to reports which could better inform User A
should he need it. Overall, this application is designed to provide a concise presentation of rental figures in Ireland
and links to the dataset used are also provided if User A would like to examine the data more closely. A Contact page also
facilitates further engagement from interested users such as User A where further and more relevant information may be
presented in the future as new data is collected.

The following resources are also available as part of the UX process for this project;
* [Design Mockups](https://www.dropbox.com/sh/tlopb4x00furge9/AAAZeUYdaDZLmNQ99td80ghka?dl=0) - Initial design documentation for project including mockups 


## Features

This project contains the following pages;
* **Login** - The login page accept user logins via a form submission of their username which is then added to users.txt and scores.txt.
* **Home** - The home page with a welcome banner to the user who has logged in and each game path available.
* **Greek** - This is the greek mythology game path with gods from the greek pantheon.
* **Norse** - This is the norse mythology game path with gods from the norse pantheon.
* **Celtic** - This is the celtic mythology game path with gods from the celtic pantheon.
* **About** - A description of the website is displayed along with links to each game path.
* **Leaderboards** - This page shows each user and their score presented in a table.
* **Contact** - A contact form with fields which a user can submit.
* **Base** - This is the base template which all other templates above extend and includes the navigation and footer elements.

### Existing Features

#1 **Filter charts**
* Users can explore charts and apply filters which will filter each chart in the application

#2 **Access further resources and source data**
* Users are provided with links to further resources and a link to the dataset used in the application

#3 **Submit a message**
* Users can also submit a message if they would like to request additional information or features

For reference, the specific files implementing each feature above;
* 1 - *See jasmine/src/Chart.js for details of chart implementation*
* 2 - *See about.html for more information*
* 3 - *See contact.html for more information*


## Technologies Used

- **[HTML5](https://www.w3schools.com/html/default.asp)** - The templates and web pages are presented using HTML5
- **[CSS3](https://www.w3schools.com/css/default.asp)** - Style rules for the project are implemented with CSS3
- **[JQuery](https://jquery.com/)** - Used for enabling other javascript based libraries such as Bootstrap
- **[JavaScript](https://developer.mozilla.org/bm/docs/Web/JavaScript)** - Used for tasks such as declaring a script to plot charts used in the application and for creating charts with the D3.js and DC.js libraries
- **[D3.js](https://d3js.org/)** - A JavaScript library for producing dynamic, interactive data visualizations
- **[DC.js](https://dc-js.github.io/dc.js/)** - A JavaScript charting library with native crossfilter support for multi-dimensional charting and use of D3.js to render charts for CSS compatability
- **[Crossfilter.js](http://square.github.io/crossfilter/)** - A JavaScript library for exploring large multivariate datasets in the browser
- **[Queue.js](https://github.com/d3/d3-queue)** - A library for evaluating concurrent tasks  
- **[Jasmine](https://jasmine.github.io/index.html)** - Jasmine is a behavior-driven development framework for testing JavaScript code 
- **[Google Fonts](https://fonts.google.com/)** - The chosen font for the project was sourced from this library
- **[GitHub](https://github.com/)** - The version control system used for tracking changes and storing code
- **[Bootstrap](https://getbootstrap.com/)** - The Bootstrap framework was used to construct components of this website and many features such as its forms and classes were implemented
- **[Font Awesome](https://fontawesome.com/)** - A large library of font icons used in this project
- **[Cloud9](https://c9.io/)** - The IDE used for this project


## Testing

### HTML5 & CSS3

This project has been fully validated by the W3C HTML5 and CSS3 validators;

* HTML5 - https://validator.w3.org/
* CSS3 - https://jigsaw.w3.org/css-validator/

### Jasmine

The JavaScript code for creating the charts used in this application has been tested using the Jasmine framework. 

In order to run the test file;
* Run jasmine/SpecRunner.html to view test results in your browser

In addition the full tests are found in the jasmine/spec directory of this project. Refer to this for details of testing implemented.

The full list of other test scenarios applied to this application can be found by following the link below;
* [Milestone 2 Testing File](https://www.dropbox.com/s/4wwui7jrxdj2bvp/M2_Testing.txt?dl=0)

Additional testing is planned as more features are introduced.


## Deployment

This project is deployed using the heroku platform and can be found via the link below.
1. [Milestone Three Project Link](https://champions-of-myth.herokuapp.com/) 


## Credits

### Acknowledgements
- [Working with data in D3.js](http://www.tutorialsteacher.com/d3js/loading-data-from-file-in-d3js)
- [Useful tool for centering elements with CSS](http://howtocenterincss.com/)
- [Helpful discussion on working with line charts and aligning labels](https://github.com/dc-js/dc.js/issues/662)
- [Helpful code on testing charts with Jasmine](https://github.com/nianurag/D3.js-Chart-with-Jasmine-Test-Cases/tree/master/DonutChart)