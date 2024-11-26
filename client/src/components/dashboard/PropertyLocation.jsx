import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PropertyLocation = ({ updateFormData, formData }) => {
  const [localFormData, setLocalFormData] = useState({
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    ...formData,
  });

  useEffect(() => {
    updateFormData(localFormData);
  }, [localFormData, updateFormData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Property Location</h2>
      <div>
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          name="address"
          value={localFormData.address}
          onChange={handleInputChange}
          placeholder="Enter street address"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            name="city"
            value={localFormData.city}
            onChange={handleInputChange}
            placeholder="Enter city"
          />
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            name="state"
            value={localFormData.state}
            onChange={handleInputChange}
            placeholder="Enter state"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="zipCode">Zip Code</Label>
          <Input
            id="zipCode"
            name="zipCode"
            value={localFormData.zipCode}
            onChange={handleInputChange}
            placeholder="Enter zip code"
          />
        </div>
        <div>
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            name="country"
            value={localFormData.country}
            onChange={handleInputChange}
            placeholder="Enter country"
          />
        </div>
      </div>
      <div className="mt-6">
        <div className="rounded-lg overflow-hidden border border-border">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2917.149094708006!2d-74.00669242427526!3d41.92747657026781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89dd0e0a6c2eef77%3A0xc745d75c5b0d0f9f!2s132%20Kingston%20St%2C%20Kingston%2C%20NY%2012401%2C%20USA!5e0!3m2!1sen!2s!4v1700999547744!5m2!1sen!2s"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default PropertyLocation;
