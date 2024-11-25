"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PropertyListing() {
  const [propertyData, setPropertyData] = useState({
    propertyName: "",
    propertyType: "",
    propertyCategory: "",
    currencyType: "",
    salePrice: "",
    offerPrice: "",
    propertyId: "",
    pricePerSqft: "",
    structureType: "",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    floors: "",
    garageSize: "",
    availableFrom: "",
    yearConstructed: "",
    amenities: {
      airConditioning: false,
      lawn: false,
      tvCable: false,
      dryer: false,
      wifi: false,
      refrigerator: false,
      swimmingPool: false,
      outdoorShower: false,
      laundry: false,
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPropertyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAmenityChange = (amenity, checked) => {
    setPropertyData((prev) => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [amenity]: checked,
      },
    }));
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Tabs defaultValue="information" className="w-full">
        <TabsList className="bg-purple-100 p-1 w-full flex flex-wrap gap-2">
          <TabsTrigger
            value="information"
            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
          >
            Property Information
          </TabsTrigger>
          <TabsTrigger
            value="details"
            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
          >
            Property Details
          </TabsTrigger>
          <TabsTrigger
            value="amenities"
            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
          >
            Amenities
          </TabsTrigger>
          <TabsTrigger
            value="documents"
            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
          >
            Documents
          </TabsTrigger>
          <TabsTrigger
            value="gallery"
            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
          >
            Gallery
          </TabsTrigger>
          <TabsTrigger
            value="videos"
            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
          >
            Videos
          </TabsTrigger>
          <TabsTrigger
            value="description"
            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
          >
            Description
          </TabsTrigger>
          <TabsTrigger
            value="floorplans"
            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
          >
            Floor Plans
          </TabsTrigger>
          <TabsTrigger
            value="location"
            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
          >
            Location
          </TabsTrigger>
        </TabsList>

        <TabsContent value="information" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Property Information</CardTitle>
              <CardDescription>
                Enter the basic information about your property.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="propertyName">Property Name</Label>
                <Input
                  id="propertyName"
                  name="propertyName"
                  value={propertyData.propertyName}
                  onChange={handleInputChange}
                  placeholder="Enter Name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Property Type</Label>
                  <Select
                    onValueChange={(value) =>
                      setPropertyData((prev) => ({
                        ...prev,
                        propertyType: value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Buy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="buy">Buy</SelectItem>
                      <SelectItem value="rent">Rent</SelectItem>
                      <SelectItem value="lease">Lease</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Property Category</Label>
                  <Select
                    onValueChange={(value) =>
                      setPropertyData((prev) => ({
                        ...prev,
                        propertyCategory: value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Currency Type</Label>
                  <Select
                    onValueChange={(value) =>
                      setPropertyData((prev) => ({
                        ...prev,
                        currencyType: value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD</SelectItem>
                      <SelectItem value="eur">EUR</SelectItem>
                      <SelectItem value="gbp">GBP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salePrice">Sale Price</Label>
                  <Input
                    id="salePrice"
                    name="salePrice"
                    value={propertyData.salePrice}
                    onChange={handleInputChange}
                    placeholder="Enter Sale Price"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="offerPrice">Offer Price</Label>
                  <Input
                    id="offerPrice"
                    name="offerPrice"
                    value={propertyData.offerPrice}
                    onChange={handleInputChange}
                    placeholder="Enter Offer Price"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
              <CardDescription>
                Enter detailed information about your property.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="propertyId">Property Id</Label>
                  <Input
                    id="propertyId"
                    name="propertyId"
                    value={propertyData.propertyId}
                    onChange={handleInputChange}
                    placeholder="Enter Value"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pricePerSqft">Price per Sq.ft</Label>
                  <Input
                    id="pricePerSqft"
                    name="pricePerSqft"
                    value={propertyData.pricePerSqft}
                    onChange={handleInputChange}
                    placeholder="Enter Price"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Structure type</Label>
                  <Select
                    onValueChange={(value) =>
                      setPropertyData((prev) => ({
                        ...prev,
                        structureType: value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="brick">Brick</SelectItem>
                      <SelectItem value="concrete">Concrete</SelectItem>
                      <SelectItem value="wood">Wood</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bedrooms">No of Bedrooms</Label>
                  <Input
                    id="bedrooms"
                    name="bedrooms"
                    value={propertyData.bedrooms}
                    onChange={handleInputChange}
                    placeholder="Enter Value"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bathrooms">No of Bathrooms</Label>
                  <Input
                    id="bathrooms"
                    name="bathrooms"
                    value={propertyData.bathrooms}
                    onChange={handleInputChange}
                    placeholder="Enter Value"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sqft">Sq.ft</Label>
                  <Input
                    id="sqft"
                    name="sqft"
                    value={propertyData.sqft}
                    onChange={handleInputChange}
                    placeholder="Enter Value"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="floors">No of Floors</Label>
                  <Input
                    id="floors"
                    name="floors"
                    value={propertyData.floors}
                    onChange={handleInputChange}
                    placeholder="Enter Value"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="garageSize">Garage size</Label>
                  <Input
                    id="garageSize"
                    name="garageSize"
                    value={propertyData.garageSize}
                    onChange={handleInputChange}
                    placeholder="Enter Value"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Available From</Label>
                  <Select
                    onValueChange={(value) =>
                      setPropertyData((prev) => ({
                        ...prev,
                        availableFrom: value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2026">2026</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Year Constructed</Label>
                  <Select
                    onValueChange={(value) =>
                      setPropertyData((prev) => ({
                        ...prev,
                        yearConstructed: value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2020">2020</SelectItem>
                      <SelectItem value="2021">2021</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="amenities" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Amenities</CardTitle>
              <CardDescription>
                Select the amenities available in your property.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="airConditioning"
                    checked={propertyData.amenities.airConditioning}
                    onCheckedChange={(checked) =>
                      handleAmenityChange("airConditioning")
                    }
                  />
                  <Label htmlFor="airConditioning">Air Conditioning</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="lawn"
                    checked={propertyData.amenities.lawn}
                    onCheckedChange={(checked) => handleAmenityChange("lawn")}
                  />
                  <Label htmlFor="lawn">Lawn</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="tvCable"
                    checked={propertyData.amenities.tvCable}
                    onCheckedChange={(checked) =>
                      handleAmenityChange("tvCable")
                    }
                  />
                  <Label htmlFor="tvCable">TV Cable</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="dryer"
                    checked={propertyData.amenities.dryer}
                    onCheckedChange={(checked) => handleAmenityChange("dryer")}
                  />
                  <Label htmlFor="dryer">Dryer</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="wifi"
                    checked={propertyData.amenities.wifi}
                    onCheckedChange={(checked) => handleAmenityChange("wifi")}
                  />
                  <Label htmlFor="wifi">WiFi</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="refrigerator"
                    checked={propertyData.amenities.refrigerator}
                    onCheckedChange={(checked) =>
                      handleAmenityChange("refrigerator")
                    }
                  />
                  <Label htmlFor="refrigerator">Refrigerator</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="swimmingPool"
                    checked={propertyData.amenities.swimmingPool}
                    onCheckedChange={(checked) =>
                      handleAmenityChange("swimmingPool")
                    }
                  />
                  <Label htmlFor="swimmingPool">Swimming Pool</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="outdoorShower"
                    checked={propertyData.amenities.outdoorShower}
                    onCheckedChange={(checked) =>
                      handleAmenityChange("outdoorShower")
                    }
                  />
                  <Label htmlFor="outdoorShower">Outdoor Shower</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="laundry"
                    checked={propertyData.amenities.laundry}
                    onCheckedChange={(checked) =>
                      handleAmenityChange("laundry")
                    }
                  />
                  <Label htmlFor="laundry">Laundry</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Placeholder content for other tabs */}
        <TabsContent value="documents">Documents content</TabsContent>
        <TabsContent value="gallery">Gallery content</TabsContent>
        <TabsContent value="videos">Videos content</TabsContent>
        <TabsContent value="description">Description content</TabsContent>
        <TabsContent value="floorplans">Floor Plans content</TabsContent>
        <TabsContent value="location">Location content</TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
