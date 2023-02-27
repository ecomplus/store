<template>
  <nav>
    <ul
      class="flex gap-4 xl:gap-5 text-base-700"
      :class="inlineMenuTrees.length < 7 ? 'text-base' : 'text-sm'"
    >
      <li v-for="(categoryTree, i) in inlineMenuTrees" :key="i">
        <ShopHeaderSubmenu
          v-if="categoryTree.subcategories.length"
          :category-tree="categoryTree"
        >
          <template #button="{ open }">
            <span class="hover:text-primary group">
              <h3
                class="group-hover:underline inline"
                :class="[
                  inlineMenuTrees.length < 7 ? 'decoration-2' : null,
                  open ? 'underline' : null,
                ]"
              >
                {{ categoryTree.name }}
              </h3>
              <i
                v-if="hasOneLevelSubcategories"
                class="i-chevron-down ml-1 transition-transform
                text-base-400 group-hover:text-primary-subtle"
                :class="open ? 'rotate-180' : null"
              ></i>
            </span>
          </template>
        </ShopHeaderSubmenu>
        <a
          v-else
          :href="`/${categoryTree.slug}`"
          class="hover:text-primary hover:underline"
          :class="inlineMenuTrees.length < 7 ? 'decoration-2' : null"
        >
          <h3 class="inline">{{ categoryTree.name }}</h3>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import type { CategoryTree } from '@@sf/composables/use-shop-header';
import { computed } from 'vue';
import ShopHeaderSubmenu from '~/components/ShopHeaderSubmenu.vue';

export interface Props {
  inlineMenuTrees: CategoryTree[];
}

const props = defineProps<Props>();
const hasOneLevelSubcategories = computed(() => {
  return !!props.inlineMenuTrees.find(({ subcategories }) => !subcategories.length);
});
</script>
