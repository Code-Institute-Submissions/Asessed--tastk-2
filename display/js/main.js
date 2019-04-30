queue()
    .defer(d3.csv, "data/MilestoneProj2-MoonsOfUranus (2).csv")
    .await(makeGraphs);

function makeGraphs(error, MoonsOfUranus) {
    var ndx = crossfilter(MoonsOfUranus);

    MoonsOfUranus.forEach(function(d) {
        d.Radius = parseInt(d.Radius);
    })

    display_surface_temperature(ndx);
    display_orbit_time(ndx);
    display_radius_temp_comparison(ndx);


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

function display_radius_temp_comparison(ndx) {
    var radDim = ndx.dimension(dc.pluck('Radius'))
    var TempDim = ndx.dimension(function(d) {
        return [d.Radius, d.Temperature, d.Name];
    });
    var radiusTempGroup = TempDim.group();

    var minExperience = radDim.bottom(1)[0].Radius;
    var maxExperience = radDim.top(1)[0].Radius;

    dc.scatterPlot("#radius-temp")
        .width(800)
        .height(400)
        .x(d3.scale.linear().domain([minExperience, maxExperience]))
        .y(d3.scale.ordinal())
        
        .brushOn(false)
        .symbolSize(8)
        .clipPadding(10)
        .yAxisLabel("Temp")
        .xAxisLabel("Radius")
        .title(function(d) {
            return d.key[2];
        })
        .dimension(TempDim)
        .group(radiusTempGroup)
        .margins({ top: 10, right: 50, bottom: 75, left: 75 })
        .yAxis().ticks(10);
}
