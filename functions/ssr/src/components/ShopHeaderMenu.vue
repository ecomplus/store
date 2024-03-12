<template>
  <nav>
    <ul
      class="flex gap-4 text-base-700 xl:gap-5"
      :class="inlineMenuTrees.length < 7 ? 'text-base' : 'text-sm'"
    >
      <li v-for="(categoryTree, i) in inlineMenuTrees" :key="i">
        <ShopHeaderSubmenu
          v-if="categoryTree.subcategories.length"
          :category-tree="categoryTree"
        >
          <template #button="{ open }">
            <span class="group hover:text-primary">
              <h3
                class="inline group-hover:underline"
                :class="[
                  inlineMenuTrees.length < 7 ? 'decoration-2' : null,
                  open ? 'underline' : null,
                ]"
              >
                {{ categoryTree.name }}
              </h3>
              <i
                v-if="hasOneLevelSubcategories"
                class="ml-1 text-base-400 transition-transform
                i-chevron-right group-hover:text-primary-subtle"
                :class="open ? '-rotate-90' : 'rotate-90'"
              ></i>
            </span>
          </template>
        </ShopHeaderSubmenu>
        <ALink
          v-else
          :href="`/${categoryTree.slug}`"
          class="hover:text-primary hover:underline"
          :class="inlineMenuTrees.length < 7 ? 'decoration-2' : null"
        >
          <h3 class="inline">{{ categoryTree.name }}</h3>
        </ALink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import type { CategoryTree } from '@@sf/composables/use-shop-header';
import ShopHeaderSubmenu from '~/components/ShopHeaderSubmenu.vue';

export interface Props {
  inlineMenuTrees: CategoryTree[];
}

const props = defineProps<Props>();
const hasOneLevelSubcategories = computed(() => {
  return !!props.inlineMenuTrees.find(({ subcategories }) => !subcategories.length);
});
</script>
