import Stepper from "@/components/dashboard/Stepper";

export default function StepperPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Property Listing Form</h1>
      <Stepper initialStep={1} />
    </div>
  );
}
