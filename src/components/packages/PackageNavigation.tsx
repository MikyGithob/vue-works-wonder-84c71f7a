import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PackageNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  disabled?: boolean;
}

const PackageNavigation = ({ onPrevious, onNext, disabled }: PackageNavigationProps) => {
  return (
    <div className="flex items-center gap-4">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={disabled}
        size="icon"
        className="h-8 w-8"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        onClick={onNext}
        disabled={disabled}
        size="icon"
        className="h-8 w-8"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default PackageNavigation;