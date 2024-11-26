import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const FloorPlan = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    planName: "",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    currencyType: "",
    salePrice: "",
    description: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    console.log(selectedFile);
    toast({
      title: "Floor Plan Submitted",
      description: "Your floor plan details have been successfully saved.",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-4xl mx-auto p-6 space-y-6"
    >
      <div>
        <h2 className="text-2xl font-semibold text-primary mb-2">Floor Plan</h2>
        <p className="text-muted-foreground mb-6">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="planName">Plan Name</Label>
          <Input
            id="planName"
            name="planName"
            value={formData.planName}
            onChange={handleInputChange}
            placeholder="Plan Name"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="bedrooms">No of Bedrooms</Label>
            <Input
              id="bedrooms"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleInputChange}
              placeholder="Enter Value"
            />
          </div>
          <div>
            <Label htmlFor="bathrooms">No of Bathrooms</Label>
            <Input
              id="bathrooms"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleInputChange}
              placeholder="Enter Value"
            />
          </div>
          <div>
            <Label htmlFor="sqft">Sqft</Label>
            <Input
              id="sqft"
              name="sqft"
              value={formData.sqft}
              onChange={handleInputChange}
              placeholder="Enter Value"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="currencyType">Currency Type</Label>
            <Select
              onValueChange={(value) =>
                handleSelectChange("currencyType", value)
              }
            >
              <SelectTrigger id="currencyType">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">USD</SelectItem>
                <SelectItem value="eur">EUR</SelectItem>
                <SelectItem value="gbp">GBP</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="salePrice">Sale Price</Label>
            <Input
              id="salePrice"
              name="salePrice"
              value={formData.salePrice}
              onChange={handleInputChange}
              placeholder="Enter Value"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="description">Enter Description of Property</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="floor-plan-upload">Photo</Label>
          <div className="flex items-center gap-4">
            <Input
              type="file"
              id="floor-plan-upload"
              accept="image/jpeg,image/png,image/jpg"
              onChange={handleFileChange}
              className="hidden"
            />
            <Label
              htmlFor="floor-plan-upload"
              className="flex-1 py-2 px-4 bg-secondary text-secondary-foreground rounded-md cursor-pointer text-center"
            >
              Select Photo
            </Label>
            <Button type="submit">Upload Photos</Button>
          </div>
          {selectedFile && (
            <p className="mt-2 text-sm text-green-500">
              ✓ File selected: {selectedFile.name}
            </p>
          )}
        </div>
      </div>
    </form>
  );
};

export default FloorPlan;
