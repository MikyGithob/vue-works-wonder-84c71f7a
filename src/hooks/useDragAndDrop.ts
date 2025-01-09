import { useState } from "react";
import { Package } from "@/types/package";
import { useToast } from "@/hooks/use-toast";

export const useDragAndDrop = () => {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleDragStart = (e: React.DragEvent, item: Package) => {
    setIsDragging(true);
    e.dataTransfer.setData("application/json", JSON.stringify(item));
    
    // Create a custom drag image
    const dragImage = document.createElement("div");
    dragImage.className = "bg-white rounded-lg shadow-lg p-4 border-2 border-primary/20";
    dragImage.innerHTML = `
      <div class="font-medium text-sm">${item.title}</div>
      <div class="text-xs text-muted-foreground">$${item.price.toFixed(2)}</div>
    `;
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, 0, 0);
    
    // Clean up the drag image after dragging
    requestAnimationFrame(() => {
      document.body.removeChild(dragImage);
    });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return {
    isDragging,
    handleDragStart,
    handleDragEnd
  };
};