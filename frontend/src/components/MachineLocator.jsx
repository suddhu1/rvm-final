// src/components/MachineLocator.jsx

import React, { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet" // Import Leaflet components
import L from "leaflet" // Import Leaflet for marker customization
import "../styles/global.css" // Import global styles
import "../styles/ecoStyle.css" // Import eco-friendly specific styles
import "../styles/animations.css" // Import animations

const MachineLocator = () => {
  const [machineLocations, setMachineLocations] = useState([])
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    // Fetch machine locations (for now, hardcoded data)
    const fetchMachineLocations = async () => {
      try {
        // Simulating a fetch request with hardcoded data
        const locations = [
          { id: 1, name: "RVM Location 1", lat: 27.6845, lon: 85.3095 },
          { id: 2, name: "RVM Location 2", lat: 27.6885, lon: 85.3125 },
          { id: 3, name: "RVM Location 3", lat: 27.6895, lon: 85.3155 },
          { id: 4, name: "RVM Location 4", lat: 27.6875, lon: 85.3075 },
          { id: 5, name: "RVM Location 5", lat: 27.6865, lon: 85.3105 },
          { id: 6, name: "RVM Location 6", lat: 27.6905, lon: 85.3145 },
          { id: 7, name: "RVM Location 7", lat: 27.6825, lon: 85.3065 },
          { id: 8, name: "RVM Location 8", lat: 27.6855, lon: 85.3085 },
          { id: 9, name: "RVM Location 9", lat: 27.688, lon: 85.31 },
          { id: 10, name: "RVM Location 10", lat: 27.6915, lon: 85.312 },
        ]
        setMachineLocations(locations)
      } catch (error) {
        setErrorMessage("Failed to load machine locations.")
      }
    }

    fetchMachineLocations()
  }, [])

  return (
    <div className="machine-locator-container fade-in">
      <h1 className="eco-heading">Machine Locator</h1>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="map-container slide-in">
        <MapContainer
          center={[27.6845, 85.3095]}
          zoom={13}
          style={{
            width: "100%",
            height: "calc(100vh - 120px)", // Adjust map height dynamically based on screen height minus navbar height
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          />
          {machineLocations.map((location) => (
            <Marker
              key={location.id}
              position={[location.lat, location.lon]}
              icon={
                new L.Icon({
                  iconUrl: "/recycle-icon.png", // Local image in the public folder
                  iconSize: [32, 32], // Customize the icon size
                  iconAnchor: [16, 32], // Anchor the icon at the center bottom
                  popupAnchor: [0, -32], // Adjust the popup position
                })
              }
            >
              <Popup>
                <strong>{location.name}</strong>
                <br />
                Latitude: {location.lat}, Longitude: {location.lon}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  )
}

export default MachineLocator
