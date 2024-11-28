import React, { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

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

const HostelAmenities = ({ updateFormData, formData, errors, clearError }) => {
  const [selectedAmenities, setSelectedAmenities] = useState(
    formData.amenities || []
  );
  const [error, setError] = useState("");

  useEffect(() => {
    updateFormData({ amenities: selectedAmenities });
    validateAmenities(selectedAmenities);
  }, [selectedAmenities, updateFormData]);

  const validateAmenities = (amenities) => {
    if (amenities.length < 3) {
      setError("Please select at least 3 amenities");
    } else {
      setError("");
      clearError("amenities");
    }
  };

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
      {(error || errors.amenities) && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error || errors.amenities}</AlertDescription>
        </Alert>
      )}
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
      <p className="text-sm text-muted-foreground">
        Selected amenities: {selectedAmenities.length} (minimum 3 required)
      </p>
    </div>
  );
};

export default HostelAmenities;
