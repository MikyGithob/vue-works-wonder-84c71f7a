import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const PresentationSlide = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const slideUrl = "https://www.dickinson.edu/download/downloads/id/1076/sample_powerpoint_slides.pptx";

  const handleNext = () => {
    navigate("/question");
    toast({
      title: "Moving to Questions",
      description: "Let's proceed to the questions section",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-400 p-8">
      <Card className="max-w-4xl mx-auto aspect-video bg-white/95 shadow-lg">
        <div className="h-full flex flex-col items-center justify-center p-8">
          <h1 className="text-2xl text-green-500 mb-4">Sample PowerPoint Presentation</h1>
          <div className="w-full h-full relative">
            <iframe 
              src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(slideUrl)}`}
              className="w-full h-full border-none"
              title="Presentation Slide"
              allow="fullscreen"
            />
          </div>
        </div>
      </Card>
      <div className="flex justify-end max-w-4xl mx-auto mt-4">
        <Button 
          onClick={handleNext}
          className="bg-white text-blue-600 hover:bg-blue-50"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PresentationSlide;