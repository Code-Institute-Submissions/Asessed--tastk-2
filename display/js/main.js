queue()
    .defer(d3.csv, "data/MilestoneProj2-MoonsOfUranus (2).csv")
    .await(makeGraphs);

function makeGraphs(error, MoonsOfUranus) {
    var ndx = crossfilter(MoonsOfUranus);

    MoonsOfUranus.forEach(function(d) {
        d.DistanceFromUranus = parseFloat(d.DistanceFromUranus);
        d.Gravity = parseFloat(d.Gravity);
        d.Temperature = parseInt(d.Temperature);
    })

    display_surface_temperature(ndx);
    display_orbit_time(ndx);
    display_orbital_distance(ndx);
    display_grav_dist_comparison(ndx);
    display_moon_radius(ndx);



    dc.renderAll();
}



function display_surface_temperature(ndx) {
    var tempDim = ndx.dimension(dc.pluck('Temperature'));
    var tempGroup = tempDim.group();

    dc.barChart("#surface-temp")
        .width(300)
        .height(300)
        .margins({ top: 10, right: 50, bottom: 30, left: 50 })
        .dimension(tempDim)
        .group(tempGroup)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel('Temperature (Kelvins)')
        .yAxis().ticks(10);
}

function display_orbit_time(ndx) {
    var orbDim = ndx.dimension(dc.pluck('OrbitalTime'));
    var orbGroup = orbDim.group();

    dc.barChart("#orbit-time")
        .width(300)
        .height(300)
        .margins({ top: 10, right: 50, bottom: 30, left: 50 })
        .dimension(orbDim)
        .group(orbGroup)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel('Orbital time (Hours)')
        .yAxis().ticks(10);
}

function display_orbital_distance(ndx) {
    var orbDim = ndx.dimension(dc.pluck('OrbitalDistance'));
    var orbGroup = orbDim.group();

    dc.barChart("#orbital-distance")
        .width(400)
        .height(300)
        .margins({ top: 10, right: 50, bottom: 30, left: 50 })
        .dimension(orbDim)
        .group(orbGroup)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel('Orbital distance (Km in thousands)')
        .yAxis().ticks(20);
}

function display_grav_dist_comparison(ndx) {
    var distDim = ndx.dimension(dc.pluck('DistanceFromUranus'))
    var gravdistDim = ndx.dimension(function(d) {
        return [d.DistanceFromUranus, d.Gravity, d.Name];
    });
    var gravityDistGroup = gravdistDim.group();

    var minDist = distDim.bottom(1)[0].DistanceFromUranus;
    var maxDist = distDim.top(1)[0].DistanceFromUranus;

    dc.scatterPlot("#grav-planetDist")
        .width(600)
        .height(400)
        .x(d3.scale.linear().domain([minDist, maxDist]))
        .y(d3.scale.linear().domain([0, 0.4]))
        .brushOn(false)
        .symbolSize(10)
        .clipPadding(10)
        .yAxisLabel('Gravity (m/s)')
        .xAxisLabel('DistanceFromUranus (Km in million)')
        .title(function(d) {
            return d.key[1] + ' by ' + d.key[0] + ' (' + d.key[2] + ')';
        })
        .dimension(distDim)
        .group(gravityDistGroup)
        .margins({ top: 10, right: 50, bottom: 75, left: 75 })
        .xAxis().ticks(10);
}

function display_moon_radius(ndx) {
    var radDim = ndx.dimension(dc.pluck('Radius'));
    var radGroup = radDim.group();

    dc.pieChart("#moons-radius")
        .width(300)
        .height(300)
        .radius(100)
        .innerRadius(30)
        .dimension(radDim)
        .group(radGroup)
        .title(function(d) { return 'Km in thousends'; });

}
