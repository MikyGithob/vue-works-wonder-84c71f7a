import { ScrollArea } from "@/components/ui/scroll-area";
import PackageItem from "./PackageItem";
import { Package } from "@/types/package";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PaymentSummary from "./PaymentSummary";
import PackageDropZone from "./PackageDropZone";
import { Card, CardContent } from "@/components/ui/card";
import { MoveHorizontal, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface PackageSectionProps {
  title: string;
  packages: Package[];
  showSelect?: boolean;
  onRemoveItem?: (pkg: Package) => void;
  onDrop?: (e: React.DragEvent) => void;
  onUpdateItem?: (oldItem: Package, newItem: Package) => void;
  onAddItem?: () => void;
}

const PackageSection = ({ 
  title, 
  packages, 
  showSelect, 
  onRemoveItem,
  onDrop,
  onUpdateItem,
  onAddItem
}: PackageSectionProps) => {
  const { toast } = useToast();

  const handleUpdateItem = (oldItem: Package, newTitle: string) => {
    if (onUpdateItem) {
      onUpdateItem(oldItem, { ...oldItem, title: newTitle });
      toast({
        title: "Item Updated",
        description: "The item name has been updated successfully",
      });
    }
  };

  const isAddOns = title === "Add-ons";

  return (
    <div className={cn(
      "space-y-4 w-[400px]",
      isAddOns ? "bg-accent/10 p-6 rounded-lg" : "bg-background p-6 rounded-lg"
    )}>
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
        {isAddOns && onAddItem && (
          <Button
            variant="outline"
            size="sm"
            onClick={onAddItem}
            className="gap-2"
          >
            <Plus className="h-4 w-4" /> Add Item
          </Button>
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
                  onUpdateTitle={(newTitle) => handleUpdateItem(pkg, newTitle)}
                  isDraggable={true}
                />
              ))}
            </div>
          )}
        </ScrollArea>
      </PackageDropZone>
      
      {!isAddOns && <PaymentSummary packages={packages} title={title} />}
    </div>
  );
};

export default PackageSection;