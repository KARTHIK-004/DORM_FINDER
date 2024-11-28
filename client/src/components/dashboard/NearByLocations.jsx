import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MapPin, Plus, X } from "lucide-react";

const NearByLocations = ({ updateFormData, formData }) => {
  const [locations, setLocations] = useState(formData.nearbyLocations || []);
  const [newLocation, setNewLocation] = useState({ name: "", distance: "" });

  useEffect(() => {
    if (locations !== formData.nearbyLocations) {
      updateFormData({ nearbyLocations: locations });
    }
  }, [locations, formData.nearbyLocations, updateFormData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLocation((prev) => ({ ...prev, [name]: value }));
  };

  const addLocation = () => {
    if (newLocation.name && newLocation.distance) {
      setLocations((prev) => [...prev, newLocation]);
      setNewLocation({ name: "", distance: "" });
    }
  };

  const removeLocation = (index) => {
    setLocations((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Nearby Locations</h2>
      <div>
        <p className="text-muted-foreground mb-6">
          Add points of interest near your hostel to attract potential guests.
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
      </div>
    </div>
  );
};

export default NearByLocations;
