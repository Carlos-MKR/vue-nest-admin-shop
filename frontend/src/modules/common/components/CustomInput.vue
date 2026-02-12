<template>
  <div>
    <input
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value ?? '')"
      @blur="$emit('blur')"
      :class="['form-control', error ? 'border-red-500' : 'border-gray-300']"
    />
    <span class="text-red-400" v-if="error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string | number;
  error?: string;
  type?: 'text' | 'number';
}

withDefaults(defineProps<Props>(), {
  type: 'text',
});

defineEmits(['update:modelValue', 'blur']);
</script>

<style scoped>
@reference "tailwindcss";
.form-control {
  @apply w-full rounded-lg border px-3 py-2 text-gray-700
         focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none;
}
</style>
