import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapView = ({ books = [] }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView([48.8566, 2.3522], 12);
    mapInstanceRef.current = map;

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current || !books.length) return;

    const map = mapInstanceRef.current;

    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    // Add markers for books
    const markers = books.map(book => {
      const marker = L.marker([book.owner.location.lat, book.owner.location.lng])
        .bindPopup(`
          <div class="p-2">
            <h3 class="font-semibold text-sm mb-1">${book.title}</h3>
            <p class="text-xs text-gray-600 mb-2">${book.author}</p>
            <p class="text-xs text-gray-500">${book.owner.name}</p>
            <p class="text-xs text-gray-500">${book.owner.distance}km</p>
          </div>
        `);
      
      marker.addTo(map);
      return marker;
    });

    // Fit map to show all markers
    if (markers.length > 0) {
      const group = new L.featureGroup(markers);
      map.fitBounds(group.getBounds().pad(0.1));
    }
  }, [books]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-96"
      style={{ minHeight: '400px' }}
    />
  );
};

export default MapView;