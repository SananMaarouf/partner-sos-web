import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const MapBoxComponent = ({ location }) => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    const mapInstance = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: location || [25.3, 54.9], // Default to center of europa
      zoom: 3,
    });

    setMap(mapInstance);

    // Only create a marker if location is provided
    if (location) {
      const markerInstance = new mapboxgl.Marker()
        .setLngLat(location)
        .addTo(mapInstance);

      setMarker(markerInstance);
    }

    return () => mapInstance.remove();
  }, []);

  useEffect(() => {
    if (map && location) {
      map.flyTo({
        center: location,
        essential: true,
        zoom: 15,
      });

      // If marker doesn't exist yet, create it
      if (!marker) {
        const newMarker = new mapboxgl.Marker()
          .setLngLat(location)
          .addTo(map);
        setMarker(newMarker);
      } else {
        // If marker exists, just update its position
        marker.setLngLat(location);
      }
    }
  }, [location, map, marker]);

  return (
    <div ref={mapContainerRef} className="w-full h-96 border-2 border-blue-800 rounded-lg" />
  );
};

export { MapBoxComponent };