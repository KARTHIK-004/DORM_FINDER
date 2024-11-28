import React, { useState, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const HostelDescription = ({ updateFormData, formData = {} }) => {
  const [description, setDescription] = useState(formData.description || "");

  const handleDescriptionChange = useCallback(
    (e) => {
      const newDescription = e.target.value;
      setDescription(newDescription);
      updateFormData({ description: newDescription });
    },
    [updateFormData]
  );

  const wordCount = description
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Property Description</h2>

      <div>
        <Label htmlFor="description" className="block mb-2">
          Full Description
        </Label>
        <Textarea
          id="description"
          name="description"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Enter a detailed description of the property (minimum 50 words)"
          rows={6}
          aria-describedby="description-help"
        />
        <p id="description-help" className="text-sm text-muted-foreground mt-1">
          {wordCount} words
          {wordCount < 50 && ` (Minimum 50 words needed)`}
        </p>
      </div>
    </div>
  );
};

export default HostelDescription;
