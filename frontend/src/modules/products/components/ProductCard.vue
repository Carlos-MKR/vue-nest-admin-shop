<template>
  <article
    class="group rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
  >
    <a href="#" class="block">
      <!-- Imagen -->
      <div class="relative aspect-square overflow-hidden rounded-t-2xl bg-gray-100">
        <img
          :src="product.images[0]"
          :alt="product.title"
          class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <!-- Contenido -->
      <div class="p-4">
        <h2 class="text-sm font-semibold text-slate-800 line-clamp-1">
          {{ product.title }}
        </h2>

        <p class="mt-1 text-xs text-slate-500 line-clamp-2">
          {{ product.description }}
        </p>

        <!-- Precio + botón -->
        <div class="mt-4 flex items-center justify-between">
          <p class="text-xl font-bold text-blue-600">${{ product.price }}</p>

          <button
            class="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-4 w-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            Add to cart
          </button>
        </div>
      </div>
    </a>
  </article>
</template>

<script setup lang="ts">
import type { Product } from '../interfaces/product.interface';

interface Props {
  product: Product;
}

const { product } = defineProps<Props>();
</script>
