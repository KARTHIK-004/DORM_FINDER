import React, { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const amenitiesList = [
  "Air Conditioning",
  "Balcony",
  "Gym",
  "Parking",
  "Pool",
  "Elevator",
  "Furnished",
  "Pet Friendly",
  "Washer/Dryer",
  "Security System",
  "Internet",
  "TV Cable",
];

const Amenities = ({ updateFormData, formData }) => {
  const [selectedAmenities, setSelectedAmenities] = useState(
    formData.amenities || []
  );

  useEffect(() => {
    updateFormData({ amenities: selectedAmenities });
  }, [selectedAmenities, updateFormData]);

  const handleAmenityChange = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Amenities</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {amenitiesList.map((amenity) => (
          <div className="flex items-center space-x-2" key={amenity}>
            <Checkbox
              id={amenity}
              checked={selectedAmenities.includes(amenity)}
              onCheckedChange={() => handleAmenityChange(amenity)}
            />
            <Label htmlFor={amenity}>{amenity}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Amenities;
