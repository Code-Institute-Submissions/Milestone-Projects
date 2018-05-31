// Test for console

console.log("hello worlds!");

// Load in data

// var data = [
//     { "player": "boomhauer", "rebound_avg": 12.1, "salary": 4000, "point_avg": 15 },
//     { "player": "bill", "rebound_avg": 4.2, "salary": 3000, "point_avg": 20 },
//     { "player": "hank", "rebound_avg": 12.1, "salary": 4000, "point_avg": 15 },
//     { "player": "dale", "rebound_avg": 16.1, "salary": 6000, "point_avg": 4 },
// ];


var dataset = function(dataset) {
    d3.csv(dataset)
        .row(function(d) {
            return {
                _2017: +d._2017,
                _2016: +d._2016,
                _2015: +d._2015,
                _2014: +d._2014,
                _2013: +d._2013,
            };
        })
        .get(function(data) {
            console.log(data);
        });
    return dataset;
};

function plot_bar(data) {

    d3.csv(data, function(errors, data) {
        var mycrossfilter = crossfilter(data);

        var dim = mycrossfilter.dimension(function(data) {
            return (data.Type);
        });
        var group = dim.group().reduceSum(dc.pluck("_2017"));

        var avg_rent_chart_by_type_2017 = dc.barChart("#chart-1");

        avg_rent_chart_by_type_2017
            .width(300)
            .height(150)
            .margins({ top: 10, right: 50, bottom: 30, left: 50 })
            .dimension(dim)
            .group(group)
            .transitionDuration(500)
            .x(d3.scaleOrdinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Type")
            .yAxisLabel("Rent 2017")
            .yAxis().ticks(4);

        dc.renderAll();
    });

} // plot_bar()

function plot_pie(data) {

    d3.csv(data, function(errors, data) {
        var mycrossfilter = crossfilter(data);

        var dim = mycrossfilter.dimension(function(data) {
            return (data.Type);
        });

        var avg_rent_2017 = dim.group().reduceSum(dc.pluck("_2017"));

        var avg_rent_chart_by_type_2017 = dc.pieChart("#chart-2");

        avg_rent_chart_by_type_2017
            .width(200)
            .height(200)
            .slicesCap(17)
            .radius(90)
            .dimension(dim)
            .group(avg_rent_2017)
            .renderLabel(true);

        dc.renderAll();
    });

} // plot_pie()

function plot_stacked_bar(data) {

    d3.csv(data, function(errors, data) {
        var mycrossfilter = crossfilter(data);

        var dim = mycrossfilter.dimension(function(data) {
            return (data.Type);
        });

        var avg_rent_2017 = dim.group().reduceSum(function(d) { return d._2017; });
        var avg_rent_by_location = dim.group().reduceSum(function(d) { return d.Location; });

        var avg_rent_2017_by_location = dc.barChart("#chart-3");
        avg_rent_2017_by_location
            .width(300)
            .height(150)
            .margins({ top: 10, right: 50, bottom: 30, left: 50 })
            .dimension(dim)
            .group(avg_rent_2017, "Avg Rent")
            .stack(avg_rent_by_location, "Location")
            .transitionDuration(500)
            .x(d3.scaleOrdinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Type")
            .yAxisLabel("Avg Rent")
            .legend(dc.legend().x(420).y(0).itemHeight(15).gap(5));

        avg_rent_2017_by_location.margins().right = 100;

        dc.renderAll();
    });

} // plot_stacked_bar()

function plot_line(data) {

    d3.csv(data, function(errors, data) {
        var mycrossfilter = crossfilter(data);

        var dim = mycrossfilter.dimension(function(data) {
            return (data.Type);
        });

        var avg_rent_2013 = dim.group().reduceSum(function(d) { return d._2013; });
        var avg_rent_2014 = dim.group().reduceSum(function(d) { return d._2014; });
        var avg_rent_2015 = dim.group().reduceSum(function(d) { return d._2015; });
        var avg_rent_2016 = dim.group().reduceSum(function(d) { return d._2016; });
        var avg_rent_2017 = dim.group().reduceSum(function(d) { return d._2017; });

        var ord_type_domain = dim.top(Infinity).map(function(d) { return d.Type });

        var avg_rent_by_type_2013_2017 = dc.compositeChart("#chart-4");
        avg_rent_by_type_2013_2017
            .width(800)
            .height(300)
            .dimension(dim)
            .elasticY(true)
            .brushOn(false)
            .yAxisLabel("Avg Rent 2013 - 2017")
            .xAxisLabel("Type")
            .valueAccessor(function(d) {
                return d.value;
            })
            .title(function(d) {
                return "\nAvg Monthly Rent for " + d.key + " property type 2013-2017: " + Math.round(d.value);
            })
            .x(d3.scaleOrdinal().domain(dim.top(Infinity).map(function(d) { return d.Type })))
            .xUnits(dc.units.ordinal)
            .compose([
                dc.lineChart(avg_rent_by_type_2013_2017).group(avg_rent_2013, "2013").colors("red"),
                dc.lineChart(avg_rent_by_type_2013_2017).group(avg_rent_2014, "2014").colors("blue"),
                dc.lineChart(avg_rent_by_type_2013_2017).group(avg_rent_2015, "2015").colors("green"),
                dc.lineChart(avg_rent_by_type_2013_2017).group(avg_rent_2016, "2016").colors("purple"),
                dc.lineChart(avg_rent_by_type_2013_2017).group(avg_rent_2017, "2017").colors("orange")
            ])
            .legend(dc.legend().x(45).y(20).itemHeight(8).gap(4));

        dc.renderAll();
    });

} // plot_line()

d3.csv("/TEMP-GITHUB-SUBMISSION-DIRECTORY/milestone-two/assets/data/RTB-Avg-Monthly-Rent-Type-Location.csv", function(data) {
    // data.forEach(function(d) {
    //     d._2017 = +d._2017; // convert "Year_" column to Number
    //     d._2016 = +d._2016; // convert "Year_" column to Number
    //     d._2015 = +d._2015; // convert "Year_" column to Number
    //     d._2014 = +d._2014; // convert "Year_" column to Number
    //     d._2013 = +d._2013; // convert "Year_" column to Number
    //     d.Location = d.Location;
    //     d.Type = d.Type;
    //     d.Num_Rooms = d.Num_Rooms;
    // });
    dataset = data;
    // }, function(error, rows) {

    //     console.log(rows);

    //     // Print some summary statistics

    //     console.log("The minimum value in this data is " + d3.min(function(d) { return d.year_17 }));
    //     console.log("The maximum value in this data is " + d3.max(function(d) { return d.year_17 }));
    //     console.log("The mean of this data is " + d3.mean(function(d) { return d.year_17 }));
    //     console.log("The sum of this data is " + d3.sum(function(d) { return d.year_17 }));

});


// Call the functions to plot the different charts

// plot_bar(dataset("/TEMP-GITHUB-SUBMISSION-DIRECTORY/milestone-two/assets/data/RTB-Avg-Monthly-Rent-Type-Location.csv"));
plot_pie("/TEMP-GITHUB-SUBMISSION-DIRECTORY/milestone-two/assets/data/RTB-Avg-Monthly-Rent-Type-Location.csv");
plot_bar("/TEMP-GITHUB-SUBMISSION-DIRECTORY/milestone-two/assets/data/RTB-Avg-Monthly-Rent-Type-Location.csv");
plot_stacked_bar("/TEMP-GITHUB-SUBMISSION-DIRECTORY/milestone-two/assets/data/RTB-Avg-Monthly-Rent-Type-Location.csv");
plot_line("/TEMP-GITHUB-SUBMISSION-DIRECTORY/milestone-two/assets/data/RTB-Avg-Monthly-Rent-Type-Location.csv");
// plot_bubble(data);
// plot_scatter(data);


// function plot_pie(data) {

//     var ndx = crossfilter(data);

//     var houseTypeDim = ndx.dimension(dc.pluck("Type"));

//     var avg_rent_2017 = houseTypeDim.group().reduceSum(dc.pluck("_2017"));

//     var avg_rent_chart_by_type_2017 = dc.pieChart("#chart-1");

//     avg_rent_chart_by_type_2017
//         .width(200)
//         .height(200)
//         .slicesCap(17)
//         .radius(90)
//         .dimension(houseTypeDim)
//         .group(avg_rent_2017)
//         .renderLabel(true);

//     dc.renderAll();

// } // plot_pie()

// function plot_bar(data) {

//     var ndx = crossfilter(data);

//     var houseTypeDim = ndx.dimension(function(data) { return data.Type });

//     var avg_rent_2017 = houseTypeDim.group().reduceSum(function(data) { return data._2017 });

//     var avg_rent_chart_by_type_2017 = dc.barChart("#chart-2");

//     avg_rent_chart_by_type_2017
//         .width(300)
//         .height(150)
//         .margins({ top: 10, right: 50, bottom: 30, left: 50 })
//         .dimension(houseTypeDim)
//         .group(avg_rent_2017)
//         .transitionDuration(500)
//         .x(d3.scaleOrdinal())
//         .xUnits(dc.units.ordinal)
//         .xAxisLabel("Player")
//         .yAxisLabel("Salary")
//         .yAxis().ticks(4);

//     dc.renderAll();

// } // plot_bar()

// function plot_bubble(data) {

//     var ndx = crossfilter(data);
//     var playerDim = ndx.dimension(function(d) { return d.player; });

//     var salaryPerPlayer = playerDim.group().reduceSum(function(d) { return d.salary; });

//     var salaryRingChart = dc.bubbleChart("#chart-3");

//     salaryRingChart
//         .width(300)
//         .height(150)
//         .margins({ top: 10, right: 50, bottom: 30, left: 50 })
//         .dimension(playerDim)
//         .group(salaryPerPlayer)
//         .transitionDuration(500)
//         .x(d3.scaleOrdinal())
//         .xUnits(dc.units.ordinal)
//         .xAxisLabel("Player")
//         .yAxisLabel("Salary")
//         .yAxis().ticks(4);

//     dc.renderAll();

// } // plot_bubble()

// function plot_stacked_bar(data) {

//     var ndx = crossfilter(data);
//     var playerDim = ndx.dimension(function(d) { return d.player; });

//     var reboundAvgPerPlayer = playerDim.group().reduceSum(function(d) { return d.rebound_avg; });
//     var pointAvgPerPlayer = playerDim.group().reduceSum(function(d) { return d.point_avg; });

//     var salaryRingChart = dc.barChart("#chart-4");
//     salaryRingChart
//         .width(300)
//         .height(150)
//         .margins({ top: 10, right: 50, bottom: 30, left: 50 })
//         .dimension(playerDim)
//         .group(pointAvgPerPlayer, "Point Avg")
//         .stack(reboundAvgPerPlayer, "Rebound Avg")
//         .transitionDuration(500)
//         .x(d3.scaleOrdinal())
//         .xUnits(dc.units.ordinal)
//         .xAxisLabel("Player")
//         .yAxisLabel("Point Avg")
//         .legend(dc.legend().x(420).y(0).itemHeight(15).gap(5));

//     salaryRingChart.margins().right = 100;

//     dc.renderAll();

// } // plot_stacked_bar()

// function plot_scatter(data) {

//     var ndx = crossfilter(data);
//     var playerDim = ndx.dimension(function(d) { return d.player; });

//     var reboundAvgPerPlayer = playerDim.group().reduceSum(function(d) { return d.rebound_avg; });
//     var pointAvgPerPlayer = playerDim.group().reduceSum(function(d) { return d.point_avg; });

//     var salaryRingChart = dc.scatterPlot("#chart-5 #chart-6 #chart-7 #chart-8");
//     salaryRingChart
//         .width(300)
//         .height(300)
//         .x(d3.scaleLinear().domain([0, 25]))
//         .brushOn(false)
//         .symbolSize(8)
//         .highlightedSize(15)
//         .clipPadding(10)
//         .xAxisLabel("Point Avg")
//         .dimension(reboundAvgPerPlayer)
//         .group(pointAvgPerPlayer);

//     dc.renderAll();

// } // plot_scatter()

// function plot_scatter(data) {

//     var ndx = crossfilter(data);
//     var playerDim = ndx.dimension(function(d) { return d.player; });

//     var reboundAvgPerPlayer = playerDim.group().reduceSum(function(d) { return d.rebound_avg; });
//     var pointAvgPerPlayer = playerDim.group().reduceSum(function(d) { return d.point_avg; });

//     var salaryRingChart = dc.scatterPlot("#chart-6");
//     salaryRingChart
//         .width(300)
//         .height(300)
//         .x(d3.scaleLinear().domain([0, 25]))
//         .brushOn(false)
//         .symbolSize(8)
//         .highlightedSize(15)
//         .clipPadding(10)
//         .xAxisLabel("Point Avg")
//         .dimension(reboundAvgPerPlayer)
//         .group(pointAvgPerPlayer);

//     dc.renderAll();

// } // plot_scatter()

// function plot_scatter(data) {

//     var ndx = crossfilter(data);
//     var playerDim = ndx.dimension(function(d) { return d.player; });

//     var reboundAvgPerPlayer = playerDim.group().reduceSum(function(d) { return d.rebound_avg; });
//     var pointAvgPerPlayer = playerDim.group().reduceSum(function(d) { return d.point_avg; });

//     var salaryRingChart = dc.scatterPlot("#chart-7");
//     salaryRingChart
//         .width(300)
//         .height(300)
//         .x(d3.scaleLinear().domain([0, 25]))
//         .brushOn(false)
//         .symbolSize(8)
//         .highlightedSize(15)
//         .clipPadding(10)
//         .xAxisLabel("Point Avg")
//         .dimension(reboundAvgPerPlayer)
//         .group(pointAvgPerPlayer);

//     dc.renderAll();

// } // plot_scatter()

// function plot_scatter(data) {

//     var ndx = crossfilter(data);
//     var playerDim = ndx.dimension(function(d) { return d.player; });

//     var reboundAvgPerPlayer = playerDim.group().reduceSum(function(d) { return d.rebound_avg; });
//     var pointAvgPerPlayer = playerDim.group().reduceSum(function(d) { return d.point_avg; });

//     var salaryRingChart = dc.scatterPlot("#chart-8");
//     salaryRingChart
//         .width(300)
//         .height(300)
//         .x(d3.scaleLinear().domain([0, 25]))
//         .brushOn(false)
//         .symbolSize(8)
//         .highlightedSize(15)
//         .clipPadding(10)
//         .xAxisLabel("Point Avg")
//         .dimension(reboundAvgPerPlayer)
//         .group(pointAvgPerPlayer);

//     dc.renderAll();

// } // plot_scatter()
