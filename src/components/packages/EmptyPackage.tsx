import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Package } from "@/types/package";
import PaymentSummary from "./PaymentSummary";

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
    <div className="space-y-4">
      <Input
        value={packageName}
        onChange={handleNameChange}
        className="font-bold text-lg"
        placeholder="Package Name"
      />
      <Card className="h-[400px] flex items-center justify-center">
        <CardContent className="text-center text-gray-500">
          <p>Drag and drop items here</p>
          <p className="text-sm">or select from add-ons</p>
        </CardContent>
      </Card>
      <PaymentSummary packages={[]} title="Custom" />
    </div>
  );
};

export default EmptyPackage;