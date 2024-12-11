import React, { useState, useEffect } from "react";
import Stepper from "@/components/dashboard/Stepper";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

const StepperSkeleton = () => {
  const steps = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="w-full mx-auto p-4">
      <div className="relative flex flex-wrap justify-between mb-8">
        {/* Progress Line */}
        <div className="absolute top-5 left-[3%] right-[3%] h-[2px] bg-muted hidden sm:block" />
        <div className="absolute top-5 left-[3%] h-[2px] bg-primary w-1/3 hidden sm:block" />

        {/* Steps */}
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center w-full sm:w-auto sm:flex-1 mb-4 sm:mb-0"
          >
            <div
              className={cn(
                "w-10 h-10 rounded-full border-2 flex items-center justify-center bg-background z-10",
                index === 0 ? "border-primary" : "border-muted"
              )}
            >
              <div
                className={cn(
                  "w-5 h-5 rounded-full",
                  index === 0 ? "bg-primary" : "bg-muted",
                  "animate-pulse"
                )}
              />
            </div>
            <div className="mt-3">
              <div
                className={cn(
                  "w-16 h-4 rounded",
                  index === 0 ? "bg-primary" : "bg-muted",
                  "animate-pulse"
                )}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Content Skeleton */}
      <div className="mt-8 space-y-4">
        <div className="h-8 bg-muted rounded w-1/4 animate-pulse" />
        <div className="h-12 bg-muted rounded w-full animate-pulse" />
        <div className="h-12 bg-muted rounded w-full animate-pulse" />
        <div className="h-12 bg-muted rounded w-3/4 animate-pulse" />
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        <div className="w-24 h-10 bg-muted rounded animate-pulse" />
        <div className="w-24 h-10 bg-primary rounded animate-pulse" />
      </div>
    </div>
  );
};

function CreateListings() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="w-full mx-auto p-4">
      {isLoading ? <StepperSkeleton /> : <Stepper initialStep={1} />}
    </Card>
  );
}

export default CreateListings;
