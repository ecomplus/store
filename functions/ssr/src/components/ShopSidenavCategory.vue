<template>
  <li class="text-lg text-base-800">
    <details
      v-if="categoryTree.subcategories.length"
      class="z-10 overflow-y-auto overflow-x-hidden bg-white
      open:absolute open:left-0 open:top-0 open:size-full"
      :open="isOpen"
    >
      <summary
        class="list-none transition-colors active:bg-base-100"
        :class="isOpen && 'bg-base-100'"
      >
        <a
          :href="`/${categoryTree.slug}`"
          class="block px-6 py-3"
          @click.prevent="isOpen = !isOpen"
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
          <h3 class="inline" :class="isOpen && 'ml-4 text-base'">
            {{ categoryTree.name }}
          </h3>
        </a>
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
          <ALink
            :href="`/${categoryTree.slug}`"
            prefetch="visible"
            class="block px-6 py-3 text-base underline active:bg-base-200"
          >
            {{ $t.i19seeAll$1Category.replace('$1', categoryTree.name) }}
          </ALink>
        </li>
      </ul>
    </details>
    <ALink
      v-else
      :href="`/${categoryTree.slug}`"
      prefetch="visible"
      class="block px-6 py-3 active:bg-base-200"
    >
      <AImg
        v-if="!isOpen && categoryTree.icon"
        :picture="categoryTree.icon"
        :alt="categoryTree.name"
        class="mr-3 inline h-5 w-auto"
      />
      <h3 class="inline">{{ categoryTree.name }}</h3>
    </ALink>
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
