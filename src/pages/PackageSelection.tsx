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
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
      id: 2,
      title: "Item Title",
      points: ["Bullet Point", "Bullet Point", "Bullet Point", "Bullet Point"],
      price: 4299.23,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    }
  ],
  gold: [
    {
      id: 4,
      title: "Item Title",
      points: ["Bullet Point", "Bullet Point", "Bullet Point", "Bullet Point"],
      price: 4209.23,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    }
  ],
  silver: [
    {
      id: 5,
      title: "Item Title",
      points: ["Bullet Point", "Bullet Point", "Bullet Point", "Bullet Point"],
      price: 3209.23,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    }
  ],
  addons: [
    {
      id: 6,
      title: "Item Title",
      points: ["Bullet Point", "Bullet Point", "Bullet Point", "Bullet Point"],
      price: 4269.23,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
      id: 7,
      title: "Item Title",
      points: ["Bullet Point", "Bullet Point", "Bullet Point", "Bullet Point"],
      price: 4269.23,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    }
  ]
};

type PackageType = 'platinum' | 'gold' | 'silver';

const PackageSelection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [packages, setPackages] = useState(initialPackages);
  const [currentIndex, setCurrentIndex] = useState(0);

  const packageTypes: PackageType[] = ['platinum', 'gold', 'silver'];
  const visiblePackages = packageTypes.slice(currentIndex, currentIndex + 2);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetSection: PackageType | 'addons') => {
    e.preventDefault();
    const item: Package = JSON.parse(e.dataTransfer.getData("application/json"));
    const sourceSection = Object.entries(packages).find(([_, items]) => 
      items.some(pkg => pkg.id === item.id)
    )?.[0];

    if (!sourceSection || sourceSection === targetSection) return;

    setPackages(prev => {
      const newPackages = { ...prev };
      // Remove from source section
      newPackages[sourceSection] = prev[sourceSection].filter(pkg => pkg.id !== item.id);
      // Add to target section
      newPackages[targetSection] = [...prev[targetSection], item];
      return newPackages;
    });

    toast({
      title: "Package Moved",
      description: `Moved ${item.title} to ${targetSection} package`,
    });
  };

  const handleRemoveItem = (item: Package, section: PackageType) => {
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

  const handleNext = () => {
    if (currentIndex < packageTypes.length - 2) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-400 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-white">Package Selection</h1>
          <PackageNavigation
            onPrevious={handlePrevious}
            onNext={handleNext}
            disabled={currentIndex === packageTypes.length - 2}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {visiblePackages.map((packageType) => (
            <div
              key={packageType}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, packageType)}
            >
              <h1 className="text-3xl font-bold text-white mb-4 capitalize">{packageType} Package</h1>
              <PackageSection
                title={packageType}
                packages={packages[packageType]}
                showSelect={true}
                onRemoveItem={(pkg) => handleRemoveItem(pkg, packageType)}
              />
            </div>
          ))}

          <div>
            <h1 className="text-3xl font-bold text-white mb-4">Add-ons</h1>
            <PackageSection
              title="Add-ons"
              packages={packages.addons}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'addons')}
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