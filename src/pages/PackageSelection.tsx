import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import PackageSection from "@/components/packages/PackageSection";
import PackageNavigation from "@/components/packages/PackageNavigation";
import { Package } from "@/types/package";

const initialPackages = {
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
  const [packages, setPackages] = useState(initialPackages);
  const [paymentType, setPaymentType] = useState("full");
  const [monthlyTerm, setMonthlyTerm] = useState("48");
  const [downPayment, setDownPayment] = useState("500.00");

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetSection: 'platinum' | 'gold') => {
    e.preventDefault();
    const item: Package = JSON.parse(e.dataTransfer.getData("application/json"));
    
    setPackages(prev => {
      const newPackages = { ...prev };
      newPackages.addons = prev.addons.filter(pkg => pkg.id !== item.id);
      newPackages[targetSection] = [...prev[targetSection], item];
      return newPackages;
    });

    toast({
      title: "Package Added",
      description: `Added ${item.title} to ${targetSection} package`,
    });
  };

  const handleRemoveItem = (item: Package, section: 'platinum' | 'gold') => {
    setPackages(prev => {
      const newPackages = { ...prev };
      newPackages[section] = prev[section].filter(pkg => pkg.id !== item.id);
      newPackages.addons = [...prev.addons, item];
      return newPackages;
    });

    toast({
      title: "Package Removed",
      description: `${item.title} has been moved back to add-ons`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-400 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'platinum')}
          >
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-white">Platinum Package</h1>
              <PackageNavigation
                onPrevious={() => {}}
                onNext={() => {}}
                disabled={true}
              />
            </div>
            <PackageSection
              title="Platinum"
              packages={packages.platinum}
              showSelect={true}
              onRemoveItem={(pkg) => handleRemoveItem(pkg, 'platinum')}
            />
          </div>

          <div
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'gold')}
          >
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-white">Gold Package</h1>
              <PackageNavigation
                onPrevious={() => {}}
                onNext={() => {}}
                disabled={true}
              />
            </div>
            <PackageSection
              title="Gold"
              packages={packages.gold}
              showSelect={true}
              onRemoveItem={(pkg) => handleRemoveItem(pkg, 'gold')}
            />
          </div>
        </div>

        <div className="mb-8">
          <PackageSection
            title="Add-ons"
            packages={packages.addons}
          />
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