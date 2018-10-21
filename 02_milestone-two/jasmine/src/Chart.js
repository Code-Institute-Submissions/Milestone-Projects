// Use queue await function to pause plot_charts until source data is loaded

queue()
    .defer(d3.csv, "assets/data/RTB-Avg-Monthly-Rent-Type-Location.csv")
    .await(plot_charts);
    
// This is the main plot function which will plot the various charts

function plot_charts(errors, rentalData) {

    // Read in data and apply crossfilter
    var ndx = crossfilter(rentalData);

    show_chart1(ndx);
    show_chart2(ndx);
    show_chart3(ndx);
    show_chart4(ndx);
    
    dc.renderAll();
    
} // plot_charts()

function show_chart1(ndx) {
    
    // Bar chart
    
    // Set the dimension
    var dim = ndx.dimension(function(data) {
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
        .elasticX(true)
        .elasticY(true)
        .transitionDuration(500)
        .brushOn(false)
        /* On selection, the total rent for 2017 by the property type will be shown */
        .title(function(d) {
            return "\nTotal rent for " + d.key + " 2017: " + "€" + Math.round(d.value);
        })
        .x(d3.scaleOrdinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Type")
        .yAxisLabel("Rent 2017")
        .yAxis().ticks(4);

} // show_chart1

function show_chart2(ndx) {
    
    // Pie chart

    // For this chart, the dimension will be Num_Rooms
    dim = ndx.dimension(function(data) {
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
        .renderLabel(true)
        .valueAccessor(function(d) {
            return d.value;
        })
        /* On selection, the total rent for the year according to property type will be shown for 2017 */
        .title(function(d) {
            return "\nTotal average rent for the year 2017 for property with " + d.key + ": €" + Math.round(d.value);
        });

} // show_chart2

function show_chart3(ndx) {
    
    // Stacked bar chart

    // This chart will use the dimension Type
    dim = ndx.dimension(function(data) {
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
        .yAxisLabel("Total Yearly Rent")
        .valueAccessor(function(d) {
            return d.value;
        })
        /* On selection, the total for year by the property type will be shown */
        .title(function(d) {
            return "\nTotal rent for " + d.key + " 2013-2017: " + "€" + Math.round(d.value);
        })
        .legend(dc.legend().x(320).y(0).horizontal(false).autoItemWidth(true));
        
} // show_chart3

function show_chart4(ndx) {
    
    // Composite chart 

    // Set the dimension
    dim = ndx.dimension(function(data) {
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
        .brushOn(false)
        .yAxisLabel("Total Rent 2013 - 2017")
        .xAxisLabel("Type")
        .xAxisPadding(20)
        .alignYAxes(true)
        .valueAccessor(function(d) {
            return d.value;
        })
        /* On selecting a line, the total for the property type will be shown based on the year */
        .title(function(d) {
            return "\nTotal rent for " + d.key + " 2013-2017: " + "€" + Math.round(d.value);
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
        .legend(dc.legend().x(320).y(0).itemHeight(8).gap(4));

        avg_rent_by_type_2013_2017.margins().left = 90;
        
} // show_chart4