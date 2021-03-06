

looker.plugins.visualizations.add({
    // Id and Label are legacy properties that no longer have any function besides documenting
    // what the visualization used to have. The properties are now set via the manifest
    // form within the admin/visualizations page of Looker
    id: "custom-donut",
    label: "custom-donut",
    options: {
        font_size: {
            type: "string",
            label: "Font Size",
            values: [
                { "Large": "large" },
                { "Small": "small" }
            ],
            display: "radio",
            default: "large"
        }
    },
    // Set up the initial state of the visualization
    create: function (element, config) {

        var styles = `
            text {
			font: 10px Courier New;
			text-anchor: middle;
			}
			
			.arc path {
			stroke: #fff;
			}
			
			polyline{
			opacity: .3;
			stroke: black;
			stroke-width: 2px;
			fill: none;
			}
			
			.labelName tspan {
			font-style: normal;
			font-weight: 700;
			}
`

        var styleSheet = document.createElement("style")
        styleSheet.innerText = styles
        document.head.appendChild(styleSheet)

        var margin = { top: 20, right: 20, bottom: 20, left: 20 },
            orig_width = 620,
            orig_height = 190,
            width = orig_width - margin.left - margin.right,
            height = orig_height - margin.top - margin.bottom;

        var svg = d3.select(element).append("svg")
            .attr("width", orig_width)
            .attr("height", orig_height)
            .append("g")
            .attr("transform",
                "translate(" + orig_width / 2 + "," + orig_height / 2 + ")");

        this.update(data, element, config, resp);

    },

    // Render in response to the data or settings changing
    update: function (data, element, settings, resp) {

        var data = [
            {
                "Label": "Ant1",
                "Value": 120
            },
            {
                "Label": "Bat2",
                "Value": 112
            },
            {
                "Label": "Cat3",
                "Value": 77
            },
            {
                "Label": "Dog4",
                "Value": 94
            },
            {
                "Label": "Elephant5",
                "Value": 154
            },
            {
                "Label": "Fox6",
                "Value": 121
            },
            {
                "Label": "Goat6",
                "Value": 97
            },
            {
                "Label": "Hare",
                "Value": 81
            },
            {
                "Label": "Impala",
                "Value": 117
            }
        ]

        var margin = { top: 20, right: 20, bottom: 20, left: 20 },
            orig_width = 620,
            orig_height = 190,
            width = orig_width - margin.left - margin.right,
            height = orig_height - margin.top - margin.bottom;

        var svg = d3.select(element).select("svg").select("g")

        svg.append("g")
            .attr("class", "slices");
        svg.append("g")
            .attr("class", "labels");
        svg.append("g")
            .attr("class", "lines");

        var radius = Math.min(width, height) / 2;
        var color = d3.scaleOrdinal(d3.schemeCategory10);

        var pie = d3.pie().sort(null).value(d => d.Value).padAngle(.015);
        var arc = d3.arc().innerRadius(radius * 0.8).outerRadius(radius * 0.5).cornerRadius(7);

        var outerArc = d3.arc()
            .outerRadius(radius * 0.9)
            .innerRadius(radius * 1);

        //plot graphs
        svg.selectAll('path')
            .data(pie(data))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', (d, i) => color(i))

        svg.append('g').classed('labels', true);
        svg.append('g').classed('lines', true);

        //label line
        var polyline = svg.select('.lines')
            .selectAll('polyline')
            .data(pie(data))
            .enter().append('polyline')
            .attr('points', function (d) {
                var pos = outerArc.centroid(d);
                pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
                return [arc.centroid(d), outerArc.centroid(d), pos]
            });

        var label = svg.select('.labels').selectAll('text')
            .data(pie(data))
            .enter().append('text')
            .attr('dy', '.35em')
            .html(function (d) {
                return d.data.Label + "(" + d.data.Value + ")";
            })
            .attr('transform', function (d) {
                var pos = outerArc.centroid(d);
                pos[0] = radius * 0.98 * (midAngle(d) < Math.PI ? 1 : -1);
                return 'translate(' + pos + ')';
            })
            .style('text-anchor', function (d) {
                return (midAngle(d)) < Math.PI ? 'start' : 'end';
            });

        function midAngle(d) { return d.startAngle + (d.endAngle - d.startAngle) / 2; }

    }
});

