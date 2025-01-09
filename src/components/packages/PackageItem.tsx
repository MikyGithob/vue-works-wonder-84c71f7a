import { X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package } from "@/types/package";

interface PackageItemProps {
  pkg: Package;
  onRemove?: (pkg: Package) => void;
  isDraggable?: boolean;
}

const PackageItem = ({ pkg, onRemove, isDraggable = true }: PackageItemProps) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("application/json", JSON.stringify(pkg));
  };

  return (
    <Card
      draggable={isDraggable}
      onDragStart={handleDragStart}
      className="relative mb-4 last:mb-0"
    >
      {onRemove && (
        <button 
          onClick={() => onRemove(pkg)}
          className="absolute right-2 top-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}
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
          <Button variant="outline">
            {onRemove ? 'Selected' : 'Select'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PackageItem;