import { ScrollArea } from "@/components/ui/scroll-area";
import PackageItem from "./PackageItem";
import { Package } from "@/types/package";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PaymentSummary from "./PaymentSummary";
import PackageDropZone from "./PackageDropZone";
import { Card, CardContent } from "@/components/ui/card";
import { MoveHorizontal } from "lucide-react";

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
  onDrop 
}: PackageSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        {showSelect && (
          <Select defaultValue="option1">
            <SelectTrigger className="w-[180px] bg-background">
              <SelectValue placeholder={`${title} Option 1`} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">{title} Option 1</SelectItem>
              <SelectItem value="option2">{title} Option 2</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>
      
      <PackageDropZone onDrop={onDrop} isEmpty={packages.length === 0}>
        <ScrollArea className="h-[calc(100vh-500px)] pr-4">
          {packages.length === 0 ? (
            <Card className="h-[400px] flex items-center justify-center bg-transparent border-none">
              <CardContent className="text-center text-muted-foreground flex flex-col items-center gap-4">
                <MoveHorizontal className="h-12 w-12 text-muted-foreground/50" />
                <div>
                  <p className="text-lg font-medium mb-2">This package is empty</p>
                  <p className="text-sm">Drag items from other packages or add-ons</p>
                  <p className="text-sm text-muted-foreground/70">to start building your package</p>
                </div>
              </CardContent>
            </Card>
          ) : (
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
          )}
        </ScrollArea>
      </PackageDropZone>
      
      {title !== "Add-ons" && <PaymentSummary packages={packages} title={title} />}
    </div>
  );
};

export default PackageSection;