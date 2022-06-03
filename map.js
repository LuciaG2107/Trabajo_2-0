/**FRONTEND MAPA */
/*Creamos el mapa y lo posicionamos*/
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
 * Pulsar y salta un mensaje (tambien se añade un marcador a la vez) y foto
 */
var popup = L.popup();

function onMapClick(e) {
    var marker = L.marker([e.latlng.lat, e.latlng.lng], {
      
    }).addTo(map).bindPopup(popup.setContent('<img src="media/travel.jpg" height="150px" width="150px"/><p>Pagina Home que sera la pagina donde se añada, se borren fotos</p>'));
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

/**leaflet-sidebar: es la ventana que sale a la izquierda*/
var sidebar = L.control.sidebar('sidebar', {
    autopan: false,       
    closeButton: true,    
    container: 'sidebar', 
    position: 'left'
}).addTo(map);

L.marker([e.latlng.lat, e.latlng.lng]).addTo(map).on('click', function(){
    sidebar.toggle();
});
/** Para pasar de coordeladas latitud y longitud a Point (son dos números enteros)*/
function onMapClick(e) {
    var marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map).on('click', function(){
        sidebar.toggle();
        var latlng = e.latlng;
        var pixelPosition = map.latLngToLayerPoint(latlng);
        alert("LatLng = " + latlng + "\n Pixel position = " + pixelPosition);
    });
}

map.on('click', onMapClick);


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

/*botones para guardar y eliminar imagenes */


/**Conexion entre el fronted y el backend*/
function funcionre(mm){
    window.location.replace("/map.html")
    console.log(mm)
}

function addDataToMap(FeatureCollectio, map) {
    var dataLayer = L.geoJson(FeatureCollectio);
    dataLayer.addTo(map);
}

$.getJSON("map.geojson", function(data) { addDataToMap(data, map); });


