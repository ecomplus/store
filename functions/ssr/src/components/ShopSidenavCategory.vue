<template>
  <li class="text-lg text-base-800">
    <details
      v-if="categoryTree.subcategories.length"
      class="bg-white overflow-y-auto overflow-x-hidden z-10
      open:absolute open:top-0 open:left-0 open:w-full open:h-full"
      @toggle="isOpen = !isOpen"
    >
      <summary
        class="cursor-pointer list-none px-6 py-3 active:bg-base-100 transition-colors"
        :class="isOpen ? 'bg-base-100' : null"
      >
        <i :class="!isOpen
          ? 'i-arrow-right float-right mb-0 mt-1 text-xl text-base-500'
          : 'i-arrow-left text-lg'"></i>
        <AImg
          v-if="!isOpen && categoryTree.icon"
          :picture="categoryTree.icon"
          class="w-auto h-5 inline mr-3"
        />
        <h3 class="inline" :class="isOpen ? 'ml-4 text-base' : null">
          {{ categoryTree.name }}
        </h3>
      </summary>
      <ul
        class="mt-2 transition-opacity"
        :class="isFaded ? 'opacity-20' : 'opacity-100'"
        tabindex="-1"
      >
        <ShopSidenavCategory
          v-for="subcategoryTree in categoryTree.subcategories"
          :key="subcategoryTree._id"
          :category-tree="subcategoryTree"
        />
        <li>
          <a
            :href="`/${categoryTree.slug}`"
            class="block px-6 py-3 text-base underline active:bg-base-200"
          >
            {{ $t.i19seeAll$1Category.replace('$1', categoryTree.name) }}
          </a>
        </li>
      </ul>
    </details>
    <a
      v-else
      :href="`/${categoryTree.slug}`"
      class="block px-6 py-3 active:bg-base-200"
    >
      <AImg
        v-if="!isOpen && categoryTree.icon"
        :picture="categoryTree.icon"
        class="w-auto h-5 inline mr-3"
      />
      <h3 class="inline">{{ categoryTree.name }}</h3>
    </a>
  </li>
</template>

<script setup lang="ts">
import type { CategoryTree } from '@@sf/composables/use-shop-header';
import { ref, watch } from 'vue';

export interface Props {
  categoryTree: CategoryTree;
}

defineProps<Props>();
const isOpen = ref(false);
const isFaded = ref(true);
watch(isOpen, (_isOpen) => {
  if (_isOpen) {
    setTimeout(() => { isFaded.value = false; }, 25);
  } else {
    isFaded.value = true;
  }
});
</script>
