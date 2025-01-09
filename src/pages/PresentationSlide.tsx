import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const PresentationSlide = () => {
  const navigate = useNavigate();
  // This would be replaced with your actual PowerPoint URL
  const slideUrl = "YOUR_POWERPOINT_URL";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-400 p-8">
      <Card className="max-w-4xl mx-auto aspect-video bg-white/95 shadow-lg">
        <div className="h-full flex flex-col items-center justify-center p-8">
          <h1 className="text-2xl text-green-500 mb-4">Powerpoint Slide</h1>
          {/* Replace this with your actual PowerPoint embed */}
          <iframe 
            src={slideUrl}
            className="w-full h-full"
            title="Presentation Slide"
          />
        </div>
      </Card>
      <div className="flex justify-end max-w-4xl mx-auto mt-4">
        <Button 
          onClick={() => navigate("/question")}
          className="bg-white text-blue-600 hover:bg-blue-50"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PresentationSlide;