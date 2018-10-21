# Milestone Project Two

This project presents a dashboard on property rental in Ireland. Using data from the Central Statistics Office, the dashboard
aims to show how rent in Ireland has continued to climb year on year during the period 2013 to 2017 and in order to present a 
more detailed analysis, several additional variables from the source dataset are visualised including number of rooms per property and the type of property.

The main focus here is to highlight the differences in rent according to these variables in spite of the common trend of rising rent across each year from 2013 to 2017 that the data presents.

The variables in this dataset* include;
* **Type** - Detached house, Semi detached house, Terrace house, Apartment, Other flats and All property types
* **Num_Rooms** - One bed, Two bed, Three bed, Four bed, 1 to 2 bed, 1 to 3 bed and Four plus bed and All bedrooms
* **Location** - Data for each county in the republic is included however note that not all counties have rental data available (Therefore this variable has not been used for visualisation purposes)
* **_2013** - Average monthly rent for 2013. Note this has been aggregated within the dashboard for yearly estimates
* **_2014** - Average monthly rent for 2014. Note this has been aggregated within the dashboard for yearly estimates
* **_2015** - Average monthly rent for 2015. Note this has been aggregated within the dashboard for yearly estimates
* **_2016** - Average monthly rent for 2016. Note this has been aggregated within the dashboard for yearly estimates
* **_2017** - Average monthly rent for 2017. Note this has been aggregated within the dashboard for yearly estimates

***Source** [Central Statistics Office](https://www.cso.ie/px/pxeirestat/Database/eirestat/Residential%20Tenancies%20Board%20(RTB)/Residential%20Tenancies%20Board%20(RTB)_statbank.asp?SP=Residential%20Tenancies%20Board%20(RTB)&Planguage=0&ProductID=DB_RI)


## UX
 
The project is focused on providing an analysis through visual representation in the form of charts built with the DC.js library to inform users of the current property rental trend in Ireland for the previous five years.
As this is not an exhaustive analysis and considers only a few variables, it is designed more to provide an executive summary to individuals interested in trends in the rental sector rather than a comprehensive overview of property rental in Ireland.

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
* **Home** - The main feature of the website which contains the charts and associated descriptions
* **About** - A page providing background to the website and further reading for users interested in the subject matter along with a link to the dataset used in the application
* **Contact** - A contact form where users can submit a message

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

The project is deployed using GitHub Pages, links for each page are provided below;
1. [Home](https://s-downes.github.io/Milestone-Projects/02_milestone-two/index.html)
2. [About](https://s-downes.github.io/Milestone-Projects/02_milestone-two/about.html)
3. [Contact](https://s-downes.github.io/Milestone-Projects/02_milestone-two/contact.html)


## Credits

### Acknowledgements
- [Working with data in D3.js](http://www.tutorialsteacher.com/d3js/loading-data-from-file-in-d3js)
- [Useful tool for centering elements with CSS](http://howtocenterincss.com/)
- [Helpful discussion on working with line charts and aligning labels](https://github.com/dc-js/dc.js/issues/662)
- [Helpful code on testing charts with Jasmine](https://github.com/nianurag/D3.js-Chart-with-Jasmine-Test-Cases/tree/master/DonutChart)