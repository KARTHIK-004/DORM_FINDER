import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MapPin, Plus, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const NearByLocations = ({ updateFormData, formData, errors, clearError }) => {
  const [locations, setLocations] = useState(formData.nearbyLocations || []);
  const [newLocation, setNewLocation] = useState({ name: "", distance: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLocation((prev) => ({ ...prev, [name]: value }));
  };

  const addLocation = () => {
    if (newLocation.name && newLocation.distance) {
      const updatedLocations = [...locations, newLocation];
      setLocations(updatedLocations);
      updateFormData({ nearbyLocations: updatedLocations });
      setNewLocation({ name: "", distance: "" });
      clearError("nearbyLocations");
    }
  };

  const removeLocation = (index) => {
    const updatedLocations = locations.filter((_, i) => i !== index);
    setLocations(updatedLocations);
    updateFormData({ nearbyLocations: updatedLocations });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Nearby Locations</h2>
      <div>
        <p className="text-muted-foreground mb-6">
          Add points of interest near your hostel to attract potential guests.
          Please add at least 2 nearby locations.
        </p>

        <div className="space-y-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-grow">
              <Label htmlFor="locationName">Location Name</Label>
              <Input
                id="locationName"
                name="name"
                value={newLocation.name}
                onChange={handleInputChange}
                placeholder="e.g., City Center, Train Station"
              />
            </div>
            <div className="w-32">
              <Label htmlFor="locationDistance">Distance (km)</Label>
              <Input
                id="locationDistance"
                name="distance"
                type="number"
                value={newLocation.distance}
                onChange={handleInputChange}
                placeholder="e.g., 0.5"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={addLocation} className="mb-0.5">
                <Plus className="h-4 w-4 mr-2" /> Add Location
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {locations.map((location, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-background p-3 rounded-md shadow-sm"
            >
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="font-medium">{location.name}</span>
                <span className="text-muted-foreground">
                  ({location.distance} km)
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeLocation(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        {(locations.length < 2 || errors.nearbyLocations) && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>
              {locations.length < 2
                ? "Please add at least 2 nearby locations"
                : errors.nearbyLocations}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default NearByLocations;
