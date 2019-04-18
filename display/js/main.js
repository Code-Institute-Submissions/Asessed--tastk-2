queue()
    .defer(d3.csv, "data/MilestoneProj2-MoonsOfUranus (2).csv")
    .await(makeGraphs);

function makeGraphs(error, MoonsOfUranus) {
    var ndx = crossfilter(MoonsOfUranus);

    display_surface_temperature(ndx)


    dc.renderAll();
}

function display_surface_temperature(ndx){
    var dim = ndx.dimension(dc.pluck('Temperature'));
    var group = dim.group();

    dc.barChart("#surface-temp")
        .width(400)
        .height(300)
        .margins({ top: 10, right: 50, bottom: 30, left: 50 })
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Temperature (kelvins)")
        .yAxis().ticks(20);
};

