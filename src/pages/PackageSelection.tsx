import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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

          <div>
            <h1 className="text-3xl font-bold text-white mb-4">Add-ons</h1>
            <PackageSection
              title="Add-ons"
              packages={packages.addons}
            />
          </div>
        </div>

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
