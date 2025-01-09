import { useState } from "react";
import { Package } from "@/types/package";
import PackageSection from "../packages/PackageSection";

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
  const [packages, setPackages] = useState(initialPackages);

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
      newPackages[targetSection] = [...prev[targetSection], item];
      return newPackages;
    });
  };

  const handleRemoveItem = (item: Package, section: string) => {
    setPackages(prev => {
      const newPackages = { ...prev };
      newPackages[section] = prev[section].filter(pkg => pkg.id !== item.id);
      newPackages.addons = [...prev.addons, item];
      return newPackages;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-400 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <PackageSection
            title="Platinum"
            packages={packages.platinum}
            showSelect={true}
            onRemoveItem={(pkg) => handleRemoveItem(pkg, 'platinum')}
            onDrop={(e) => handleDrop(e, 'platinum')}
          />
          <PackageSection
            title="Gold"
            packages={packages.gold}
            showSelect={true}
            onRemoveItem={(pkg) => handleRemoveItem(pkg, 'gold')}
            onDrop={(e) => handleDrop(e, 'gold')}
          />
          <PackageSection
            title="Add-ons"
            packages={packages.addons}
            onDrop={(e) => handleDrop(e, 'addons')}
          />
        </div>
      </div>
    </div>
  );
};

export default PackageSelection;