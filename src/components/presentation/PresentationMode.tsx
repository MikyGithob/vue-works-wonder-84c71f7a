import { useState } from "react";
import { Button } from "@/components/ui/button";
import PresentationSlide from "./PresentationSlide";
import QuestionPage from "./QuestionPage";
import PackageSelection from "./PackageSelection";

type Step = "presentation" | "question" | "packages";

const PresentationMode = () => {
  const [currentStep, setCurrentStep] = useState<Step>("presentation");

  const renderStep = () => {
    switch (currentStep) {
      case "presentation":
        return <PresentationSlide />;
      case "question":
        return <QuestionPage />;
      case "packages":
        return <PackageSelection />;
      default:
        return null;
    }
  };

  const handleNext = () => {
    switch (currentStep) {
      case "presentation":
        setCurrentStep("question");
        break;
      case "question":
        setCurrentStep("packages");
        break;
    }
  };

  const handleBack = () => {
    switch (currentStep) {
      case "question":
        setCurrentStep("presentation");
        break;
      case "packages":
        setCurrentStep("question");
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-400">
      {renderStep()}
      <div className="fixed bottom-8 right-8 flex gap-4">
        {currentStep !== "presentation" && (
          <Button 
            variant="outline"
            onClick={handleBack}
            className="bg-white hover:bg-blue-50"
          >
            Back
          </Button>
        )}
        {currentStep !== "packages" && (
          <Button 
            onClick={handleNext}
            className="bg-white text-blue-600 hover:bg-blue-50"
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default PresentationMode;