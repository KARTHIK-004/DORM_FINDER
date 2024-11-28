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

const HostelInformationForm = ({ updateFormData, formData }) => {
  const [localFormData, setLocalFormData] = useState({
    propertyName: "",
    propertyType: "",
    roomType: "",
    genderPolicy: "",
    pricingPeriod: "monthly",
    price: "",
    capacity: "",
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
      <h2 className="text-2xl font-semibold text-primary mb-2">
        Hostel Information
      </h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="propertyName">Hostel Name</Label>
          <Input
            id="propertyName"
            name="propertyName"
            value={localFormData.propertyName}
            onChange={handleInputChange}
            placeholder="Enter hostel name"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="propertyType">Property Type</Label>
            <Select
              value={localFormData.propertyType}
              onValueChange={(value) =>
                handleSelectChange("propertyType", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hostel">Hostel</SelectItem>
                <SelectItem value="guesthouse">Guesthouse</SelectItem>
                <SelectItem value="dormitory">University Dormitory</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="roomType">Room Type</Label>
            <Select
              value={localFormData.roomType}
              onValueChange={(value) => handleSelectChange("roomType", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select room type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dorm">Dormitory</SelectItem>
                <SelectItem value="private">Private Room</SelectItem>
                <SelectItem value="mixed">Mixed Dorm</SelectItem>
                <SelectItem value="female">Female-only Dorm</SelectItem>
                <SelectItem value="male">Male-only Dorm</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="genderPolicy">Gender Policy</Label>
            <Select
              value={localFormData.genderPolicy}
              onValueChange={(value) =>
                handleSelectChange("genderPolicy", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender policy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mixed">Mixed</SelectItem>
                <SelectItem value="female">Female Only</SelectItem>
                <SelectItem value="male">Male Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="pricingPeriod">Pricing Period</Label>
            <Select
              value={localFormData.pricingPeriod}
              onValueChange={(value) =>
                handleSelectChange("pricingPeriod", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select pricing period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="price">Price (INR)</Label>
            <div className="relative">
              <Input
                id="price"
                name="price"
                value={localFormData.price}
                onChange={handleInputChange}
                placeholder={`Enter price per ${
                  localFormData.pricingPeriod === "monthly" ? "month" : "year"
                }`}
                type="number"
                className="pl-8"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                ₹
              </span>
            </div>
          </div>
          <div>
            <Label htmlFor="capacity">Capacity</Label>
            <Input
              id="capacity"
              name="capacity"
              value={localFormData.capacity}
              onChange={handleInputChange}
              placeholder="Enter total capacity"
              type="number"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelInformationForm;
