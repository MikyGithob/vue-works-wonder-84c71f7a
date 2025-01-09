import { cn } from "@/lib/utils";
import { Package } from "@/types/package";
import { MoveHorizontal } from "lucide-react";
import { useState } from "react";

interface PackageDropZoneProps {
  onDrop: (e: React.DragEvent) => void;
  children: React.ReactNode;
  isEmpty?: boolean;
}

const PackageDropZone = ({ onDrop, children, isEmpty }: PackageDropZoneProps) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    setIsDraggingOver(false);
    onDrop(e);
  };

  return (
    <div
      className={cn(
        "min-h-[400px] rounded-lg transition-all duration-300 ease-in-out",
        isDraggingOver && "ring-2 ring-primary/50 bg-accent/50",
        isEmpty && "bg-accent/5"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};

export default PackageDropZone;