import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Package {
  id: number;
  title: string;
  points: string[];
  price: number;
  description: string;
}

const packages = {
  platinum: [
    {
      id: 1,
      title: "Item Title",
      points: ["Bullet Point", "Bullet Point", "Bullet Point", "Bullet Point"],
      price: 4299.23,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultricies consectetur magna."
    },
    {
      id: 2,
      title: "Item Title",
      points: ["Bullet Point", "Bullet Point", "Bullet Point", "Bullet Point"],
      price: 4299.23,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultricies consectetur magna."
    },
    {
      id: 3,
      title: "Item Title",
      points: ["Bullet Point", "Bullet Point", "Bullet Point", "Bullet Point"],
      price: 4299.23,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultricies consectetur magna."
    }
  ],
  gold: [
    {
      id: 4,
      title: "Item Title",
      points: ["Bullet Point", "Bullet Point", "Bullet Point", "Bullet Point"],
      price: 4209.23,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultricies consectetur magna."
    },
    {
      id: 5,
      title: "Item Title",
      points: ["Bullet Point", "Bullet Point", "Bullet Point", "Bullet Point"],
      price: 4209.23,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultricies consectetur magna."
    }
  ],
  addons: [
    {
      id: 6,
      title: "Item Title",
      points: ["Bullet Point", "Bullet Point", "Bullet Point", "Bullet Point"],
      price: 4269.23,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultricies consectetur magna."
    },
    {
      id: 7,
      title: "Item Title",
      points: ["Bullet Point", "Bullet Point", "Bullet Point", "Bullet Point"],
      price: 4269.23,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultricies consectetur magna."
    }
  ]
};

const PackageSelection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [paymentType, setPaymentType] = useState("full");
  const [monthlyTerm, setMonthlyTerm] = useState("48");
  const [downPayment, setDownPayment] = useState("500.00");

  const handleDragStart = (e: React.DragEvent, item: Package) => {
    e.dataTransfer.setData("application/json", JSON.stringify(item));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetSection: string) => {
    e.preventDefault();
    const item = JSON.parse(e.dataTransfer.getData("application/json"));
    toast({
      title: "Confirm Action",
      description: `Do you want to add this item to the ${targetSection} package?`,
      action: (
        <Button variant="default" onClick={() => console.log("Confirmed")}>
          Confirm
        </Button>
      ),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-400 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Platinum Section */}
          <div
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "platinum")}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">Platinum</h2>
              <Select defaultValue="option1">
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue placeholder="Platinum Option 1" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Platinum Option 1</SelectItem>
                  <SelectItem value="option2">Platinum Option 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Carousel className="relative">
              <CarouselContent>
                {packages.platinum.map((pkg) => (
                  <CarouselItem key={pkg.id}>
                    <Card
                      draggable
                      onDragStart={(e) => handleDragStart(e, pkg)}
                      className="relative"
                    >
                      <button className="absolute right-2 top-2 p-1 hover:bg-gray-100 rounded-full">
                        <X className="h-4 w-4" />
                      </button>
                      <CardContent className="p-6">
                        <h3 className="font-bold mb-2">{pkg.title}</h3>
                        <ul className="list-disc pl-5 mb-4">
                          {pkg.points.map((point, index) => (
                            <li key={index}>{point}</li>
                          ))}
                        </ul>
                        <p className="text-sm text-gray-600 mb-4">{pkg.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="font-bold">${pkg.price.toFixed(2)}</span>
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
          </div>

          {/* Gold Section */}
          <div
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "gold")}
          >
            <h2 className="text-2xl font-bold text-white mb-4">Gold</h2>
            <Carousel>
              <CarouselContent>
                {packages.gold.map((pkg) => (
                  <CarouselItem key={pkg.id}>
                    <Card
                      draggable
                      onDragStart={(e) => handleDragStart(e, pkg)}
                      className="relative"
                    >
                      <button className="absolute right-2 top-2 p-1 hover:bg-gray-100 rounded-full">
                        <X className="h-4 w-4" />
                      </button>
                      <CardContent className="p-6">
                        <h3 className="font-bold mb-2">{pkg.title}</h3>
                        <ul className="list-disc pl-5 mb-4">
                          {pkg.points.map((point, index) => (
                            <li key={index}>{point}</li>
                          ))}
                        </ul>
                        <p className="text-sm text-gray-600 mb-4">{pkg.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="font-bold">${pkg.price.toFixed(2)}</span>
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
          </div>

          {/* Add-ons Section */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Add-ons</h2>
            <div className="space-y-4">
              {packages.addons.map((pkg) => (
                <Card
                  key={pkg.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, pkg)}
                  className="relative"
                >
                  <button className="absolute right-2 top-2 p-1 hover:bg-gray-100 rounded-full">
                    <X className="h-4 w-4" />
                  </button>
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-2">{pkg.title}</h3>
                    <ul className="list-disc pl-5 mb-4">
                      {pkg.points.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                    <p className="text-sm text-gray-600 mb-4">{pkg.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">${pkg.price.toFixed(2)}</span>
                      <Button variant="outline">Add</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Options */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-4 w-full md:w-auto">
                <Select value={paymentType} onValueChange={setPaymentType}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Payment Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full">Full Payment</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
                
                {paymentType === "finance" && (
                  <div className="space-y-4">
                    <Select value={monthlyTerm} onValueChange={setMonthlyTerm}>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select Term" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="48">48 Months @ 4.99%</SelectItem>
                        <SelectItem value="36">36 Months @ 4.49%</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Down Payment:</span>
                      <Input
                        type="text"
                        value={downPayment}
                        onChange={(e) => setDownPayment(e.target.value)}
                        className="w-[120px]"
                      />
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>Monthly: $469.31</p>
                      <p className="text-xs">On Approved Credit</p>
                      <p className="text-xs">Terms & Conditions Apply</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Subtotal: $14,599.23</p>
                <p className="text-sm text-gray-600">Discount: -$800.00</p>
                <p className="font-bold">Total Cost: $13,799.23</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between mt-8">
          <Button 
            variant="outline"
            onClick={() => navigate("/question")}
          >
            Back
          </Button>
          <Button>
            Complete Purchase
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PackageSelection;