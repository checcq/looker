

looker.plugins.visualizations.add({
    // Id and Label are legacy properties that no longer have any function besides documenting
    // what the visualization used to have. The properties are now set via the manifest
    // form within the admin/visualizations page of Looker
    id: "custom-map",
    label: "custom-map",
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
        #leaflet_map {
            width: 600px;
            height: 190px;
            background-color: black;
          }
        `

        var styleSheet = document.createElement("style")
        styleSheet.innerText = styles
        document.head.appendChild(styleSheet)

        var elements = document.createElement("div");
        elements.setAttribute("id", "leaflet_map");
        document.getElementById("vis").appendChild(elements);

        this.update(data, element, config, resp);

    },

    // Render in response to the data or settings changing
    update: function (data, element, settings, resp) {

        var map = L.map('leaflet_map').setView([51.505, -0.09], 13);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

    }
});

