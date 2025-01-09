import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface MenuItem {
  id: number;
  title: string;
  points: string[];
  price: number;
  description: string;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    title: "Menu Item 1",
    points: ["Bullet Point", "Bullet Point", "Bullet Point", "Bullet Point"],
    price: 458.21,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultricies consectetur magna."
  },
  {
    id: 2,
    title: "Menu Item 2",
    points: ["Bullet Point", "Bullet Point", "Bullet Point", "Bullet Point"],
    price: 534.50,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultricies consectetur magna."
  }
];

const QuestionPage = () => {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState<string | null>(null);

  const handleAnswer = (value: string) => {
    setAnswer(value);
  };

  const handleNext = () => {
    navigate("/packages");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-400 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="p-8">
          <h2 className="text-2xl text-center mb-8">Does Anyone Suffer from Allergies?</h2>
          
          <div className="flex justify-center gap-4 mb-8">
            <Button
              variant={answer === "yes" ? "default" : "outline"}
              onClick={() => handleAnswer("yes")}
            >
              Yes
            </Button>
            <Button
              variant={answer === "no" ? "default" : "outline"}
              onClick={() => handleAnswer("no")}
            >
              No
            </Button>
          </div>

          <Carousel className="w-full max-w-2xl mx-auto">
            <CarouselContent>
              {menuItems.map((item) => (
                <CarouselItem key={item.id}>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-2">{item.title}</h3>
                      <ul className="list-disc pl-5 mb-4">
                        {item.points.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>
                      <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold">${item.price.toFixed(2)}</span>
                        <Button variant="outline">Select</Button>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </Card>

        <div className="flex justify-between">
          <Button 
            variant="outline"
            onClick={() => navigate("/")}
          >
            Back
          </Button>
          <Button 
            onClick={handleNext}
            disabled={!answer}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;