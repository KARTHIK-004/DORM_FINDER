import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PropertyDetailsForm = ({ updateFormData, formData }) => {
  const [localFormData, setLocalFormData] = useState({
    propertyId: "",
    pricePerSqft: "",
    structureType: "",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    floors: "",
    garageSize: "",
    availableFrom: "",
    garages: "",
    yearConstructed: "",
    ...formData,
  });

  useEffect(() => {
    updateFormData(localFormData);
  }, [localFormData, updateFormData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setLocalFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="propertyId">Property Id</Label>
          <Input
            id="propertyId"
            name="propertyId"
            value={localFormData.propertyId}
            onChange={handleInputChange}
            placeholder="Enter Value"
          />
        </div>
        <div>
          <Label htmlFor="pricePerSqft">Price per Sqft</Label>
          <Input
            id="pricePerSqft"
            name="pricePerSqft"
            value={localFormData.pricePerSqft}
            onChange={handleInputChange}
            placeholder="Enter Price"
          />
        </div>
        <div>
          <Label htmlFor="structureType">Structure type</Label>
          <Select
            value={localFormData.structureType}
            onValueChange={(value) =>
              handleSelectChange("structureType", value)
            }
          >
            <SelectTrigger id="structureType">
              <SelectValue placeholder="Select structure type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="bedrooms">No of Bedrooms</Label>
          <Input
            id="bedrooms"
            name="bedrooms"
            value={localFormData.bedrooms}
            onChange={handleInputChange}
            placeholder="Enter Value"
          />
        </div>
        <div>
          <Label htmlFor="bathrooms">No of Bathrooms</Label>
          <Input
            id="bathrooms"
            name="bathrooms"
            value={localFormData.bathrooms}
            onChange={handleInputChange}
            placeholder="Enter Value"
          />
        </div>
        <div>
          <Label htmlFor="sqft">Sqft</Label>
          <Input
            id="sqft"
            name="sqft"
            value={localFormData.sqft}
            onChange={handleInputChange}
            placeholder="Enter Value"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="floors">No of Floors</Label>
          <Input
            id="floors"
            name="floors"
            value={localFormData.floors}
            onChange={handleInputChange}
            placeholder="Enter Value"
          />
        </div>
        <div>
          <Label htmlFor="garageSize">Garage size</Label>
          <Input
            id="garageSize"
            name="garageSize"
            value={localFormData.garageSize}
            onChange={handleInputChange}
            placeholder="Enter Value"
          />
        </div>
        <div>
          <Label htmlFor="availableFrom">Available From</Label>
          <Select
            value={localFormData.availableFrom}
            onValueChange={(value) =>
              handleSelectChange("availableFrom", value)
            }
          >
            <SelectTrigger id="availableFrom">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              {[...Array(10)].map((_, i) => (
                <SelectItem key={i} value={`${new Date().getFullYear() + i}`}>
                  {new Date().getFullYear() + i}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div
        className="
grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div>
          <Label htmlFor="garages">No of Garage</Label>
          <Input
            id="garages"
            name="garages"
            value={localFormData.garages}
            onChange={handleInputChange}
            placeholder="Enter Value"
          />
        </div>
        <div>
          <Label htmlFor="yearConstructed">Year Constructed</Label>
          <Select
            value={localFormData.yearConstructed}
            onValueChange={(value) =>
              handleSelectChange("yearConstructed", value)
            }
          >
            <SelectTrigger id="yearConstructed">
              <SelectValue placeholder="Select Date" />
            </SelectTrigger>
            <SelectContent>
              {[...Array(100)].map((_, i) => (
                <SelectItem key={i} value={`${new Date().getFullYear() - i}`}>
                  {new Date().getFullYear() - i}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsForm;
