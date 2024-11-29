import React, { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import NearByLocations from "./NearByLocations";
import HostelLocation from "./HostelLocation";
import HostelDescription from "./HostelDescription";
import HostelGallery from "./HostelGallery";
import HostelAmenities from "./HostelAmenities";
import HostelDetailsForm from "./HostelDetailsForm";
import HostelInformationForm from "./HostelInformationForm";
import { createListing } from "@/utils/api";

const Stepper = ({ initialStep = 1 }) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const clearError = (fieldName) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[fieldName];
      return newErrors;
    });
  };

  const validateStep = (stepData, stepId) => {
    const newErrors = {};

    if (stepId === "hostelInfo") {
      const requiredFields = [
        "propertyName",
        "propertyType",
        "roomType",
        "genderPolicy",
        "pricingPeriod",
        "price",
        "capacity",
      ];
      requiredFields.forEach((field) => {
        if (!stepData[field]) {
          newErrors[field] = "This field is required";
        }
      });
    } else if (stepId === "hostelDetails") {
      const requiredFields = [
        "hostelId",
        "totalBeds",
        "bedType",
        "totalRooms",
        "floors",
        "bathroomsPerFloor",
        "commonAreaSize",
        "availableFrom",
        "yearEstablished",
      ];
      requiredFields.forEach((field) => {
        if (!stepData[field]) {
          newErrors[field] = "This field is required";
        }
      });
    } else if (stepId === "amenities") {
      if (!stepData.amenities || stepData.amenities.length < 3) {
        newErrors.amenities = "Please select at least 3 amenities";
      }
    } else if (stepId === "description") {
      if (
        !stepData.description ||
        stepData.description.trim().split(/\s+/).length < 50
      ) {
        newErrors.description = "Description must be at least 50 words";
      }
    } else if (stepId === "location") {
      const requiredFields = ["address", "city", "state", "country", "zipCode"];
      requiredFields.forEach((field) => {
        if (!stepData[field]) {
          newErrors[field] = "This field is required";
        }
      });
    } else if (stepId === "nearBy") {
      if (!stepData.nearbyLocations || stepData.nearbyLocations.length < 2) {
        newErrors.nearbyLocations = "Please add at least 2 nearby locations";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    const currentStepData = formData[steps[currentStep - 1].id] || {};
    if (!validateStep(currentStepData, steps[currentStep - 1].id)) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all required fields before proceeding.",
        variant: "destructive",
      });
      return;
    }

    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsSubmitting(true);
      try {
        const listingData = {
          ...formData.hostelInfo,
          ...formData.hostelDetails,
          amenities: formData.amenities?.amenities || [],
          images: formData.gallery?.images || [],
          description: formData.description?.description || "",
          ...formData.location,
          nearbyLocations: formData.nearBy?.nearbyLocations || [],
        };
        const response = await createListing(listingData);
        console.log("Listing created:", response);
        toast({
          title: "Property Listing Completed",
          description: "Your property has been successfully listed.",
        });
      } catch (error) {
        console.error("Error creating listing:", error);
        toast({
          title: "Error",
          description:
            "There was an error creating your listing. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (stepId, stepData) => {
    setFormData((prevData) => ({
      ...prevData,
      [stepId]: { ...prevData[stepId], ...stepData },
    }));
  };

  const steps = [
    {
      id: "hostelInfo",
      label: "Hostel Information",
      component: (
        <HostelInformationForm
          updateFormData={(data) => updateFormData("hostelInfo", data)}
          formData={formData.hostelInfo || {}}
          errors={errors}
          clearError={clearError}
        />
      ),
    },
    {
      id: "hostelDetails",
      label: "Hostel Details",
      component: (
        <HostelDetailsForm
          updateFormData={(data) => updateFormData("hostelDetails", data)}
          formData={formData.hostelDetails || {}}
          errors={errors}
          clearError={clearError}
        />
      ),
    },
    {
      id: "amenities",
      label: "Amenities",
      component: (
        <HostelAmenities
          updateFormData={(data) => updateFormData("amenities", data)}
          formData={formData.amenities || {}}
          errors={errors}
          clearError={clearError}
        />
      ),
    },
    {
      id: "gallery",
      label: "Hostel Gallery",
      component: (
        <HostelGallery
          updateFormData={(data) => updateFormData("gallery", data)}
          formData={formData.gallery || {}}
          errors={errors}
          clearError={clearError}
        />
      ),
    },
    {
      id: "description",
      label: "Description",
      component: (
        <HostelDescription
          updateFormData={(data) => updateFormData("description", data)}
          formData={formData.description || {}}
          errors={errors}
          clearError={clearError}
        />
      ),
    },
    {
      id: "location",
      label: "Location",
      component: (
        <HostelLocation
          updateFormData={(data) => updateFormData("location", data)}
          formData={formData.location || {}}
          errors={errors}
          clearError={clearError}
        />
      ),
    },
    {
      id: "nearBy",
      label: "Near By",
      component: (
        <NearByLocations
          updateFormData={(data) => updateFormData("nearBy", data)}
          formData={formData.nearBy || {}}
          errors={errors}
          clearError={clearError}
        />
      ),
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <div className="relative flex flex-wrap justify-between mb-8">
        {/* Progress Line */}
        <div className="absolute top-5 left-[3%] right-[3%] h-[2px] bg-muted hidden sm:block" />
        <div
          className="absolute top-5 left-[3%] h-[2px] bg-primary transition-all duration-500 ease-in-out hidden sm:block"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 94}%`,
          }}
        />

        {/* Steps */}
        {steps.map((step, index) => {
          const isCompleted = index + 1 < currentStep;
          const isCurrent = index + 1 === currentStep;

          return (
            <div
              key={step.id}
              className="relative flex flex-col items-center w-full sm:w-auto sm:flex-1 mb-4 sm:mb-0 cursor-pointer"
              onClick={() => setCurrentStep(index + 1)}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-full border-2 flex items-center justify-center bg-background z-10 transition-all duration-500",
                  isCompleted &&
                    "border-primary bg-primary text-primary-foreground",
                  isCurrent && "border-primary",
                  !isCompleted && !isCurrent && "border-muted"
                )}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span
                    className={cn(
                      "text-sm font-medium",
                      isCurrent && "text-primary",
                      !isCurrent && "text-muted-foreground"
                    )}
                  >
                    {index + 1}
                  </span>
                )}
              </div>
              <div className="mt-3">
                <div
                  className={cn(
                    "text-sm font-medium text-center",
                    isCompleted || isCurrent
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {step.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="mt-8">{steps[currentStep - 1].component}</div>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        <Button
          onClick={handlePrevious}
          disabled={currentStep === 1 || isSubmitting}
          variant="outline"
        >
          Previous
        </Button>
        <Button onClick={handleNext} disabled={isSubmitting}>
          {currentStep === steps.length
            ? isSubmitting
              ? "Submitting..."
              : "Complete"
            : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default Stepper;
