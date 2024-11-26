import React, { useState } from "react";
import { Check } from "lucide-react";
import PropertyInformationForm from "./PropertyInformationForm";
import PropertyDetailsForm from "./PropertyDetailsForm";
import Amenities from "./Amenities";
import PropertyGallery from "./PropertyGallery";
import FloorPlan from "./FloorPlan";
import PropertyLocation from "./PropertyLocation";
import Description from "./Description";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const Stepper = ({ initialStep = 1 }) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [formData, setFormData] = useState({});
  const { toast } = useToast();

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle form submission here
      console.log("Form submitted:", formData);
      toast({
        title: "Property Listing Completed",
        description: "Your property has been successfully listed.",
      });
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
      label: "Property Information",
      component: (
        <PropertyInformationForm
          updateFormData={updateFormData}
          formData={formData}
        />
      ),
    },
    {
      id: 2,
      label: "Property Details",
      component: (
        <PropertyDetailsForm
          updateFormData={updateFormData}
          formData={formData}
        />
      ),
    },
    {
      id: 3,
      label: "Amenities",
      component: (
        <Amenities updateFormData={updateFormData} formData={formData} />
      ),
    },
    {
      id: 4,
      label: "Property Gallery",
      component: (
        <PropertyGallery updateFormData={updateFormData} formData={formData} />
      ),
    },
    {
      id: 5,
      label: "Floor Plan",
      component: (
        <FloorPlan updateFormData={updateFormData} formData={formData} />
      ),
    },
    {
      id: 6,
      label: "Description",
      component: (
        <Description updateFormData={updateFormData} formData={formData} />
      ),
    },
    {
      id: 7,
      label: "Location",
      component: (
        <PropertyLocation updateFormData={updateFormData} formData={formData} />
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
          disabled={currentStep === 1}
          variant="outline"
        >
          Previous
        </Button>
        <Button onClick={handleNext}>
          {currentStep === steps.length ? "Complete" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default Stepper;
