import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, ChevronRight, Plus, Trash2, MoveHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

// Types
interface Package {
  id: number;
  title: string;
  points: string[];
  price: number;
  description: string;
}

type PackageType = 'platinum' | 'gold' | 'silver' | string;

// Initial Data
const initialPackages = {
  platinum: [
    {
      id: 1,
      title: "Item Title",
      points: ["Bullet Point", "Bullet Point", "Bullet Point", "Bullet Point"],
      price: 4299.23,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
      id: 2,
      title: "Item Title",
      points: ["Bullet Point", "Bullet Point", "Bullet Point", "Bullet Point"],
      price: 4299.23,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    }
  ],
  gold: [
    {
      id: 4,
      title: "Item Title",
      points: ["Bullet Point", "Bullet Point", "Bullet Point", "Bullet Point"],
      price: 4209.23,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    }
  ],
  silver: [
    {
      id: 5,
      title: "Item Title",
      points: ["Bullet Point", "Bullet Point", "Bullet Point", "Bullet Point"],
      price: 3209.23,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    }
  ],
  addons: [
    {
      id: 6,
      title: "Item Title",
      points: ["Bullet Point", "Bullet Point", "Bullet Point", "Bullet Point"],
      price: 4269.23,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
      id: 7,
      title: "Item Title",
      points: ["Bullet Point", "Bullet Point", "Bullet Point", "Bullet Point"],
      price: 4269.23,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    }
  ]
};

