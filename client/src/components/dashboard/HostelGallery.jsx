import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadImages } from "@/utils/api";

const HostelGallery = ({ updateFormData, formData, errors, clearError }) => {
  const [images, setImages] = useState(formData.images || []);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const validImages = files.filter(
      (file) => file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024
    );

    // Log the uploaded files
    const uploadedFiles = Array.from(e.target.files);
    console.log("Uploaded Files:", uploadedFiles);

    // Add valid images to the state
    setImages((prevImages) => [...prevImages, ...uploadedFiles]);

    // Validate the uploaded images
    if (validImages.length === 0) {
      setError("Please upload valid image files (max 5MB each)");
      return;
    }

    if (validImages.length + images.length > 5) {
      setError("Maximum 5 images allowed");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      validImages.forEach((file) => formData.append("images", file));

      const response = await uploadImages(formData);
      const newImages = [...images, ...response.urls].slice(0, 5);

      setImages(newImages);
      updateFormData({ images: newImages });
      clearError("images");
    } catch (error) {
      console.error("Upload error:", error);
      setError(error.response?.data?.message || "Failed to upload images");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (indexToRemove) => {
    const updatedImages = images.filter((_, index) => index !== indexToRemove);
    setImages(updatedImages);
    updateFormData({ images: updatedImages });
  };

  return (
    <div className="space-y-4">
      <div>
        <Input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          disabled={uploading}
        />
        {error && <p className="text-red-500">{error}</p>}
        {errors?.images && <p className="text-red-500">{errors.images}</p>}
        <p className="text-sm text-muted-foreground">
          Upload 3-5 images (max 5MB each)
        </p>
      </div>

      {images.length < 3 && (
        <p className="text-red-500">Please upload at least 3 images</p>
      )}

      <div className="grid grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={image.name || index} className="relative">
            <img
              src={image.name ? URL.createObjectURL(image) : image}
              alt={`Uploaded image ${index + 1}`}
              className="w-full h-32 object-cover rounded"
            />
            <Button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
            >
              X
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HostelGallery;
