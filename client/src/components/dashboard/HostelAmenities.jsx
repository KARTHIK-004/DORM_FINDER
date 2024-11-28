import React, { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const amenitiesList = [
  { key: "airConditioning", label: "Air Conditioning" },
  { key: "balcony", label: "Balcony" },
  { key: "gym", label: "Gym" },
  { key: "parking", label: "Parking" },
  { key: "pool", label: "Pool" },
  { key: "elevator", label: "Elevator" },
  { key: "furnished", label: "Furnished" },
  { key: "petFriendly", label: "Pet Friendly" },
  { key: "washerDryer", label: "Washer/Dryer" },
  { key: "securitySystem", label: "Security System" },
  { key: "internet", label: "Internet" },
  { key: "tvCable", label: "TV Cable" },
];

const HostelAmenities = ({ updateFormData, formData }) => {
  const [selectedAmenities, setSelectedAmenities] = useState(
    amenitiesList.reduce((acc, amenity) => {
      acc[amenity.key] = formData.amenities?.[amenity.key] || false;
      return acc;
    }, {})
  );

  useEffect(() => {
    updateFormData({ amenities: selectedAmenities });
  }, [selectedAmenities, updateFormData]);

  const handleAmenityChange = (key) => {
    setSelectedAmenities((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Amenities</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {amenitiesList.map(({ key, label }) => (
          <div className="flex items-center space-x-2" key={key}>
            <Checkbox
              id={key}
              checked={selectedAmenities[key]}
              onCheckedChange={() => handleAmenityChange(key)}
            />
            <Label htmlFor={key}>{label}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HostelAmenities;
