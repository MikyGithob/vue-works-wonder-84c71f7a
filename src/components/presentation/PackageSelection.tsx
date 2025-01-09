import { useState } from "react";
import { Package } from "@/types/package";
import PackageSection from "../packages/PackageSection";
import PackageControls from "../packages/PackageControls";
import EmptyPackage from "../packages/EmptyPackage";
import PackageName from "../packages/PackageName";
import { useToast } from "@/hooks/use-toast";

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

const PackageSelection = () => {
  const { toast } = useToast();
  const [packages, setPackages] = useState(initialPackages);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [customPackages, setCustomPackages] = useState<string[]>([]);

  const packageTypes = ['platinum', 'gold', 'silver', ...customPackages];
  const visiblePackages = [
    packageTypes[currentIndex],
    packageTypes[currentIndex + 1]
  ].filter(Boolean);

  const handleUpdateItem = (oldItem: Package, newItem: Package, section: string) => {
    setPackages(prev => ({
      ...prev,
      [section]: prev[section].map(pkg => 
        pkg.id === oldItem.id ? newItem : pkg
      )
    }));
  };

  const handleAddAddonItem = () => {
    const newItem: Package = {
      id: Date.now(),
      title: "New Add-on",
      points: ["New feature", "Customizable"],
      price: 99.99,
      description: "Description of the new add-on"
    };

    setPackages(prev => ({
      ...prev,
      addons: [...prev.addons, newItem]
    }));

    toast({
      title: "Add-on Created",
      description: "A new add-on item has been created",
    });
  };

  const handleDrop = (e: React.DragEvent, targetSection: string) => {
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

  const handleRemoveItem = (item: Package, section: string) => {
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
    const newPackageName = `custom${customPackages.length + 1}`;
    setCustomPackages(prev => [...prev, newPackageName]);
    setPackages(prev => ({
      ...prev,
      [newPackageName]: []
    }));
    
    const newPackageIndex = Math.max(0, packageTypes.length - 1);
    setCurrentIndex(Math.max(0, newPackageIndex - 1));

    toast({
      title: "Package Added",
      description: "A new package has been created",
    });
  };

  const handleDeletePackage = () => {
    const currentPackage = visiblePackages[0];
    if (!currentPackage || ['platinum', 'gold', 'silver'].includes(currentPackage)) {
      return;
    }

    setCustomPackages(prev => prev.filter(name => name !== currentPackage));
    setPackages(prev => {
      const newPackages = { ...prev };
      delete newPackages[currentPackage];
      return newPackages;
    });

    toast({
      title: "Package Deleted",
      description: "The package has been removed",
    });
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
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr] gap-8 items-start">
          {visiblePackages.map((packageType) => (
            <div
              key={packageType}
              className="min-h-[600px]"
            >
              {packages[packageType] ? (
                <>
                  <PackageName 
                    initialName={packageType} 
                    onNameChange={(newName) => handlePackageNameChange(packageType, newName)} 
                  />
                  <PackageSection
                    title={packageType}
                    packages={packages[packageType]}
                    showSelect={true}
                    onRemoveItem={(pkg) => handleRemoveItem(pkg, packageType)}
                    onDrop={(e) => handleDrop(e, packageType)}
                    onUpdateItem={(oldItem, newItem) => handleUpdateItem(oldItem, newItem, packageType)}
                  />
                </>
              ) : (
                <EmptyPackage 
                  onNameChange={(newName) => handlePackageNameChange(packageType, newName)} 
                />
              )}
            </div>
          ))}

          <PackageControls
            onPrevious={handlePrevious}
            onNext={handleNext}
            onAdd={handleAddPackage}
            onDelete={handleDeletePackage}
            canGoPrevious={currentIndex > 0}
            canGoNext={currentIndex < packageTypes.length - 2}
            showDelete={visiblePackages[0] && !['platinum', 'gold', 'silver'].includes(visiblePackages[0])}
          />

          <div>
            <h1 className="text-3xl font-bold text-white mb-4">Add-ons</h1>
            <PackageSection
              title="Add-ons"
              packages={packages.addons}
              onDrop={(e) => handleDrop(e, 'addons')}
              onUpdateItem={(oldItem, newItem) => handleUpdateItem(oldItem, newItem, 'addons')}
              onAddItem={handleAddAddonItem}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageSelection;
