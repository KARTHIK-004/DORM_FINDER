import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";

const PropertyGallery = () => {
  const { toast } = useToast();
  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(images);
    toast({
      title: "Images Uploaded",
      description: "Your property images have been successfully uploaded.",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-4xl mx-auto p-6 space-y-6"
    >
      <div>
        <h2 className="text-2xl font-semibold text-primary mb-2">
          Property Gallery
        </h2>
        <p className="text-muted-foreground mb-6">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's
        </p>
      </div>

      <div className="space-y-4">
        <Label htmlFor="photo-upload">Photo</Label>
        <div className="flex flex-wrap gap-4 mb-4">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(image)}
                alt={`Property ${index + 1}`}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute -top-2 -right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Input
            type="file"
            id="photo-upload"
            accept="image/jpeg,image/png,image/jpg"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
          <Label
            htmlFor="photo-upload"
            className="flex-1 py-2 px-4 bg-secondary text-secondary-foreground rounded-md cursor-pointer text-center"
          >
            Select Photo
          </Label>
          <Button type="submit">Upload Photos</Button>
        </div>

        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            • The maximum photo size is 8 MB. Formats: jpeg, jpg, png. Put the
            main picture first
          </p>
          <p>• Maximum number of files upload will be 10 files.</p>
          {images.length > 0 && (
            <p className="text-green-500">
              ✓ {images.length} photo(s) selected
            </p>
          )}
        </div>
      </div>
    </form>
  );
};

export default PropertyGallery;
