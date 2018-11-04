// Test chart functionality using sample data

function testCharts() {
    
    // Create chart variable and assign to ID
    var yearRingChart = dc.pieChart("#chart-tickets-per-topic");
    var yearRingChart2 = dc.pieChart("#chart-tickets-per-topic2");
    var yearRingChart3 = dc.pieChart("#chart-tickets-per-topic3");
    
    // Use sample data from D3.js library
    var data =  d3.csv("morley.csv")
    
    // Create dimensional view of data
    var ndx = crossfilter(data);
    
    // Dimension to measure number of features and bugs
    var topicDim = ndx.dimension( function(d) {
        return d.topic;
    });
    
    // Dimension to measure the status of the ticket where based
    // on the values (1, 2, 3) we assign a new value to be reflected
    // in the chart labels
    var statusDim = ndx.dimension( function(d) {
        console.log (d['status']);
        if (d['status'] == 1) {
            return "To Do";
        }
        else if (d['status'] == 2) {
            return "Doing"; 
        }
        else if (d['status'] == 3) {
            return "Done";
        }
    });
    
    // Assign group to count of fields in dimension
    var topicGroup = topicDim.group().reduceCount();
    var upvotesGroup = topicDim.group().reduceSum(dc.pluck("upvotes"));
    var statusGroup = statusDim.group().reduceCount();
    
    // Apply chart options
    
    // Number of tickets according to topic
    yearRingChart
        .width(200)
        .height(200)
        .dimension(topicDim)
        .group(topicGroup)
        .innerRadius(50);
    
    // Number of upvotes according to topic
    yearRingChart2
        .width(200)
        .height(200)
        .dimension(topicDim)
        .group(upvotesGroup)
        .innerRadius(50);
        
    // Number of tickets according to status
    yearRingChart3
        .width(200)
        .height(200)
        .dimension(statusDim)
        .group(statusGroup)
        .innerRadius(50);

    // Apply legends
    yearRingChart.legend (
        dc.legend()
            .x(65)
            .y(75)
            .itemHeight(12)
            .gap(4));
            
    yearRingChart2.legend (
        dc.legend()
            .x(65)
            .y(75)
            .itemHeight(12)
            .gap(4));
            
    yearRingChart3.legend (
        dc.legend()
            .x(65)
            .y(75)
            .itemHeight(12)
            .gap(4));

    // Render
    yearRingChart.render();
    yearRingChart2.render();
    yearRingChart3.render();

} // testCharts()