//Map Location and Zoom

let myMap = L.map("map", {
  center: [45.52, -122.67],
  zoom: 5
});

//Map Layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

//Link to data
let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";



//Script to run through the different actions occuring to the data
d3.json(link).then(function (response) {
  features = response.features;
  let marker_limit = 1000;
  for (let i = 0; i < marker_limit; i++) {
    let location = features[i].geometry;
    if (location) {
        let depth = location.coordinates[2];
        let color = getColor(depth);
        let magnitude = features[i].properties.mag;
        let radius = getRadius(magnitude);
        let location_marker_1  = location.coordinates[1]
        let location_marker_2 = location.coordinates[0]
        L.circleMarker([location.coordinates[1], location.coordinates[0]], {
            radius: radius,
            fillColor: color,
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(myMap).bindPopup(`<strong>Depth:</strong> ${depth} <br><strong>Magnitude:</strong> ${magnitude} <br><strong>Location:</strong> ${location_marker_1} , ${location_marker_2}`);
    }
}
});

//Switch to determine color
function getColor(depth) {
  switch (true) {
      case depth > 90:
          return "#ea2c2c";
      case depth > 70:
          return "#ea822c";
      case depth > 50:
          return "#ee9c00";
      case depth > 30:
          return "#eecc00";
      case depth > 10:
          return "#d4ee00";
      default:
          return "#98ee00";
  }
}

//Function to build radius
function getRadius(magnitude) {
  if (magnitude === 0) {
      return 1;
  }
  return magnitude * 4;
}