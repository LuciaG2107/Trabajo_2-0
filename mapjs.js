
/*tileLayer.provider('OpenStreetMap.Mapnik').addTo(new Map('map').setView([40.4346352, -3.767012], 10));*/

/*Creamos el mapa y lo posicionamos*/
/*var map = L.map('map').setView([40.4346352, -3.767012], 10);*/
var map = L.map('map').setView([0, 0], 10);
var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 16,
    minZoom: 3,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

/**
 * Botones zoom
 */
L.control.zoom({position: "bottomleft"}).addTo(map);

/**Control del Zoom */




/**
 * Añadir marcador
 */
var redMarker = L.ExtraMarkers.icon({
    icon: 'fa-coffee',
    markerColor: 'red',
    shape: 'square',
    prefix: 'fa'
});
L.marker([51.941196, 4.512291], { icon: redMarker }).addTo(map);

/**
 * Pulsar y añade marcador
 */
/*map.on('click', onMapClick);
var onMapClick = function (e) {
    
}

/**
 * Pulsar y salta un mensaje (tambien se añade un marcador a la vez) y foto
 */
var popup = L.popup();

function onMapClick(e) {
    var marker = L.marker([e.latlng.lat, e.latlng.lng], {
      
    }).addTo(map).bindPopup(popup.setContent('<img src="media/travel.jpg" height="150px" width="150px"/><p>Pagina Home que sera la pagina donde se añada, se borren fotos</p>'));
    /*popup
        .setLatLng(e.latlng) // Sets the geographical point where the popup will open.
        .setContent('<a href="home.html">Pagina Home que sera la pagina donde se añada, se borren fotos</a>')
        .openOn(map); // Adds the popup to the map and closes the previous one. 
*/
    }

map.on('click', onMapClick);

/**
 * Para el buscador
 */
map.addLayer(new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'));
map.addControl(new L.Control.Search({
    url: 'https://nominatim.openstreetmap.org/search?format=json&q={s}',
    jsonpParam: 'json_callback',
    propertyName: 'display_name',
    propertyLoc: ['lat', 'lon'],
    marker: L.circleMarker([0, 0], { radius: 30 }),
    autoCollapse: true,
    autoType: false,
    minLength: 2
}));

/*var OpenStreetMap_DE = L.tileLayer.provider('OpenStreetMap.Mapnik').addTo(L.map('map').setView([40.4346352, -3.767012], 10));
/**Creamos un marcador manual*/
const palacioMadridMarker = L.marker([40.4175955964789, -3.7173034972414425]).addTo(map);
const palacioCristalMarker = L.marker([40.411515, -3.6861627]).addTo(map);
const eSantiagoBernabéuMarker = L.marker([40.4528282, -3.6971568]).addTo(map);
/*Posicionar/centrar el mapa con los marcadores*/
map.fitBounds([
    [palacioMadridMarker.getLatLng().lat, palacioMadridMarker.getLatLng().lng],
    [palacioCristalMarker.getLatLng().lat, palacioCristalMarker.getLatLng().lng],
    [eSantiagoBernabéuMarker.getLatLng().lat, eSantiagoBernabéuMarker.getLatLng().lng]
]);

/*let template = `
<h3>Empire State Building</h3>
<div style="text-align:center">
    <img width="150" height="150" src="media/fondo.jpg"/>
</div>
`

palacioCristalMarker.bindPopup(template);*/

/**leaflet-sidebar*/
var sidebar = L.control.sidebar('sidebar', {
    autopan: false,       // whether to maintain the centered map point when opening the sidebar
    closeButton: true,    // whether t add a close button to the panes
    container: 'sidebar', // the DOM container or #ID of a predefined sidebar container that should be used
    position: 'left'
}).addTo(map);
/*setTimeout(function () {
    sidebar.show();
}, 500);*/
var marker = L.marker([40.4175955964789, -3.7173034972414425]).addTo(map).on('click', function () {
    sidebar.toggle();
});

L.marker([e.latlng.lat, e.latlng.lng]).addTo(map).on('click', function(){
    sidebar.toggle();
});
function onMapClick(e) {
    var marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map).on('click', function(){
        sidebar.toggle();
        var latlng = e.latlng;
        var pixelPosition = map.latLngToLayerPoint(latlng);
        alert("LatLng = " + latlng + "\n Pixel position = " + pixelPosition);
    });
}

map.on('click', onMapClick);

/**botones para guardar y eliminar imagenes */
$('#addFoto').on('click', function(event){
    
});

map.on('click', function () {
    sidebar.hide();
})

sidebar.on('show', function () {
    console.log('Sidebar will be visible.');
});

sidebar.on('shown', function () {
    console.log('Sidebar is visible.');
});

sidebar.on('hide', function () {
    console.log('Sidebar will be hidden.');
});

sidebar.on('hidden', function () {
    console.log('Sidebar is hidden.');
});

L.DomEvent.on(sidebar.getCloseButton(), 'click', function () {
    console.log('Close button clicked.');
});

