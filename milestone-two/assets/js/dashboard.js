// Test for console

console.log("hello worlds!");

// Load in data

// function to convert the year fields to numbers - NOT USED

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

// This is the main plot function which will plot the various charts

function plot_charts(data) {

    // Read in data and apply crossfilter
    d3.csv(data, function(errors, data) {
        var mycrossfilter = crossfilter(data);

        // Set the dimension
        var dim = mycrossfilter.dimension(function(data) {
            return (data.Type);
        });

        // Set the group
        var group = dim.group().reduceSum(dc.pluck("_2017"));

        // This chart will show the average monthly total rent by property type for 2017
        var avg_rent_chart_by_type_2017 = dc.barChart(".chart-1");

        // Apply data to chart using dimension and group and setting the scale to ordinal (As property type is a string)
        avg_rent_chart_by_type_2017
            .margins({ top: 10, right: 50, bottom: 30, left: 50 })
            .dimension(dim)
            .group(group)
            .transitionDuration(500)
            .x(d3.scaleOrdinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Type")
            .yAxisLabel("Rent 2017")
            .yAxis().ticks(4);


        // Pie chart


        // For this chart, the dimension will be Num_Rooms
        var dim = mycrossfilter.dimension(function(data) {
            return (data.Num_Rooms);
        });

        // Setting the group to 2017 average monthly rent total
        var avg_rent_2017 = dim.group().reduceSum(dc.pluck("_2017"));

        // Set the chart to type pie
        var avg_rent_chart_by_type_2017 = dc.pieChart(".chart-2");

        // Apply data
        avg_rent_chart_by_type_2017
            .slicesCap(17)
            .radius(90)
            .dimension(dim)
            .group(avg_rent_2017)
            .renderLabel(true);


        // Stacked bar chart


        // This chart will use the dimension Type
        var dim = mycrossfilter.dimension(function(data) {
            return (data.Type);
        });

        // As this will be a stacked bar chart, there is a group set for each year from 2013 - 2017
        var avg_rent_2017 = dim.group().reduceSum(function(d) { return d._2017; });
        var avg_rent_2016 = dim.group().reduceSum(function(d) { return d._2016; });
        var avg_rent_2015 = dim.group().reduceSum(function(d) { return d._2015; });
        var avg_rent_2014 = dim.group().reduceSum(function(d) { return d._2014; });
        var avg_rent_2013 = dim.group().reduceSum(function(d) { return d._2013; });

        var avg_rent_per_year_by_type = dc.barChart(".chart-3");

        // Apply data and make sure to use stack for each year with associated text to identify each within the legend
        avg_rent_per_year_by_type
            .margins({ top: 10, right: 50, bottom: 30, left: 50 })
            .dimension(dim)
            .group(avg_rent_2017, "Avg Rent 2017")
            .stack(avg_rent_2016, "Avg Rent 2016")
            .stack(avg_rent_2015, "Avg Rent 2015")
            .stack(avg_rent_2014, "Avg Rent 2014")
            .stack(avg_rent_2013, "Avg Rent 2013")
            .transitionDuration(500)
            .x(d3.scaleOrdinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Type")
            .yAxisLabel("Avg Rent")
            .legend(dc.legend().x(750).y(10).horizontal(true).autoItemWidth(true));


        // Composite chart 


        // Set the dimension
        var dim = mycrossfilter.dimension(function(data) {
            return (data.Type);
        });

        // Set a group for each year in order to compose different lines for each in one chart
        var avg_rent_2013 = dim.group().reduceSum(function(d) { return d._2013; });
        var avg_rent_2014 = dim.group().reduceSum(function(d) { return d._2014; });
        var avg_rent_2015 = dim.group().reduceSum(function(d) { return d._2015; });
        var avg_rent_2016 = dim.group().reduceSum(function(d) { return d._2016; });
        var avg_rent_2017 = dim.group().reduceSum(function(d) { return d._2017; });

        var avg_rent_by_type_2013_2017 = dc.compositeChart(".chart-4");

        // Apply data
        avg_rent_by_type_2013_2017
            .dimension(dim)
            /* This is needed to align the y points with it's associated x scale (ie Property Type) as
            ordinal scales on composite charts do not automatically align 
            */
            ._rangeBandPadding(1)
            .elasticY(true)
            .brushOn(false)
            .yAxisLabel("Avg Rent 2013 - 2017")
            .xAxisLabel("Type")
            .xAxisPadding(20)
            .alignYAxes(true)
            .valueAccessor(function(d) {
                return d.value;
            })
            /* On selecting a line, the total for the property type will be shown based on the year */
            .title(function(d) {
                return "\nAvg Monthly Rent for " + d.key + " property type 2013-2017: " + "€" + Math.round(d.value);
            })
            /* This is needed to specify our ordinal domain so the line chart displays labels correctly for string x units */
            .x(d3.scaleOrdinal().domain(dim.top(Infinity).map(function(d) { return d.Type })))
            .xUnits(dc.units.ordinal)
            .compose([
                dc.lineChart(avg_rent_by_type_2013_2017).group(avg_rent_2013, "2013").colors("red"),
                dc.lineChart(avg_rent_by_type_2013_2017).group(avg_rent_2014, "2014").colors("blue"),
                dc.lineChart(avg_rent_by_type_2013_2017).group(avg_rent_2015, "2015").colors("green"),
                dc.lineChart(avg_rent_by_type_2013_2017).group(avg_rent_2016, "2016").colors("purple"),
                dc.lineChart(avg_rent_by_type_2013_2017).group(avg_rent_2017, "2017").colors("orange")
            ])
            .legend(dc.legend().x(1200).y(10).itemHeight(8).gap(4));

        avg_rent_by_type_2013_2017.margins().left = 90;

        dc.renderAll();

    });

} // plot_charts() 

function plot_bar(data) {

    d3.csv(data, function(errors, data) {
        var mycrossfilter = crossfilter(data);

        var dim = mycrossfilter.dimension(function(data) {
            return (data.Type);
        });
        var group = dim.group().reduceSum(dc.pluck("_2017"));

        var avg_rent_chart_by_type_2017 = dc.barChart(".chart-1");

        avg_rent_chart_by_type_2017
            // .width(document.getElementsByClassName("chart").attr("height"))
            // .height(document.getElementsByClassName("chart").attr("height"))
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
            return (data.Num_Rooms);
        });

        var avg_rent_2017 = dim.group().reduceSum(dc.pluck("_2017"));

        var avg_rent_chart_by_type_2017 = dc.pieChart(".chart-2");

        avg_rent_chart_by_type_2017
            // .width(200)
            // .height(200)
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
        var avg_rent_2016 = dim.group().reduceSum(function(d) { return d._2016; });
        var avg_rent_2015 = dim.group().reduceSum(function(d) { return d._2015; });
        var avg_rent_2014 = dim.group().reduceSum(function(d) { return d._2014; });
        var avg_rent_2013 = dim.group().reduceSum(function(d) { return d._2013; });

        var avg_rent_2017_by_location = dc.barChart(".chart-3");
        avg_rent_2017_by_location
            // .width(300)
            // .height(150)
            .margins({ top: 10, right: 50, bottom: 30, left: 50 })
            .dimension(dim)
            .group(avg_rent_2017, "Avg Rent 2017")
            .stack(avg_rent_2016, "Avg Rent 2016")
            .stack(avg_rent_2015, "Avg Rent 2015")
            .stack(avg_rent_2014, "Avg Rent 2014")
            .stack(avg_rent_2013, "Avg Rent 2013")
            .transitionDuration(500)
            .x(d3.scaleOrdinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Type")
            .yAxisLabel("Avg Rent")
            .legend(dc.legend().x(750).y(10).horizontal(true).autoItemWidth(true));

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

        var avg_rent_by_type_2013_2017 = dc.compositeChart(".chart-4");
        avg_rent_by_type_2013_2017
            // .width(800)
            // .height(300)
            .dimension(dim)
            /* This is needed to align the y points with it's associated x scale (ie Property Type) as
            ordinal scales on composite charts do not automatically align 
            */
            ._rangeBandPadding(1)
            .elasticY(true)
            .brushOn(false)
            .yAxisLabel("Avg Rent 2013 - 2017")
            .xAxisLabel("Type")
            .xAxisPadding(20)
            .alignYAxes(true)
            .valueAccessor(function(d) {
                return d.value;
            })
            .title(function(d) {
                return "\nAvg Monthly Rent for " + d.key + " property type 2013-2017: " + "€" + Math.round(d.value);
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
            .legend(dc.legend().x(1200).y(10).itemHeight(8).gap(4));

        avg_rent_by_type_2013_2017.margins().left = 90;
        dc.renderAll();
    });

} // plot_line()


// Call the function to plot the different charts

plot_charts("/TEMP-GITHUB-SUBMISSION-DIRECTORY/milestone-two/assets/data/RTB-Avg-Monthly-Rent-Type-Location.csv");
