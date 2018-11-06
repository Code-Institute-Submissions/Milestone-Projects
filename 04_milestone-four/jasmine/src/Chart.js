// Test Google chart functionality using sample data

$(document).ready(function() {  
    
    google.charts.load('current', {'packages':['corechart', 'table', 'gauge', 'controls']});
    google.charts.setOnLoadCallback(drawMainDashboard);

    function drawMainDashboard() {
        var dashboard = new google.visualization.Dashboard(
          document.getElementById('dashboard_div'));
        var slider = new google.visualization.ControlWrapper({
        'controlType': 'NumberRangeFilter',
        'containerId': 'slider_div',
        'options': {
          // Filter applied to 'Upvotes' column
          'filterColumnIndex': 2,
          'ui': {
            'labelStacking': 'vertical',
            'label': 'Number of Upvotes:'
          }
        }
        });
        
        var categoryPicker = new google.visualization.ControlWrapper({
        'controlType': 'CategoryFilter',
        'containerId': 'categoryPicker_div',
        'options': {
          // Enable 'Cuisine Type' as a dropdown filter
          'filterColumnIndex': 0,
          'ui': {
            'labelStacking': 'vertical',
            'label': 'Cuisine Type:',
            'allowTyping': false,
            'allowMultiple': false
          }
        }
        });
        
        var pie = new google.visualization.ChartWrapper({
        'chartType': 'PieChart',
        'containerId': 'chart_div',
        'options': {
          'width': 300,
          'height': 300,
          'legend': 'none',
          // Area for setting custom position for chart
          // 'chartArea': {'left': 15, 'top': 15, 'right': 0, 'bottom': 0},
          'pieSliceText': 'label'
        },
        'view': {'columns': [0, 2]}
        });
        
        var table = new google.visualization.ChartWrapper({
        'chartType': 'Table',
        'containerId': 'table_div',
        'options': {
        }
        });
        
        // Variables to store the chart_data array from data.csv and then use data 
        // from chart_data to create a datatable to store in data and use this to draw the chart
        var data;
        var chart_data;
        
        // Retrieve the file and apply Papa.parse() function from imported library to transform into an array
        var csv = jQuery.get('src/data.csv', function(file) {
        now: jQuery.now();
        Papa.parse(file, {
          // Set upvotes to numbers instead of strings
          dynamicTyping: true,
          // Ignore empty lines
          skipEmptyLines: true,
          complete: function(results) {
            console.log(results.data);
            // Assign array to chart_data
            chart_data = results.data;
          }
        });
        
        // Create new datatable for chart
        data = new google.visualization.DataTable();
        // Create the header using chart_data's first array and each entry will be given its data type
        data.addColumn('string', chart_data[0][0]);
        data.addColumn('string', chart_data[0][1]);
        data.addColumn('number', chart_data[0][2]);
        var arrayLength = chart_data.length;
        
        // Now for each other array in chart_data, assign the array as rows in data
        for (var i = 1; i < arrayLength; i++) {
          data.addRows([
            chart_data[i]
            ]);
        }
        // Put the elements into the chart
        dashboard.bind([slider, categoryPicker], [pie, table]);
        // Draw using the datatable var data
        dashboard.draw(data);
        
        });
        // jQuery.GET()
    }
    // drawMainDashboard()
});
// document.ready()