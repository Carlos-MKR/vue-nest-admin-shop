<template>
  <div class="py-10 flex items-center justify-center gap-4 bg-gray-100">
    <!-- Botón Anterior -->
    <button
      :disabled="page === 1"
      @click="$router.push({ query: { page: page - 1 } })"
      class="flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
    >
      <ArrowLeftIcon />
      Anterior
    </button>

    <!-- Botón Siguiente -->
    <button
      :disabled="HasMoreData"
      @click="$router.push({ query: { page: page + 1 } })"
      class="flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
    >
      Siguiente
      <ArrowRightIcon />
    </button>
  </div>
</template>
<script setup lang="ts">
import ArrowLeftIcon from '@/icons/ArrowLeftIcon.vue';
import ArrowRightIcon from '@/icons/ArrowRightIcon.vue';

interface Props {
  page: number;
  HasMoreData: boolean;
}

defineProps<Props>();
</script>
