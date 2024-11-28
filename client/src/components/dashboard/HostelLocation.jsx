import React, { useState, useEffect, useRef, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const HostelLocation = ({ updateFormData, formData }) => {
  const [localFormData, setLocalFormData] = useState({
    address: formData.address || "",
    city: formData.city || "",
    state: formData.state || "",
    zipCode: formData.zipCode || "",
    country: formData.country || "",
    latitude: formData.latitude || "41.92747657026781",
    longitude: formData.longitude || "-74.00669242427526",
  });

  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Use useMemo to memoize the update effect
  useMemo(() => {
    const timer = setTimeout(() => {
      updateFormData(localFormData);
    }, 300);

    return () => clearTimeout(timer);
  }, [localFormData, updateFormData]);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    };

    window.initMap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: {
          lat: parseFloat(localFormData.latitude),
          lng: parseFloat(localFormData.longitude),
        },
        zoom: 15,
      });

      markerRef.current = new window.google.maps.Marker({
        position: {
          lat: parseFloat(localFormData.latitude),
          lng: parseFloat(localFormData.longitude),
        },
        map: map,
        draggable: true,
      });

      window.google.maps.event.addListener(
        markerRef.current,
        "dragend",
        (event) => {
          const lat = event.latLng.lat();
          const lng = event.latLng.lng();
          setLocalFormData((prev) => ({
            ...prev,
            latitude: lat.toString(),
            longitude: lng.toString(),
          }));
        }
      );
    };

    if (!window.google) {
      loadGoogleMapsScript();
    } else {
      window.initMap();
    }
  }, [localFormData.latitude, localFormData.longitude]);

  const updateMapLocation = () => {
    if (markerRef.current && window.google) {
      const newPosition = new window.google.maps.LatLng(
        parseFloat(localFormData.latitude),
        parseFloat(localFormData.longitude)
      );
      markerRef.current.setPosition(newPosition);
      mapRef.current.panTo(newPosition);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Property Location</h2>
      <div>
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          name="address"
          value={localFormData.address}
          onChange={handleInputChange}
          placeholder="Enter street address"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            name="city"
            value={localFormData.city}
            onChange={handleInputChange}
            placeholder="Enter city"
          />
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            name="state"
            value={localFormData.state}
            onChange={handleInputChange}
            placeholder="Enter state"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="zipCode">Zip Code</Label>
          <Input
            id="zipCode"
            name="zipCode"
            value={localFormData.zipCode}
            onChange={handleInputChange}
            placeholder="Enter zip code"
          />
        </div>
        <div>
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            name="country"
            value={localFormData.country}
            onChange={handleInputChange}
            placeholder="Enter country"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="latitude">Latitude</Label>
          <Input
            id="latitude"
            name="latitude"
            value={localFormData.latitude}
            onChange={handleInputChange}
            placeholder="Enter latitude"
          />
        </div>
        <div>
          <Label htmlFor="longitude">Longitude</Label>
          <Input
            id="longitude"
            name="longitude"
            value={localFormData.longitude}
            onChange={handleInputChange}
            placeholder="Enter longitude"
          />
        </div>
      </div>
      <Button onClick={updateMapLocation}>Update Map Location</Button>
      <div className="mt-6">
        <div
          ref={mapRef}
          className="rounded-lg overflow-hidden border border-border"
          style={{ width: "100%", height: "450px" }}
        ></div>
      </div>
    </div>
  );
};

export default HostelLocation;
