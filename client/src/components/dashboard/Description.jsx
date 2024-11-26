import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const Description = ({ updateFormData, formData }) => {
  const [description, setDescription] = useState(formData.description || "");

  useEffect(() => {
    updateFormData({ description });
  }, [description, updateFormData]);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Property Description</h2>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Enter a detailed description of the property"
          rows={6}
        />
      </div>
    </div>
  );
};

export default Description;
