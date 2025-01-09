import { ScrollArea } from "@/components/ui/scroll-area";
import PackageItem from "./PackageItem";
import { Package } from "@/types/package";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PackageSectionProps {
  title: string;
  packages: Package[];
  showSelect?: boolean;
  onRemoveItem?: (pkg: Package) => void;
}

const PackageSection = ({ title, packages, showSelect, onRemoveItem }: PackageSectionProps) => {
  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
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
      <ScrollArea className="h-[calc(100vh-300px)] pr-4">
        <div className="space-y-4">
          {packages.map((pkg) => (
            <PackageItem
              key={pkg.id}
              pkg={pkg}
              onRemove={onRemoveItem}
              isDraggable={!onRemoveItem}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default PackageSection;