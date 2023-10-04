<template>
  <li class="text-base-800 text-lg">
    <details
      v-if="categoryTree.subcategories.length"
      class="z-10 overflow-y-auto overflow-x-hidden bg-white
      open:absolute open:left-0 open:top-0 open:h-full open:w-full"
      @toggle="isOpen = !isOpen"
    >
      <summary
        class="active:bg-base-100 cursor-pointer list-none px-6 py-3 transition-colors"
        :class="isOpen ? 'bg-base-100' : null"
      >
        <i :class="!isOpen
          ? 'i-arrow-right float-right mb-0 mt-1 text-xl text-base-500'
          : 'i-arrow-right rotate-180 text-lg'"></i>
        <AImg
          v-if="!isOpen && categoryTree.icon"
          :picture="categoryTree.icon"
          :alt="categoryTree.name"
          class="mr-3 inline h-5 w-auto"
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
          v-for="(subcategoryTree, i) in categoryTree.subcategories"
          :key="i"
          :category-tree="subcategoryTree"
        />
        <li>
          <a
            :href="`/${categoryTree.slug}`"
            class="active:bg-base-200 block px-6 py-3 text-base underline"
          >
            {{ $t.i19seeAll$1Category.replace('$1', categoryTree.name) }}
          </a>
        </li>
      </ul>
    </details>
    <a
      v-else
      :href="`/${categoryTree.slug}`"
      class="active:bg-base-200 block px-6 py-3"
    >
      <AImg
        v-if="!isOpen && categoryTree.icon"
        :picture="categoryTree.icon"
        :alt="categoryTree.name"
        class="mr-3 inline h-5 w-auto"
      />
      <h3 class="inline">{{ categoryTree.name }}</h3>
    </a>
  </li>
</template>

<script setup lang="ts">
import type { CategoryTree, SubcategoryTree } from '@@sf/composables/use-shop-header';

export interface Props {
  categoryTree: CategoryTree | SubcategoryTree;
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
