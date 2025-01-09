import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
      price: 4599.23,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultricies consectetur magna."
    },
    // Add more platinum items as needed
  ],
  gold: [
    {
      id: 2,
      title: "Item Title",
      points: ["Bullet Point", "Bullet Point", "Bullet Point", "Bullet Point"],
      price: 4259.23,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultricies consectetur magna."
    },
    // Add more gold items as needed
  ]
};

const PackageSelection = () => {
  const navigate = useNavigate();
  const [paymentTerm, setPaymentTerm] = useState("full");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-400 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Platinum Section */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Platinum</h2>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Platinum Option 1" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Platinum Option 1</SelectItem>
                <SelectItem value="option2">Platinum Option 2</SelectItem>
              </SelectContent>
            </Select>
            <div className="space-y-4 mt-4">
              {packages.platinum.map((pkg) => (
                <Card key={pkg.id}>
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
              ))}
            </div>
          </div>

          {/* Gold Section */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Gold</h2>
            <div className="space-y-4">
              {packages.gold.map((pkg) => (
                <Card key={pkg.id}>
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
              ))}
            </div>
          </div>

          {/* Add-ons Section */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Add-ons</h2>
            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2">Item Title</h3>
                  <ul className="list-disc pl-5 mb-4">
                    <li>Bullet Point</li>
                    <li>Bullet Point</li>
                    <li>Bullet Point</li>
                  </ul>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">$299.99</span>
                    <Button variant="outline">Add</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Payment Options */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <Select value={paymentTerm} onValueChange={setPaymentTerm}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Payment Term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full">Full Payment</SelectItem>
                    <SelectItem value="48">48 Months @ 4.99%</SelectItem>
                  </SelectContent>
                </Select>
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