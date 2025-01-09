import { useState } from "react";
import { Package } from "@/types/package";
import { useToast } from "@/hooks/use-toast";

export const useDragAndDrop = () => {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleDragStart = (e: React.DragEvent, item: Package) => {
    setIsDragging(true);
    e.dataTransfer.setData("application/json", JSON.stringify(item));
    
    // Create a custom drag image that matches the card width
    const dragImage = document.createElement("div");
    dragImage.className = "bg-white rounded-lg shadow-lg p-4 max-w-[350px]";
    dragImage.innerHTML = `
      <div class="font-medium">${item.title}</div>
      <div class="text-sm text-gray-500">$${item.price.toFixed(2)}</div>
    `;
    
    // Add the drag image to the DOM temporarily
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-1000px';
    dragImage.style.opacity = '0.9';
    document.body.appendChild(dragImage);
    
    // Set the drag image
    e.dataTransfer.setDragImage(dragImage, 20, 20);
    
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