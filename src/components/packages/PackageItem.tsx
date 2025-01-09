import { X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package } from "@/types/package";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface PackageItemProps {
  pkg: Package;
  onRemove?: (pkg: Package) => void;
  onUpdateTitle?: (newTitle: string) => void;
  isDraggable?: boolean;
}

const PackageItem = ({ pkg, onRemove, onUpdateTitle, isDraggable = true }: PackageItemProps) => {
  const { isDragging, handleDragStart, handleDragEnd } = useDragAndDrop();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(pkg.title);

  const handleTitleClick = () => {
    if (onUpdateTitle) {
      setIsEditing(true);
    }
  };

  const handleTitleSubmit = () => {
    setIsEditing(false);
    if (title !== pkg.title && onUpdateTitle) {
      onUpdateTitle(title);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleTitleSubmit();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setTitle(pkg.title);
    }
  };

  return (
    <Card
      draggable={isDraggable}
      onDragStart={(e) => handleDragStart(e, pkg)}
      onDragEnd={handleDragEnd}
      className={cn(
        "relative mb-4 last:mb-0 transition-all duration-200 w-full bg-card shadow-sm hover:shadow-md",
        isDraggable && "cursor-grab active:cursor-grabbing",
        isDragging && "opacity-50"
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
        {isEditing ? (
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleTitleSubmit}
            onKeyDown={handleKeyDown}
            className="text-lg font-bold mb-2 focus-visible:ring-0"
            autoFocus
          />
        ) : (
          <h3 
            className={cn(
              "font-bold mb-2 text-lg",
              onUpdateTitle && "cursor-pointer hover:text-primary"
            )}
            onClick={handleTitleClick}
          >
            {pkg.title}
          </h3>
        )}
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