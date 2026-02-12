<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-white px-6 py-4 rounded-xl">
      <h1 class="text-2xl font-semibold text-gray-800">
        Producto
        <span class="text-gray-400 font-normal">/ {{ title }}</span>
      </h1>
    </div>

    <!-- Form -->
    <form @submit.prevent="onSubmit" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Columna izquierda -->
      <div class="bg-white p-6 rounded-xl space-y-4">
        <div>
          <label class="form-label">Título</label>
          <CustomInput v-model="title" v-bind="titleAttrs" :error="errors.title" />
          <!-- <input
            v-model="title"
            v-bind="titleAttrs"
            type="text"
            :class="['form-control', errors.title ? 'border-red-500' : 'border-gray-300']"
          />
          <span class="text-red-400" v-if="errors.title">{{ errors.title }}</span> -->
        </div>

        <div>
          <label class="form-label">Slug</label>
          <CustomInput v-model="slug" v-bind="slugAttrs" :error="errors.slug" />
        </div>

        <div>
          <label class="form-label">Descripción</label>
          <CustomTextArea
            v-model="description"
            v-bind="descriptionAttrs"
            :error="errors.description"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="form-label">Precio</label>
            <CustomInput v-model.number="price" v-bind="priceAttrs" :error="errors.price" />
          </div>

          <div>
            <label class="form-label">Inventario</label>
            <CustomInput v-model.number="stock" v-bind="stockAttrs" :error="errors.stock" />
          </div>
        </div>

        <!-- Tallas -->
        <div>
          <label class="form-label mb-3">Tallas</label>
          <div class="flex gap-2">
            <button
              v-for="size in allSizes"
              :key="size"
              @click="toggleSize(size)"
              type="button"
              :class="[
                'size-btn text-gray-500 flex-1',
                {
                  'bg-blue-500 text-white': hasSize(size),
                },
              ]"
            >
              {{ size }}
            </button>
          </div>
        </div>
      </div>

      <!-- Columna derecha -->
      <div class="bg-white p-6 rounded-xl space-y-4">
        <div>
          <label class="form-label">Imágenes</label>
          <div class="flex gap-4 overflow-x-auto p-3 bg-gray-100 rounded-lg">
            <img
              v-for="image in images"
              :key="image.value"
              :src="image.value"
              class="w-48 h-48 rounded-lg object-cover border"
            />

            <img
              v-for="imageFile in imageFiles"
              :key="imageFile.name"
              :src="temporalImageUrl(imageFile)"
              class="w-48 h-48 rounded-lg object-cover border"
            />
          </div>
        </div>

        <div>
          <label class="form-label">Subir imágenes</label>
          <input
            type="file"
            multiple
            class="form-control file:minimal-file"
            accept="image/*"
            @change="onFileChanged"
          />
        </div>

        <div>
          <label class="form-label">Género</label>
          <select v-model="gender" v-bind="genderAttrs" class="form-control">
            <option value="">Seleccione</option>
            <option value="kid">Niño</option>
            <option value="women">Mujer</option>
            <option value="men">Hombre</option>
          </select>
          <span class="text-red-400" v-if="errors.gender">{{ errors.gender }}</span>
        </div>

        <!-- Guardar -->
        <div class="pt-4 text-right">
          <button
            :disabled="isPending"
            class="btn-primary hover:cursor-pointer :disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </form>
  </div>

  <!-- <div class="grid grid-cols-2 mt-2">
    <div class="bg-blue-200 p-2">
      <pre>{{ values }}</pre>
    </div>
    <div class="bg-red-200 p-2">
      <pre>{{ errors }}</pre>
    </div>
    <div class="bg-green-200 p-2">
      <pre>{{ meta }}</pre>
    </div>
  </div> -->
</template>

<style scoped>
@reference "tailwindcss";

.form-label {
  @apply block text-sm font-medium text-gray-600 mb-1;
}

.form-control {
  @apply w-full rounded-lg border px-3 py-2 text-gray-700
         focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none;
}

.size-btn {
  @apply px-4 py-2 rounded-lg border  hover:border-gray-400;
}

.size-btn-active {
  @apply px-4 py-2 rounded-lg bg-blue-500 text-white;
}

.btn-primary {
  @apply bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium;
}
</style>

<script src="./ProductView.ts" lang="ts"></script>
