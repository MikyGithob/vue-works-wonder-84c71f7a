import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
  const [answer, setAnswer] = useState<string | null>(null);

  const handleAnswer = (value: string) => {
    setAnswer(value);
  };

  return (
    <div className="p-8">
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

          <div className="grid grid-cols-2 gap-6">
            {menuItems.map((item) => (
              <Card key={item.id}>
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
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default QuestionPage;