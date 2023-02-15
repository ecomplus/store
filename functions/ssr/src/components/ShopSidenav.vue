<template>
  <aside>
    <nav class="py-5">
      <ul class="relative">
        <ShopSidenavCategory
          v-for="categoryTree in categoryTrees"
          :key="categoryTree._id"
          :category-tree="categoryTree"
        />
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import type { CategoryTree } from '@@sf/composables/use-shop-header';
import ShopSidenavCategory from '~/components/ShopSidenavCategory.vue';

export interface Props {
  categoryTrees: CategoryTree[];
}

defineProps<Props>();
</script>
