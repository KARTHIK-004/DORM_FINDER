import React, { useState, useMemo } from "react";

const HostelGallery = ({ updateFormData, formData }) => {
  const [images, setImages] = useState(
    formData.images?.map((file) => ({
      file,
      preview: file instanceof File ? URL.createObjectURL(file) : null,
    })) || []
  );
  const [error, setError] = useState("");

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    const validImages = newImages.filter(
      (img) =>
        img.file.type.startsWith("image/") && img.file.size <= 5 * 1024 * 1024
    );

    if (validImages.length > 0) {
      const updatedImages = [...images, ...validImages].slice(0, 5);
      setImages(updatedImages);

      // Use callback to update form data
      const imageFiles = updatedImages.map((image) => image.file);
      updateFormData({ images: imageFiles });

      setError("");
    } else {
      setError("Please upload valid image files (max 5MB each)");
    }
  };

  const removeImage = (indexToRemove) => {
    const updatedImages = images.filter((_, index) => index !== indexToRemove);

    // Revoke the object URL for the removed image
    const imageToRevoke = images[indexToRemove];
    if (imageToRevoke.preview) {
      URL.revokeObjectURL(imageToRevoke.preview);
    }

    setImages(updatedImages);

    // Update form data after removing image
    const imageFiles = updatedImages.map((image) => image.file);
    updateFormData({ images: imageFiles });
  };

  // Memoize cleanup to prevent unnecessary rerenders
  useMemo(() => {
    return () => {
      images.forEach((image) => {
        if (image.preview) {
          URL.revokeObjectURL(image.preview);
        }
      });
    };
  }, [images]);

  return (
    <div className="space-y-4">
      <div>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
        />
        {error && <p className="text-red-500">{error}</p>}
        <p className="text-sm text-muted-foreground">
          Upload 3-5 images (max 5MB each)
        </p>
      </div>

      {images.length < 3 && (
        <p className="text-red-500">Please upload at least 3 images</p>
      )}

      <div className="grid grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={image.preview || index} className="relative">
            <img
              src={image.preview}
              alt={`Uploaded image ${index + 1}`}
              className="w-full h-32 object-cover rounded"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HostelGallery;
