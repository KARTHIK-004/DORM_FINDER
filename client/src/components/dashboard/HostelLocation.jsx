import React, { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Map from "../Map";

const HostelLocation = ({ updateFormData, formData, errors, clearError }) => {
  const [localFormData, setLocalFormData] = useState({
    address: formData.address || "",
    city: formData.city || "",
    state: formData.state || "",
    zipCode: formData.zipCode || "",
    country: formData.country || "",
    latitude: formData.latitude || "13.0843",
    longitude: formData.longitude || "80.2705",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    clearError(name);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      updateFormData(localFormData);
    }, 300);

    return () => clearTimeout(timer);
  }, [localFormData, updateFormData]);

  const updateMapLocation = () => {
    // This function is now handled by the Map component
  };

  const mapCenter = useMemo(() => {
    const lat = parseFloat(localFormData.latitude);
    const lng = parseFloat(localFormData.longitude);
    return [lat, lng];
  }, [localFormData.latitude, localFormData.longitude]);

  const popupContent = `${localFormData.address}, ${localFormData.city}, ${localFormData.state}, ${localFormData.country}`;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Property Location</h2>
      <div>
        <Label htmlFor="hostel-address">Address</Label>
        <Input
          id="hostel-address"
          name="address"
          value={localFormData.address}
          onChange={handleInputChange}
          placeholder="Enter street address"
        />
        {errors.address && (
          <p className="text-red-500 text-sm mt-1">{errors.address}</p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="hostel-city">City</Label>
          <Input
            id="hostel-city"
            name="city"
            value={localFormData.city}
            onChange={handleInputChange}
            placeholder="Enter city"
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
          )}
        </div>
        <div>
          <Label htmlFor="hostel-state">State</Label>
          <Input
            id="hostel-state"
            name="state"
            value={localFormData.state}
            onChange={handleInputChange}
            placeholder="Enter state"
          />
          {errors.state && (
            <p className="text-red-500 text-sm mt-1">{errors.state}</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="hostel-zip-code">Zip Code</Label>
          <Input
            id="hostel-zip-code"
            name="zipCode"
            value={localFormData.zipCode}
            onChange={handleInputChange}
            placeholder="Enter zip code"
          />
          {errors.zipCode && (
            <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
          )}
        </div>
        <div>
          <Label htmlFor="hostel-country">Country</Label>
          <Input
            id="hostel-country"
            name="country"
            value={localFormData.country}
            onChange={handleInputChange}
            placeholder="Enter country"
          />
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">{errors.country}</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="hostel-latitude">Latitude</Label>
          <Input
            id="hostel-latitude"
            name="latitude"
            value={localFormData.latitude}
            onChange={handleInputChange}
            placeholder="Enter latitude"
          />
          {errors.latitude && (
            <p className="text-red-500 text-sm mt-1">{errors.latitude}</p>
          )}
        </div>
        <div>
          <Label htmlFor="hostel-longitude">Longitude</Label>
          <Input
            id="hostel-longitude"
            name="longitude"
            value={localFormData.longitude}
            onChange={handleInputChange}
            placeholder="Enter longitude"
          />
          {errors.longitude && (
            <p className="text-red-500 text-sm mt-1">{errors.longitude}</p>
          )}
        </div>
      </div>
      <Button onClick={updateMapLocation}>Update Map Location</Button>
      <Map center={mapCenter} popupContent={popupContent} />
    </div>
  );
};

export default HostelLocation;
