// Initialize Map
const map = L.map('map').setView([14.5995, 120.9842], 6);

// Base Map Layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap Contributors'
}).addTo(map);

// Click Marker
let activeMarker;

// Search Function
async function searchLocation() {
  const query = document.getElementById("searchInput").value;
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.length > 0) {
    const lat = data[0].lat;
    const lon = data[0].lon;
    map.setView([lat, lon], 14);
    generateLocationData(lat, lon);
  }
}

// Map Click
map.on('click', function (e) {
  if (activeMarker) map.removeLayer(activeMarker);
  activeMarker = L.marker(e.latlng).addTo(map);
  generateLocationData(e.latlng.lat, e.latlng.lng);
});

// Generate Location Intelligence
function generateLocationData(lat, lon) {
  const infrastructureScore = calculateInfrastructureScore(lat, lon);
  const riskLevel = calculateRisk(lat, lon);

  document.getElementById("locationInfo").innerHTML = `
    <p><strong>Coordinates:</strong> ${lat.toFixed(4)}, ${lon.toFixed(4)}</p>

    <h3>Infrastructure Assessment</h3>
    <p>Opportunity Score: <strong>${infrastructureScore}/100</strong></p>

    <h3>Environmental Risks</h3>
    <ul>
      <li>Flood Risk: ${riskLevel.flood}</li>
      <li>Typhoon Exposure: ${riskLevel.typhoon}</li>
      <li>Earthquake Risk: ${riskLevel.earthquake}</li>
    </ul>

    <h3>Recommended Enhancements</h3>
    <ul>
      <li>Green drainage systems</li>
      <li>Renewable energy integration</li>
      <li>Resilient housing infrastructure</li>
    </ul>

    <h3>How You Can Help</h3>
    <p>Support sustainable projects, community planning, and disaster-resilient infrastructure development.</p>
  `;
}

// Mathematical Model (Sample)
function calculateInfrastructureScore(lat, lon) {
  const accessibility = Math.random() * 40;
  const environmentalStability = Math.random() * 30;
  const resourceAvailability = Math.random() * 30;
  return Math.round(accessibility + environmentalStability + resourceAvailability);
}

// Risk Modeling
function calculateRisk() {
  return {
    flood: "Moderate",
    typhoon: "High",
    earthquake: "Low"
  };
}

/*
AI MODULE (Conceptual)
- Machine learning ranking of infrastructure priorities
- Time-series weather & disaster forecasting
- Sustainable development optimization
*/
