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
                class="text-base-400 group-hover:text-primary-subtle ml-1"
                :class="open ? 'i-chevron-up' : 'i-chevron-down'"
              ></i>
            </span>
          </template>
        </ShopHeaderSubmenu>
        <a
          v-else
          :href="`/${categoryTree.slug}`"
          class="hover:text-primary hover:underline decoration-2"
        >
          <h3 class="inline">{{ categoryTree.name }}</h3>
        </a>
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

defineProps<Props>();
</script>