// Hooks
const useDragAndDrop = () => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent, item: Package) => {
    setIsDragging(true);
    e.dataTransfer.setData("application/json", JSON.stringify(item));
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

// Components
const PackageItem = ({ pkg, onRemove, onUpdateTitle, isDraggable = true }: {
  pkg: Package;
  onRemove?: (pkg: Package) => void;
  onUpdateTitle?: (newTitle: string) => void;
  isDraggable?: boolean;
}) => {
  const { isDragging, handleDragStart, handleDragEnd } = useDragAndDrop();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(pkg.title);

  const handleTitleClick = () => {
    if (onUpdateTitle) {
      setIsEditing(true);
    }
  };

  const handleTitleSubmit = () => {
    setIsEditing(false);
    if (title !== pkg.title && onUpdateTitle) {
      onUpdateTitle(title);
    }
  };

  return (
    <Card
      draggable={isDraggable}
      onDragStart={(e) => handleDragStart(e, pkg)}
      onDragEnd={handleDragEnd}
      className={cn(
        "relative mb-4 last:mb-0 transition-all duration-200 w-full bg-card shadow-sm hover:shadow-md",
        isDraggable && "cursor-grab active:cursor-grabbing",
        isDragging && "opacity-50"
      )}
    >
      {onRemove && (
        <button 
          onClick={() => onRemove(pkg)}
          className="absolute right-2 top-2 p-1 hover:bg-accent rounded-full transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )}
      <CardContent className="p-6">
        {isEditing ? (
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleTitleSubmit}
            className="text-lg font-bold mb-2 focus-visible:ring-0"
            autoFocus
          />
        ) : (
          <h3 
            className={cn(
              "font-bold mb-2 text-lg",
              onUpdateTitle && "cursor-pointer hover:text-primary"
            )}
            onClick={handleTitleClick}
          >
            {pkg.title}
          </h3>
        )}
        <ul className="list-disc pl-5 mb-4 space-y-1">
          {pkg.points.map((point, index) => (
            <li key={index} className="text-sm text-muted-foreground">{point}</li>
          ))}
        </ul>
        <p className="text-sm text-muted-foreground mb-4">{pkg.description}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">${pkg.price.toFixed(2)}</span>
          <Button variant={onRemove ? "secondary" : "default"}>
            {onRemove ? 'Selected' : 'Select'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const PackageControls = ({
  onPrevious,
  onNext,
  onAdd,
  onDelete,
  canGoPrevious,
  canGoNext,
  showDelete
}: {
  onPrevious: () => void;
  onNext: () => void;
  onAdd: () => void;
  onDelete: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  showDelete: boolean;
}) => {
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

const PackageName = ({ initialName, onNameChange }: {
  initialName: string;
  onNameChange: (newName: string) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);

  const handleSubmit = () => {
    setIsEditing(false);
    if (name.trim() !== initialName) {
      onNameChange(name);
    }
  };

  return isEditing ? (
    <Input
      value={name}
      onChange={(e) => setName(e.target.value)}
      onBlur={handleSubmit}
      className="text-3xl font-bold text-white mb-4 bg-white/10 border-white/20"
      autoFocus
    />
  ) : (
    <h1 
      className="text-3xl font-bold text-white mb-4 capitalize cursor-pointer hover:opacity-80" 
      onClick={() => setIsEditing(true)}
    >
      {name} Package
    </h1>
  );
};

const PaymentSummary = ({ packages, title }: {
  packages: Package[];
  title: string;
}) => {
  const [paymentType, setPaymentType] = useState("full");
  const [monthlyTerm, setMonthlyTerm] = useState("48");
  const [downPayment, setDownPayment] = useState("500.00");

  const totalCost = packages.reduce((sum, pkg) => sum + pkg.price, 0);
  const discount = title === "Platinum" ? 800 : title === "Gold" ? 500 : 0;
  const finalCost = totalCost - discount;

  return (
    <Card className="mt-4">
      <CardContent className="p-4">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <Select value={paymentType} onValueChange={setPaymentType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Payment Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full">Full Payment</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="text-right text-sm">
              <p className="text-gray-600">Subtotal: ${totalCost.toFixed(2)}</p>
              <p className="text-gray-600">Discount: -${discount.toFixed(2)}</p>
              <p className="font-bold">Total: ${finalCost.toFixed(2)}</p>
            </div>
          </div>

          {paymentType === "finance" && (
            <div className="space-y-2">
              <Select value={monthlyTerm} onValueChange={setMonthlyTerm}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="48">48 Months @ 4.99%</SelectItem>
                  <SelectItem value="36">36 Months @ 4.49%</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Down Payment:</span>
                <Input
                  type="text"
                  value={downPayment}
                  onChange={(e) => setDownPayment(e.target.value)}
                  className="w-[120px]"
                />
              </div>
              <div className="text-sm text-gray-600">
                <p>Monthly: ${(finalCost / parseInt(monthlyTerm)).toFixed(2)}</p>
                <p className="text-xs">On Approved Credit</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const EmptyPackage = ({ onNameChange }: {
  onNameChange: (name: string) => void;
}) => {
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

const PackageSection = ({
  title,
  packages,
  showSelect,
  onRemoveItem,
  onDrop,
  onUpdateItem,
  onAddItem
}: {
  title: string;
  packages: Package[];
  showSelect?: boolean;
  onRemoveItem?: (pkg: Package) => void;
  onDrop?: (e: React.DragEvent) => void;
  onUpdateItem?: (oldItem: Package, newItem: Package) => void;
  onAddItem?: () => void;
}) => {
  const { toast } = useToast();
  const isAddOns = title === "Add-ons";

  const handleUpdateItem = (oldItem: Package, newTitle: string) => {
    if (onUpdateItem) {
      onUpdateItem(oldItem, { ...oldItem, title: newTitle });
      toast({
        title: "Item Updated",
        description: "The item name has been updated successfully",
      });
    }
  };

  return (
    <div className={cn(
      "space-y-4 w-[400px]",
      isAddOns ? "bg-accent/10 p-6 rounded-lg" : "bg-white/5 backdrop-blur-sm p-6 rounded-lg"
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
      
      <div 
        className={cn(
          "min-h-[400px] rounded-lg transition-all duration-300 ease-in-out",
          packages.length === 0 && "bg-accent/5"
        )}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
      >
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
      </div>
      
      {!isAddOns && <PaymentSummary packages={packages} title={title} />}
    </div>
  );
};

// Main App Component
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-400">
        <PresentationMode />
      </div>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

// Presentation Mode Component
const PresentationMode = () => {
  const [currentStep, setCurrentStep] = useState<"presentation" | "question" | "packages">("presentation");

  const renderStep = () => {
    switch (currentStep) {
      case "presentation":
        return <PresentationSlide />;
      case "question":
        return <QuestionPage />;
      case "packages":
        return <PackageSelection />;
      default:
        return null;
    }
  };

  const handleNext = () => {
    switch (currentStep) {
      case "presentation":
        setCurrentStep("question");
        break;
      case "question":
        setCurrentStep("packages");
        break;
    }
  };

  const handleBack = () => {
    switch (currentStep) {
      case "question":
        setCurrentStep("presentation");
        break;
      case "packages":
        setCurrentStep("question");
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-400">
      {renderStep()}
      <div className="fixed bottom-8 right-8 flex gap-4">
        {currentStep !== "presentation" && (
          <Button 
            variant="outline"
            onClick={handleBack}
            className="bg-white hover:bg-blue-50"
          >
            Back
          </Button>
        )}
        {currentStep !== "packages" && (
          <Button 
            onClick={handleNext}
            className="bg-white text-blue-600 hover:bg-blue-50"
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

// Presentation Components
const PresentationSlide = () => {
  const slideUrl = "https://www.dickinson.edu/download/downloads/id/1076/sample_powerpoint_slides.pptx";

  return (
    <div className="p-8">
      <Card className="max-w-4xl mx-auto aspect-video bg-white/95 shadow-lg">
        <div className="h-full flex flex-col items-center justify-center p-8">
          <h1 className="text-2xl text-green-500 mb-4">Sample PowerPoint Presentation</h1>
          <div className="w-full h-full relative">
            <iframe 
              src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(slideUrl)}`}
              className="w-full h-full border-none"
              title="Presentation Slide"
              allow="fullscreen"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

const QuestionPage = () => {
  const [answer, setAnswer] = useState<string | null>(null);
  const menuItems = [
    {
      id: 1,
      title: "Menu Item 1",
      points: ["Bullet Point", "Bullet Point", "Bullet Point", "Bullet Point"],
      price: 458.21,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
      id: 2,
      title: "Menu Item 2",
      points: ["Bullet Point", "Bullet Point", "Bullet Point", "Bullet Point"],
      price: 534.50,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
      id: 3,
      title: "Menu Item 3",
      points: ["Bullet Point", "Bullet Point", "Bullet Point", "Bullet Point"],
      price: 612.75,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    }
  ];

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="p-8">
          <h2 className="text-2xl text-center mb-8">Does Anyone Suffer from Allergies?</h2>
          
          <div className="flex justify-center gap-4 mb-8">
            <Button
              variant={answer === "yes" ? "default" : "outline"}
              onClick={() => setAnswer("yes")}
            >
              Yes
            </Button>
            <Button
              variant={answer === "no" ? "default" : "outline"}
              onClick={() => setAnswer("no")}
            >
              No
            </Button>
          </div>

          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent className="-ml-2 md:-ml-4">
              {Array.from({ length: Math.ceil(menuItems.length / 2) }).map((_, slideIndex) => (
                <CarouselItem key={slideIndex} className="pl-2 md:pl-4 basis-full">
                  <div className="grid grid-cols-2 gap-6">
                    {menuItems.slice(slideIndex * 2, slideIndex * 2 + 2).map((item) => (
                      <Card key={item.id}>
                        <CardContent className="p-6">
                          <h3 className="font-bold mb-2">{item.title}</h3>
                          <ul className="list-disc pl-5 mb-4">
                            {item.points.map((point, index) => (
                              <li key={index}>{point}</li>
                            ))}
                          </ul>
                          <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                          <div className="flex justify-between items-center">
                            <span className="font-bold">${item.price.toFixed(2)}</span>
                            <Button variant="outline">Select</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </Card>
      </div>
    </div>
  );
};

const PackageSelection = () => {
  const { toast } = useToast();
  const [packages, setPackages] = useState(initialPackages);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [customPackages, setCustomPackages] = useState<string[]>([]);

  const packageTypes: PackageType[] = ['platinum', 'gold', 'silver', ...customPackages];
  const visiblePackages = [
    packageTypes[currentIndex],
    packageTypes[currentIndex + 1]
  ].filter(Boolean);

  const handleDrop = (e: React.DragEvent, targetSection: PackageType | 'addons') => {
    e.preventDefault();
    const item: Package = JSON.parse(e.dataTransfer.getData("application/json"));
    const sourceSection = Object.entries(packages).find(([_, items]) => 
      items.some(pkg => pkg.id === item.id)
    )?.[0];

    if (!sourceSection || sourceSection === targetSection) return;

    setPackages(prev => {
      const newPackages = { ...prev };
      newPackages[sourceSection] = prev[sourceSection].filter(pkg => pkg.id !== item.id);
      newPackages[targetSection] = [...(prev[targetSection] || []), item];
      return newPackages;
    });

    toast({
      title: "Package Moved",
      description: `Moved ${item.title} to ${targetSection} package`,
    });
  };

  const handleRemoveItem = (item: Package, section: PackageType) => {
    setPackages(prev => {
      const newPackages = { ...prev };
      newPackages[section] = prev[section].filter(pkg => pkg.id !== item.id);
      newPackages.addons = [...prev.addons, item];
      return newPackages;
    });

    toast({
      title: "Package Removed",
      description: `${item.title} has been moved back to add-ons`,
    });
  };

  const handleNext = () => {
    if (currentIndex < packageTypes.length - 2) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleAddPackage = () => {
    const newPackageName = `New Package`;
    setCustomPackages(prev => [...prev, newPackageName]);
    setPackages(prev => ({
      ...prev,
      [newPackageName]: []
    }));
    
    const newPackageIndex = Math.max(0, packageTypes.length - 1);
    setCurrentIndex(Math.max(0, newPackageIndex - 1));

    toast({
      title: "Package Added",
      description: "A new package has been created",
    });
  };

  const handleDeletePackage = () => {
    const currentPackage = visiblePackages[0];
    if (!currentPackage || ['platinum', 'gold', 'silver'].includes(currentPackage)) {
      return;
    }

    setCustomPackages(prev => prev.filter(name => name !== currentPackage));
    setPackages(prev => {
      const newPackages = { ...prev };
      delete newPackages[currentPackage];
      return newPackages;
    });

    toast({
      title: "Package Deleted",
      description: "The package has been removed",
    });
  };

  const handlePackageNameChange = (oldName: string, newName: string) => {
    setCustomPackages(prev => 
      prev.map(name => name === oldName ? newName : name)
    );
    setPackages(prev => {
      const newPackages = { ...prev };
      newPackages[newName] = prev[oldName];
      delete newPackages[oldName];
      return newPackages;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-400 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr] gap-8 items-start">
          {visiblePackages.map((packageType) => (
            <div
              key={packageType}
              className="min-h-[600px]"
            >
              {packages[packageType] ? (
                <>
                  <PackageName 
                    initialName={packageType} 
                    onNameChange={(newName) => handlePackageNameChange(packageType, newName)} 
                  />
                  <PackageSection
                    title={packageType}
                    packages={packages[packageType]}
                    showSelect={true}
                    onRemoveItem={(pkg) => handleRemoveItem(pkg, packageType)}
                    onDrop={(e) => handleDrop(e, packageType)}
                  />
                </>
              ) : (
                <EmptyPackage 
                  onNameChange={(newName) => handlePackageNameChange(packageType, newName)} 
                />
              )}
            </div>
          ))}

          <PackageControls
            onPrevious={handlePrevious}
            onNext={handleNext}
            onAdd={handleAddPackage}
            onDelete={handleDeletePackage}
            canGoPrevious={currentIndex > 0}
            canGoNext={currentIndex < packageTypes.length - 2}
            showDelete={visiblePackages[0] && !['platinum', 'gold', 'silver'].includes(visiblePackages[0])}
          />

          <div>
            <h1 className="text-3xl font-bold text-white mb-4">Add-ons</h1>
            <PackageSection
              title="Add-ons"
              packages={packages.addons}
              onDrop={(e) => handleDrop(e, 'addons')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;