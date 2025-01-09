import { ScrollArea } from "@/components/ui/scroll-area";
import PackageItem from "./PackageItem";
import { Package } from "@/types/package";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PaymentSummary from "./PaymentSummary";
import { useState } from "react";

interface PackageSectionProps {
  title: string;
  packages: Package[];
  showSelect?: boolean;
  onRemoveItem?: (pkg: Package) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
}

const PackageSection = ({ 
  title, 
  packages, 
  showSelect, 
  onRemoveItem,
  onDragOver,
  onDrop 
}: PackageSectionProps) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
    onDragOver?.(e);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    setIsDraggingOver(false);
    onDrop?.(e);
  };

  return (
    <div 
      className={`h-full rounded-lg p-4 transition-all duration-200 ${
        isDraggingOver 
          ? 'bg-sidebar-accent border-2 border-dashed border-primary' 
          : 'bg-white/5'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between mb-4">
        {showSelect && (
          <Select defaultValue="option1">
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder={`${title} Option 1`} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">{title} Option 1</SelectItem>
              <SelectItem value="option2">{title} Option 2</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>
      <ScrollArea className="h-[calc(100vh-500px)] pr-4">
        <div className="space-y-4">
          {packages.map((pkg) => (
            <PackageItem
              key={pkg.id}
              pkg={pkg}
              onRemove={onRemoveItem}
              isDraggable={true}
            />
          ))}
        </div>
      </ScrollArea>
      {title !== "Add-ons" && <PaymentSummary packages={packages} title={title} />}
    </div>
  );
};

export default PackageSection;