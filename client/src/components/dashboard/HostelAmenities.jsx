import React, { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const amenitiesList = [
  { id: "airConditioning", label: "Air Conditioning" },
  { id: "balcony", label: "Balcony" },
  { id: "gym", label: "Gym" },
  { id: "parking", label: "Parking" },
  { id: "pool", label: "Pool" },
  { id: "elevator", label: "Elevator" },
  { id: "furnished", label: "Furnished" },
  { id: "petFriendly", label: "Pet Friendly" },
  { id: "washerDryer", label: "Washer/Dryer" },
  { id: "securitySystem", label: "Security System" },
  { id: "internet", label: "Internet" },
  { id: "tvCable", label: "TV Cable" },
];

const HostelAmenities = ({ formData, updateFormData, errors, clearError }) => {
  const [selectedAmenities, setSelectedAmenities] = useState(
    formData.amenities ||
      Object.fromEntries(amenitiesList.map(({ id }) => [id, false]))
  );

  useEffect(() => {
    validateAmenities(selectedAmenities);
  }, [selectedAmenities]);

  const validateAmenities = (amenities) => {
    const selectedCount = Object.values(amenities).filter(Boolean).length;
    if (selectedCount < 3) {
      updateFormData({
        amenities,
        error: "Please select at least 3 amenities",
      });
    } else {
      updateFormData({ amenities, error: "" });
      clearError("amenities");
    }
  };

  const handleAmenityChange = (amenityId) => {
    setSelectedAmenities((prev) => ({
      ...prev,
      [amenityId]: !prev[amenityId],
    }));
  };

  const selectedCount = Object.values(selectedAmenities).filter(Boolean).length;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-primary mb-2">
        Hostel Amenities
      </h2>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {amenitiesList.map(({ id, label }) => (
            <div key={id} className="flex items-center space-x-2">
              <Checkbox
                id={id}
                checked={selectedAmenities[id]}
                onCheckedChange={() => handleAmenityChange(id)}
              />
              <Label
                htmlFor={id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {label}
              </Label>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Selected amenities: {selectedCount} (minimum 3 required)
        </p>
        {formData.error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{formData.error}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default HostelAmenities;
