<template>
  <div class="app">
    <div class="package-selection">
      <div class="header">
        <h1>Package Selection</h1>
      </div>
      
      <div class="packages-container">
        <div v-for="(packageType, index) in visiblePackages" :key="packageType">
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

        <package-controls
          @previous="handlePrevious"
          @next="handleNext"
          @add="handleAddPackage"
          @delete="handleDeletePackage"
          :can-go-previous="currentIndex > 0"
          :can-go-next="currentIndex < packageTypes.length - 2"
          :show-delete="visiblePackages[0] && !['platinum', 'gold', 'silver'].includes(visiblePackages[0])"
        />

        <div class="addons-section">
          <h2>Add-ons</h2>
          <package-section
            title="Add-ons"
            :packages="packages.addons"
            @drop="(e) => handleDrop(e, 'addons')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import PackageName from './components/PackageName.vue';
import PackageSection from './components/PackageSection.vue';
import EmptyPackage from './components/EmptyPackage.vue';
import PackageControls from './components/PackageControls.vue';

interface Package {
  id: number;
  title: string;
  points: string[];
  price: number;
  description: string;
}

const initialPackages = {
  platinum: [
    {
      id: 1,
      title: "Premium Package",
      points: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
      price: 4299.23,
      description: "Our premium package with all features included."
    },
    {
      id: 2,
      title: "Premium Add-on",
      points: ["Add-on 1", "Add-on 2", "Add-on 3", "Add-on 4"],
      price: 4299.23,
      description: "Additional premium features for your package."
    }
  ],
  gold: [
    {
      id: 4,
      title: "Gold Package",
      points: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
      price: 4209.23,
      description: "Our gold tier package with essential features."
    }
  ],
  silver: [
    {
      id: 5,
      title: "Silver Package",
      points: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
      price: 3209.23,
      description: "Our silver tier package for basic needs."
    }
  ],
  addons: [
    {
      id: 6,
      title: "Basic Add-on",
      points: ["Add-on 1", "Add-on 2", "Add-on 3", "Add-on 4"],
      price: 4269.23,
      description: "Additional features for any package."
    },
    {
      id: 7,
      title: "Premium Add-on",
      points: ["Add-on 1", "Add-on 2", "Add-on 3", "Add-on 4"],
      price: 4269.23,
      description: "Premium additional features for any package."
    }
  ]
};

const packages = ref(initialPackages);
const currentIndex = ref(0);
const customPackages = ref<string[]>([]);

const packageTypes = computed(() => ['platinum', 'gold', 'silver', ...customPackages.value]);
const visiblePackages = computed(() => [
  packageTypes.value[currentIndex.value],
  packageTypes.value[currentIndex.value + 1]
].filter(Boolean));

const handleDrop = (e: DragEvent, targetSection: string) => {
  const data = e.dataTransfer?.getData('application/json');
  if (!data) return;
  
  const item: Package = JSON.parse(data);
  const sourceSection = Object.entries(packages.value).find(([_, items]) => 
    items.some(pkg => pkg.id === item.id)
  )?.[0];

  if (!sourceSection || sourceSection === targetSection) return;

  packages.value = {
    ...packages.value,
    [sourceSection]: packages.value[sourceSection].filter(pkg => pkg.id !== item.id),
    [targetSection]: [...packages.value[targetSection], item]
  };
};

const handleRemoveItem = (item: Package, section: string) => {
  packages.value = {
    ...packages.value,
    [section]: packages.value[section].filter(pkg => pkg.id !== item.id),
    addons: [...packages.value.addons, item]
  };
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
  packages.value = {
    ...packages.value,
    [newPackageName]: []
  };
  
  const newPackageIndex = Math.max(0, packageTypes.value.length - 1);
  currentIndex.value = Math.max(0, newPackageIndex - 1);
};

const handleDeletePackage = () => {
  const currentPackage = visiblePackages.value[0];
  if (!currentPackage || ['platinum', 'gold', 'silver'].includes(currentPackage)) {
    return;
  }

  customPackages.value = customPackages.value.filter(name => name !== currentPackage);
  const { [currentPackage]: _, ...rest } = packages.value;
  packages.value = rest;
};

const handlePackageNameChange = (oldName: string, newName: string) => {
  customPackages.value = customPackages.value.map(name => 
    name === oldName ? newName : name
  );
  
  const { [oldName]: packageContent, ...rest } = packages.value;
  packages.value = {
    ...rest,
    [newName]: packageContent
  };
};

const handleUpdateItem = (oldItem: Package, newItem: Package, section: string) => {
  packages.value = {
    ...packages.value,
    [section]: packages.value[section].map(pkg => 
      pkg.id === oldItem.id ? newItem : pkg
    )
  };
};
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: linear-gradient(to bottom right, #2563eb, #60a5fa);
  padding: 2rem;
}

.package-selection {
  max-width: 1280px;
  margin: 0 auto;
}

.header {
  margin-bottom: 2rem;
}

.header h1 {
  font-size: 2rem;
  font-weight: bold;
  color: white;
}

.packages-container {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr;
  gap: 2rem;
  align-items: start;
}

.addons-section h2 {
  font-size: 1.875rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1rem;
}

@media (max-width: 1024px) {
  .packages-container {
    grid-template-columns: 1fr;
  }
}
</style>