import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PackageControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  onAdd: () => void;
  onDelete: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  showDelete: boolean;
}

const PackageControls = ({
  onPrevious,
  onNext,
  onAdd,
  onDelete,
  canGoPrevious,
  canGoNext,
  showDelete
}: PackageControlsProps) => {
  return (
    <div className="flex flex-col gap-4 self-center">
      <Button
        variant="ghost"
        size="icon"
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className="text-white hover:bg-white/20 h-12 w-12"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onNext}
        disabled={!canGoNext}
        className="text-white hover:bg-white/20 h-12 w-12"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onAdd}
        className="text-white hover:bg-white/20 h-12 w-12"
      >
        <Plus className="h-6 w-6" />
      </Button>
      {showDelete && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          className="text-white hover:bg-white/20 h-12 w-12"
        >
          <Trash2 className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default PackageControls;