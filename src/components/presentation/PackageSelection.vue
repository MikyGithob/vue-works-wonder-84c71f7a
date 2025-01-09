<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-600 to-blue-400 p-8">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr] gap-8 items-start">
        <template v-for="packageType in visiblePackages" :key="packageType">
          <div class="min-h-[600px]">
            <template v-if="packages[packageType]">
              <package-name 
                :initial-name="packageType" 
                @name-change="(newName) => handlePackageNameChange(packageType, newName)" 
              />
              <package-section
                :title="packageType"
                :packages="packages[packageType]"
                :show-select="true"
                @remove-item="(pkg) => handleRemoveItem(pkg, packageType)"
                @drop="(e) => handleDrop(e, packageType)"
                @update-item="(oldItem, newItem) => handleUpdateItem(oldItem, newItem, packageType)"
              />
            </template>
            <empty-package 
              v-else
              @name-change="(newName) => handlePackageNameChange(packageType, newName)" 
            />
          </div>
        </template>

        <package-controls
          :on-previous="handlePrevious"
          :on-next="handleNext"
          :on-add="handleAddPackage"
          :on-delete="handleDeletePackage"
          :can-go-previous="currentIndex > 0"
          :can-go-next="currentIndex < packageTypes.length - 2"
          :show-delete="visiblePackages[0] && !['platinum', 'gold', 'silver'].includes(visiblePackages[0])"
        />

        <div>
          <h1 class="text-3xl font-bold text-white mb-4">Add-ons</h1>
          <package-section
            title="Add-ons"
            :packages="packages.addons"
            @drop="(e) => handleDrop(e, 'addons')"
            @update-item="(oldItem, newItem) => handleUpdateItem(oldItem, newItem, 'addons')"
            @add-item="handleAddAddonItem"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useToast } from '@/hooks/use-toast';
import PackageName from '../packages/PackageName.vue';
import PackageSection from '../packages/PackageSection.vue';
import EmptyPackage from '../packages/EmptyPackage.vue';
import PackageControls from '../packages/PackageControls.vue';
import type { Package } from '@/types/package';

const toast = useToast();
const currentIndex = ref(0);
const customPackages = ref<string[]>([]);

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

const packages = ref(initialPackages);
const packageTypes = computed(() => ['platinum', 'gold', 'silver', ...customPackages.value]);
const visiblePackages = computed(() => [
  packageTypes.value[currentIndex.value],
  packageTypes.value[currentIndex.value + 1]
].filter(Boolean));

const handleDrop = (e: DragEvent, targetSection: string) => {
  e.preventDefault();
  const item: Package = JSON.parse(e.dataTransfer.getData("application/json"));
  const sourceSection = Object.entries(packages.value).find(([_, items]) => 
    items.some(pkg => pkg.id === item.id)
  )?.[0];

  if (!sourceSection || sourceSection === targetSection) return;

  packages.value = {
    ...packages.value,
    [sourceSection]: packages.value[sourceSection].filter(pkg => pkg.id !== item.id),
    [targetSection]: [...(packages.value[targetSection] || []), item]
  };

  toast({
    title: "Package Moved",
    description: `Moved ${item.title} to ${targetSection} package`,
  });
};

const handleRemoveItem = (item: Package, section: string) => {
  packages.value = {
    ...packages.value,
    [section]: packages.value[section].filter(pkg => pkg.id !== item.id),
    addons: [...packages.value.addons, item]
  };

  toast({
    title: "Package Removed",
    description: `${item.title} has been moved back to add-ons`,
  });
};

const handleNext = () => {
  if (currentIndex.value < packageTypes.value.length - 2) {
    currentIndex.value++;
  }
};

const handlePrevious = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

const handleAddPackage = () => {
  const newPackageName = `custom${customPackages.value.length + 1}`;
  customPackages.value.push(newPackageName);
  packages.value[newPackageName] = [];

  const newPackageIndex = Math.max(0, packageTypes.value.length - 1);
  currentIndex.value = Math.max(0, newPackageIndex - 1);

  toast({
    title: "Package Added",
    description: "A new package has been created",
  });
};

const handleDeletePackage = () => {
  const currentPackage = visiblePackages.value[0];
  if (!currentPackage || ['platinum', 'gold', 'silver'].includes(currentPackage)) {
    return;
  }

  customPackages.value = customPackages.value.filter(name => name !== currentPackage);
  delete packages.value[currentPackage];

  toast({
    title: "Package Deleted",
    description: "The package has been removed",
  });
};

const handlePackageNameChange = (oldName: string, newName: string) => {
  customPackages.value = customPackages.value.map(name => name === oldName ? newName : name);
  packages.value[newName] = packages.value[oldName];
  delete packages.value[oldName];
};

const handleUpdateItem = (oldItem: Package, newItem: Package, section: string) => {
  packages.value[section] = packages.value[section].map(pkg => 
    pkg.id === oldItem.id ? newItem : pkg
  );
  toast({
    title: "Item Updated",
    description: "The item name has been updated successfully",
  });
};

const handleAddAddonItem = () => {
  const newItem: Package = {
    id: Date.now(),
    title: "New Add-on",
    points: ["New feature", "Customizable"],
    price: 99.99,
    description: "Description of the new add-on"
  };

  packages.value.addons.push(newItem);

  toast({
    title: "Add-on Created",
    description: "A new add-on item has been created",
  });
};
</script>