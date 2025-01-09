<template>
  <div class="payment-summary">
    <div class="payment-options">
      <select v-model="paymentType" class="payment-select">
        <option value="full">Full Payment</option>
        <option value="finance">Finance</option>
      </select>
      
      <div class="summary-totals">
        <p>Subtotal: ${{ totalCost.toFixed(2) }}</p>
        <p>Discount: -${{ discount.toFixed(2) }}</p>
        <p class="total">Total: ${{ finalCost.toFixed(2) }}</p>
      </div>
    </div>

    <div v-if="paymentType === 'finance'" class="finance-options">
      <select v-model="monthlyTerm" class="term-select">
        <option value="48">48 Months @ 4.99%</option>
        <option value="36">36 Months @ 4.49%</option>
      </select>
      
      <div class="down-payment">
        <span>Down Payment:</span>
        <input 
          type="text" 
          v-model="downPayment"
          class="down-payment-input"
        />
      </div>
      
      <div class="monthly-details">
        <p>Monthly: ${{ monthlyPayment.toFixed(2) }}</p>
        <p class="credit-note">On Approved Credit</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Package {
  id: number;
  title: string;
  points: string[];
  price: number;
  description: string;
}

interface Props {
  packages: Package[];
  title: string;
}

const props = defineProps<Props>();
const paymentType = ref('full');
const monthlyTerm = ref('48');
const downPayment = ref('500.00');

const totalCost = computed(() => {
  return props.packages.reduce((sum, pkg) => sum + pkg.price, 0);
});

const discount = computed(() => {
  return props.title === "Platinum" ? 800 : props.title === "Gold" ? 500 : 0;
});

const finalCost = computed(() => totalCost.value - discount.value);

const monthlyPayment = computed(() => {
  return finalCost.value / parseInt(monthlyTerm.value);
});
</script>

<style scoped>
.payment-summary {
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  background-color: white;
}

.payment-options {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.payment-select, .term-select {
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  width: 180px;
}

.summary-totals {
  text-align: right;
  font-size: 0.875rem;
  color: #4a5568;
}

.total {
  font-weight: bold;
  color: #1a202c;
}

.finance-options {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.down-payment {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #4a5568;
}

.down-payment-input {
  width: 120px;
  padding: 0.25rem 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
}

.monthly-details {
  font-size: 0.875rem;
  color: #4a5568;
}

.credit-note {
  font-size: 0.75rem;
  color: #718096;
}
</style>