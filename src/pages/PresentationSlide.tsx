import { Card } from "@/components/ui/card";

const PresentationSlide = () => {
  const slideUrl = "https://www.dickinson.edu/download/downloads/id/1076/sample_powerpoint_slides.pptx";

  return (
    <div className="p-8">
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
    </div>
  );
};

export default PresentationSlide;