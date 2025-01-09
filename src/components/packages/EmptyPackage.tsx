import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Package } from "@/types/package";
import PaymentSummary from "./PaymentSummary";
import { MoveHorizontal } from "lucide-react";

interface EmptyPackageProps {
  onNameChange: (name: string) => void;
}

const EmptyPackage = ({ onNameChange }: EmptyPackageProps) => {
  const [packageName, setPackageName] = useState("New Package");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPackageName(e.target.value);
    onNameChange(e.target.value);
  };

  return (
    <div className="space-y-4 w-[400px] bg-white/5 backdrop-blur-sm p-6 rounded-lg">
      <Input
        value={packageName}
        onChange={handleNameChange}
        className="font-bold text-lg"
        placeholder="Package Name"
      />
      <Card className="h-[400px] flex items-center justify-center bg-sidebar-accent/5">
        <CardContent className="text-center text-muted-foreground flex flex-col items-center gap-4">
          <MoveHorizontal className="h-12 w-12 text-muted-foreground/50" />
          <div>
            <p className="text-lg font-medium mb-2">This package is empty</p>
            <p className="text-sm">Drag items from other packages or add-ons</p>
            <p className="text-sm text-muted-foreground/70">to start building your package</p>
          </div>
        </CardContent>
      </Card>
      <PaymentSummary packages={[]} title="Custom" />
    </div>
  );
};

export default EmptyPackage;
