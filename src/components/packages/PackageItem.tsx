import { X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package } from "@/types/package";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import { cn } from "@/lib/utils";

interface PackageItemProps {
  pkg: Package;
  onRemove?: (pkg: Package) => void;
  isDraggable?: boolean;
}

const PackageItem = ({ pkg, onRemove, isDraggable = true }: PackageItemProps) => {
  const { isDragging, handleDragStart, handleDragEnd } = useDragAndDrop();

  return (
    <Card
      draggable={isDraggable}
      onDragStart={(e) => handleDragStart(e, pkg)}
      onDragEnd={handleDragEnd}
      className={cn(
        "relative mb-4 last:mb-0 transition-all duration-200",
        isDraggable && "cursor-grab active:cursor-grabbing hover:shadow-md",
        isDragging && "opacity-50 ring-2 ring-primary/50"
      )}
    >
      {onRemove && (
        <button 
          onClick={() => onRemove(pkg)}
          className="absolute right-2 top-2 p-1 hover:bg-accent rounded-full transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}
      <CardContent className="p-6">
        <h3 className="font-bold mb-2 text-lg">{pkg.title}</h3>
        <ul className="list-disc pl-5 mb-4 space-y-1">
          {pkg.points.map((point, index) => (
            <li key={index} className="text-sm text-muted-foreground">{point}</li>
          ))}
        </ul>
        <p className="text-sm text-muted-foreground mb-4">{pkg.description}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">${pkg.price.toFixed(2)}</span>
          <Button variant={onRemove ? "secondary" : "default"}>
            {onRemove ? 'Selected' : 'Select'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PackageItem;