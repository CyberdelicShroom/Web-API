// Making a map and tiles
const map = L.map('map').setView([0, 0], 2);
const attribution ='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(map);

// Making a marker and icon
const issIcon = L.icon({
    iconUrl: 'iss200.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16]
});

const marker = L.marker([0, 0], { icon: issIcon }).addTo(map);

// Fetching the ISS data
const api_url = "https://api.wheretheiss.at/v1/satellites/25544";
async function getISSData() {
    const response = await fetch(api_url);
    const data = await response.json();
    const {latitude, longitude, altitude} = data;
    console.log({lat: latitude, long: longitude});
    document.getElementById("lat").textContent = latitude.toFixed(4);
    document.getElementById("long").textContent = longitude.toFixed(4);
    document.getElementById("alti").textContent = (altitude * 1.6093).toFixed(4);
    marker.setLatLng([latitude, longitude]);
}
getISSData();
setInterval(getISSData, 1000);