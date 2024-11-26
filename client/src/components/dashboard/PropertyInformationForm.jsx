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

const PropertyInformationForm = ({ updateFormData, formData }) => {
  const [localFormData, setLocalFormData] = useState({
    propertyName: "",
    propertyType: "",
    propertyCategory: "",
    currencyType: "",
    salePrice: "",
    offerPrice: "",
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
    <div>
      <h2 className="text-xl font-semibold mb-4">Property Information</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="propertyName">Property Name</Label>
          <Input
            id="propertyName"
            name="propertyName"
            value={localFormData.propertyName}
            onChange={handleInputChange}
            placeholder="Enter property name"
          />
        </div>
        <div>
          <Label htmlFor="propertyType">Property Type</Label>
          <Select
            value={localFormData.propertyType}
            onValueChange={(value) => handleSelectChange("propertyType", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select property type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hostel">Hostel</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="house">House</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="propertyCategory">Property Category</Label>
          <Select
            value={localFormData.propertyCategory}
            onValueChange={(value) =>
              handleSelectChange("propertyCategory", value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select property category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rent">For Rent</SelectItem>
              <SelectItem value="sale">For Sale</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="currencyType">Currency Type</Label>
          <Select
            value={localFormData.currencyType}
            onValueChange={(value) => handleSelectChange("currencyType", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="GBP">GBP</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="salePrice">Sale Price</Label>
          <Input
            id="salePrice"
            name="salePrice"
            value={localFormData.salePrice}
            onChange={handleInputChange}
            placeholder="Enter sale price"
            type="number"
          />
        </div>
        <div>
          <Label htmlFor="offerPrice">Offer Price</Label>
          <Input
            id="offerPrice"
            name="offerPrice"
            value={localFormData.offerPrice}
            onChange={handleInputChange}
            placeholder="Enter offer price"
            type="number"
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyInformationForm;
