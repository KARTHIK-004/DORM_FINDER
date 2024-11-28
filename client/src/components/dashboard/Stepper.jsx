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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleNext = async () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle form submission
      setIsSubmitting(true);
      try {
        const response = await createListing(formData);
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

  const updateFormData = (stepData) => {
    setFormData((prevData) => ({ ...prevData, ...stepData }));
  };

  const steps = [
    {
      id: 1,
      label: "Hostel Information",
      component: (
        <HostelInformationForm
          updateFormData={updateFormData}
          formData={formData}
        />
      ),
    },
    {
      id: 2,
      label: "Hostel Details",
      component: (
        <HostelDetailsForm
          updateFormData={updateFormData}
          formData={formData}
        />
      ),
    },
    {
      id: 3,
      label: "Amenities",
      component: (
        <HostelAmenities updateFormData={updateFormData} formData={formData} />
      ),
    },
    {
      id: 4,
      label: "Hostel Gallery",
      component: (
        <HostelGallery updateFormData={updateFormData} formData={formData} />
      ),
    },
    {
      id: 5,
      label: "Description",
      component: (
        <HostelDescription
          updateFormData={updateFormData}
          formData={formData}
        />
      ),
    },
    {
      id: 6,
      label: "Location",
      component: (
        <HostelLocation updateFormData={updateFormData} formData={formData} />
      ),
    },
    {
      id: 7,
      label: "Near By",
      component: (
        <NearByLocations updateFormData={updateFormData} formData={formData} />
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
        {steps.map((step) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;

          return (
            <div
              key={step.id}
              className="relative flex flex-col items-center w-full sm:w-auto sm:flex-1 mb-4 sm:mb-0 cursor-pointer"
              onClick={() => setCurrentStep(step.id)}
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
                    {step.id}
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
