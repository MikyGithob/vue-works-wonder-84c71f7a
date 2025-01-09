import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import PackageSection from "@/components/packages/PackageSection";
import { Package } from "@/types/package";
import { Plus, ArrowLeft, ArrowRight } from "lucide-react";
import EmptyPackage from "@/components/packages/EmptyPackage";

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

type PackageType = 'platinum' | 'gold' | 'silver' | string;

const PackageSelection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [packages, setPackages] = useState(initialPackages);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [customPackages, setCustomPackages] = useState<string[]>([]);

  const packageTypes: PackageType[] = ['platinum', 'gold', 'silver', ...customPackages];
  const visiblePackages = [
    packageTypes[currentIndex],
    packageTypes[currentIndex + 1]
  ].filter(Boolean);

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
      newPackages[sourceSection] = prev[sourceSection].filter(pkg => pkg.id !== item.id);
      newPackages[targetSection] = [...(prev[targetSection] || []), item];
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

  const handleAddPackage = () => {
    const newPackageName = `custom-${customPackages.length + 1}`;
    setCustomPackages(prev => [...prev, newPackageName]);
    setPackages(prev => ({
      ...prev,
      [newPackageName]: []
    }));
  };

  const handlePackageNameChange = (oldName: string, newName: string) => {
    setCustomPackages(prev => 
      prev.map(name => name === oldName ? newName : name)
    );
    setPackages(prev => {
      const newPackages = { ...prev };
      newPackages[newName] = prev[oldName];
      delete newPackages[oldName];
      return newPackages;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-400 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-white">Package Selection</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_1fr_auto_1fr] gap-8 items-start">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>

          {visiblePackages.map((packageType) => (
            <div
              key={packageType}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, packageType)}
              className="min-h-[600px]"
            >
              {packages[packageType] ? (
                <>
                  <h1 className="text-3xl font-bold text-white mb-4 capitalize">
                    {packageType} Package
                  </h1>
                  <PackageSection
                    title={packageType}
                    packages={packages[packageType]}
                    showSelect={true}
                    onRemoveItem={(pkg) => handleRemoveItem(pkg, packageType)}
                  />
                </>
              ) : (
                <EmptyPackage 
                  onNameChange={(newName) => handlePackageNameChange(packageType, newName)} 
                />
              )}
            </div>
          ))}

          <div className="flex flex-col gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              disabled={currentIndex >= packageTypes.length - 2}
              className="text-white hover:bg-white/20"
            >
              <ArrowRight className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleAddPackage}
              className="text-white hover:bg-white/20"
            >
              <Plus className="h-6 w-6" />
            </Button>
          </div>

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
