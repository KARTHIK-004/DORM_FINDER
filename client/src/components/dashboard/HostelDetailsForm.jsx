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

const HostelDetailsForm = ({ updateFormData, formData }) => {
  const [localFormData, setLocalFormData] = useState({
    hostelId: "",
    pricePerNight: "",
    totalBeds: "",
    bedType: "",
    totalRooms: "",
    bathroomsPerFloor: "",
    floors: "",
    commonAreaSize: "",
    availableFrom: "",
    yearEstablished: "",
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
      <div>
        <h2 className="text-2xl font-semibold text-primary mb-2">
          Hostel Details
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="hostelId">Hostel ID</Label>
          <Input
            id="hostelId"
            name="hostelId"
            value={localFormData.hostelId}
            onChange={handleInputChange}
            placeholder="Enter Hostel ID"
          />
        </div>
        <div>
          <Label htmlFor="floors">Number of Floors</Label>
          <Input
            id="floors"
            name="floors"
            value={localFormData.floors}
            onChange={handleInputChange}
            placeholder="Enter number of floors"
            type="number"
          />
        </div>
        <div>
          <Label htmlFor="totalBeds">Total Beds</Label>
          <Input
            id="totalBeds"
            name="totalBeds"
            value={localFormData.totalBeds}
            onChange={handleInputChange}
            placeholder="Enter total beds"
            type="number"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="bedType">Bed Type</Label>
          <Select
            value={localFormData.bedType}
            onValueChange={(value) => handleSelectChange("bedType", value)}
          >
            <SelectTrigger id="bedType">
              <SelectValue placeholder="Select bed type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single Beds</SelectItem>
              <SelectItem value="bunk">Bunk Beds</SelectItem>
              <SelectItem value="mixed">Mixed (Single & Bunk)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="totalRooms">Total Rooms</Label>
          <Input
            id="totalRooms"
            name="totalRooms"
            value={localFormData.totalRooms}
            onChange={handleInputChange}
            placeholder="Enter total rooms"
            type="number"
          />
        </div>
        <div>
          <Label htmlFor="bathroomsPerFloor">Bathrooms per Floor</Label>
          <Input
            id="bathroomsPerFloor"
            name="bathroomsPerFloor"
            value={localFormData.bathroomsPerFloor}
            onChange={handleInputChange}
            placeholder="Enter number of bathrooms"
            type="number"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="commonAreaSize">Common Area Size (sqft)</Label>
          <Input
            id="commonAreaSize"
            name="commonAreaSize"
            value={localFormData.commonAreaSize}
            onChange={handleInputChange}
            placeholder="Enter size in sqft"
            type="number"
          />
        </div>
        <div>
          <Label htmlFor="availableFrom">Available From</Label>
          <Input
            id="availableFrom"
            name="availableFrom"
            value={localFormData.availableFrom}
            onChange={handleInputChange}
            type="date"
          />
        </div>
        <div>
          <Label htmlFor="yearEstablished">Year Established</Label>
          <Select
            value={localFormData.yearEstablished}
            onValueChange={(value) =>
              handleSelectChange("yearEstablished", value)
            }
          >
            <SelectTrigger id="yearEstablished">
              <SelectValue placeholder="Select Year" />
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

export default HostelDetailsForm;
