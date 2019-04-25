queue()
    .defer(d3.csv, "data/MilestoneProj2-MoonsOfUranus (2).csv")
    .await(makeGraphs);

function makeGraphs(error, MoonsOfUranus) {
    var ndx = crossfilter(MoonsOfUranus);

    display_surface_temperature(ndx);
    display_orbit_time(ndx);


    dc.renderAll();
}

function display_surface_temperature(ndx) {
    var tempDim = ndx.dimension(dc.pluck('Temperature'));
    var tempGroup = tempDim.group();

    dc.barChart("#surface-temp")
        .width(400)
        .height(300)
        .margins({ top: 10, right: 50, bottom: 30, left: 50 })
        .dimension(tempDim)
        .group(tempGroup)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Temperature (kelvins)")
        .yAxis().ticks(20);
}

function display_orbit_time(ndx) {
    var orbDim = ndx.dimension(dc.pluck('OrbitalTime'));
    var orbGroup = orbDim.group();

    dc.barChart("#orbit-time")
        .width(400)
        .height(300)
        .margins({ top: 10, right: 50, bottom: 30, left: 50 })
        .dimension(orbDim)
        .group(orbGroup)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Orbital time (hours)")
        .yAxis().ticks(20);
}
