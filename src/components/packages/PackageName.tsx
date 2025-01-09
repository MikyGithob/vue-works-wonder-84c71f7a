import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";

interface PackageNameProps {
  initialName: string;
  onNameChange: (newName: string) => void;
}

const PackageName = ({ initialName, onNameChange }: PackageNameProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (name.trim() !== initialName) {
      onNameChange(name);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  if (isEditing) {
    return (
      <Input
        ref={inputRef}
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="text-3xl font-bold text-white mb-4 bg-white/10 border-white/20"
      />
    );
  }

  return (
    <h1 
      className="text-3xl font-bold text-white mb-4 capitalize cursor-pointer hover:opacity-80" 
      onClick={handleClick}
    >
      {name} Package
    </h1>
  );
};

export default PackageName;