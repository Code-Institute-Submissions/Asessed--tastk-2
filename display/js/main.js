queue()
    .defer(d3.csv, "data/MilestoneProj2-MoonsOfUranus (2).csv")
    .await(makeGraphs);

function makeGraphs(error, MoonsOfUranus) {
    var ndx = crossfilter(MoonsOfUranus);

    MoonsOfUranus.forEach(function(d) {
        
        d.Temperature = parseInt(d.Temperature);
    })

    display_surface_temperature(ndx);
    display_orbit_time(ndx);
    display_orbital_distance(ndx);
    display_grav_temp_comparison(ndx);
    display_moon_radius(ndx);
    


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
        .xAxisLabel("Orbital distance (km in thousends)")
        .yAxis().ticks(20);
}

function display_grav_temp_comparison(ndx) {
    var gravDim = ndx.dimension(dc.pluck('Gravity'))
    var TempDim = ndx.dimension(function(d) {
        return [d.Gravity, d.Temperature, d.Name];
    });
    var gravityTempGroup = TempDim.group();

    var minExperience = gravDim.bottom(1)[0].Radius;
    var maxExperience = gravDim.top(1)[0].Radius;

    dc.scatterPlot("#radius-temp")
        .width(800)
        .height(400)
        .x(d3.scale.linear().domain([minExperience, maxExperience]))
        .y(d3.scale.ordinal())

        .brushOn(false)
        .symbolSize(8)
        .clipPadding(10)
        .yAxisLabel("Temp")
        .xAxisLabel("Gravity")
        .title(function(d) {
            return d.key[2];
        })
        .dimension(TempDim)
        .group(gravityTempGroup)
        .margins({ top: 10, right: 50, bottom: 75, left: 75 });
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
        .title(function(d) { return "Wag wan"; });

}
