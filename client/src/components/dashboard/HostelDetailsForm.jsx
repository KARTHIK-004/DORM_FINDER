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

const HostelDetailsForm = ({
  updateFormData,
  formData,
  errors,
  clearError,
}) => {
  const [localFormData, setLocalFormData] = useState({
    hostelId: "",
    pricePerNight: "0",
    totalBeds: "",
    bedType: "",
    totalRooms: "",
    bathroomsPerFloor: "0",
    floors: "",
    commonAreaSize: "0",
    availableFrom: new Date().toISOString().split("T")[0],
    yearEstablished: `${new Date().getFullYear()}`,
    ...formData,
  });

  useEffect(() => {
    updateFormData(localFormData);
  }, [localFormData, updateFormData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData((prev) => ({ ...prev, [name]: value }));
    clearError(name);
  };

  const handleSelectChange = (name, value) => {
    setLocalFormData((prev) => ({ ...prev, [name]: value }));
    clearError(name);
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
            onFocus={() => clearError("hostelId")}
            placeholder="Enter Hostel ID"
            className={errors.hostelId ? "border-red-500" : ""}
          />
          {errors.hostelId && (
            <p className="text-red-500 text-sm mt-1">{errors.hostelId}</p>
          )}
        </div>
        <div>
          <Label htmlFor="floors">Number of Floors</Label>
          <Input
            id="floors"
            name="floors"
            value={localFormData.floors}
            onChange={handleInputChange}
            onFocus={() => clearError("floors")}
            placeholder="Enter number of floors"
            type="number"
            className={errors.floors ? "border-red-500" : ""}
          />
          {errors.floors && (
            <p className="text-red-500 text-sm mt-1">{errors.floors}</p>
          )}
        </div>
        <div>
          <Label htmlFor="totalBeds">Total Beds</Label>
          <Input
            id="totalBeds"
            name="totalBeds"
            value={localFormData.totalBeds}
            onChange={handleInputChange}
            onFocus={() => clearError("totalBeds")}
            placeholder="Enter total beds"
            type="number"
            className={errors.totalBeds ? "border-red-500" : ""}
          />
          {errors.totalBeds && (
            <p className="text-red-500 text-sm mt-1">{errors.totalBeds}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="bedType">Bed Type</Label>
          <Select
            value={localFormData.bedType}
            onValueChange={(value) => {
              handleSelectChange("bedType", value);
              clearError("bedType");
            }}
          >
            <SelectTrigger
              id="bedType"
              className={errors.bedType ? "border-red-500" : ""}
            >
              <SelectValue placeholder="Select bed type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single Beds</SelectItem>
              <SelectItem value="bunk">Bunk Beds</SelectItem>
              <SelectItem value="mixed">Mixed (Single & Bunk)</SelectItem>
            </SelectContent>
          </Select>
          {errors.bedType && (
            <p className="text-red-500 text-sm mt-1">{errors.bedType}</p>
          )}
        </div>
        <div>
          <Label htmlFor="totalRooms">Total Rooms</Label>
          <Input
            id="totalRooms"
            name="totalRooms"
            value={localFormData.totalRooms}
            onChange={handleInputChange}
            onFocus={() => clearError("totalRooms")}
            placeholder="Enter total rooms"
            type="number"
            className={errors.totalRooms ? "border-red-500" : ""}
          />
          {errors.totalRooms && (
            <p className="text-red-500 text-sm mt-1">{errors.totalRooms}</p>
          )}
        </div>
        <div>
          <Label htmlFor="bathroomsPerFloor">Bathrooms per Floor</Label>
          <Input
            id="bathroomsPerFloor"
            name="bathroomsPerFloor"
            value={localFormData.bathroomsPerFloor}
            onChange={handleInputChange}
            onFocus={() => clearError("bathroomsPerFloor")}
            placeholder="Enter number of bathrooms"
            type="number"
            className={errors.bathroomsPerFloor ? "border-red-500" : ""}
          />
          {errors.bathroomsPerFloor && (
            <p className="text-red-500 text-sm mt-1">
              {errors.bathroomsPerFloor}
            </p>
          )}
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
            onFocus={() => clearError("commonAreaSize")}
            placeholder="Enter size in sqft"
            type="number"
            className={errors.commonAreaSize ? "border-red-500" : ""}
          />
          {errors.commonAreaSize && (
            <p className="text-red-500 text-sm mt-1">{errors.commonAreaSize}</p>
          )}
        </div>
        <div>
          <Label htmlFor="availableFrom">Available From</Label>
          <Input
            id="availableFrom"
            name="availableFrom"
            value={localFormData.availableFrom}
            onChange={handleInputChange}
            onFocus={() => clearError("availableFrom")}
            type="date"
            className={errors.availableFrom ? "border-red-500" : ""}
          />
          {errors.availableFrom && (
            <p className="text-red-500 text-sm mt-1">{errors.availableFrom}</p>
          )}
        </div>
        <div>
          <Label htmlFor="yearEstablished">Year Established</Label>
          <Select
            value={localFormData.yearEstablished}
            onValueChange={(value) => {
              handleSelectChange("yearEstablished", value);
              clearError("yearEstablished");
            }}
          >
            <SelectTrigger
              id="yearEstablished"
              className={errors.yearEstablished ? "border-red-500" : ""}
            >
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
          {errors.yearEstablished && (
            <p className="text-red-500 text-sm mt-1">
              {errors.yearEstablished}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HostelDetailsForm;
