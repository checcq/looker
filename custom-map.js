

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


        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = 'https://unpkg.com/leaflet@1.0.3/dist/leaflet.css';
        link.media = 'all';
        head.appendChild(link);

        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = 'https://rawgit.com/Leaflet/Leaflet.markercluster/leaflet-0.7/dist/MarkerCluster.css';
        link.media = 'all';
        head.appendChild(link);

        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = 'https://rawgit.com/Leaflet/Leaflet.markercluster/leaflet-0.7/dist/MarkerCluster.Default.css';
        link.media = 'all';
        head.appendChild(link);

        var elements = document.createElement("div");
        elements.setAttribute("id", "leaflet_map");
        document.getElementById("vis").appendChild(elements);

        this.update(data, element, config, resp);

    },

    // Render in response to the data or settings changing
    update: function (data, element, settings, resp) {

        var tiles = L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: '&copy; <a href="//openstreetmap.org/copyright">OpenStreetMap</a> contributors, Points &copy 2012 LINZ'
        });

        var map = L.map('leaflet_map', {
            center: L.latLng(-37.89, 175.46),
            zoom: 13,
            layers: [tiles]
        });

        var mcg = L.markerClusterGroup({
            chunkedLoading: true,
            //singleMarkerMode: true,
            spiderfyOnMaxZoom: false
        });

        for (var i = 0; i < addressPoints.length; i++) {
            var a = addressPoints[i];
            var title = a[2];
            var marker = L.marker(new L.LatLng(a[0], a[1]), { title: title });
            marker.bindPopup(title);
            mcg.addLayer(marker);
        }

        map.addLayer(mcg);




    }
});

