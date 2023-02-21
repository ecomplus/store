<template>
  <Popover v-slot="{ open }">
    <PopoverButton class="outline-none">
      <slot name="button" v-bind="{ open }" />
    </PopoverButton>
    <div class="relative">
      <Fade>
        <PopoverPanel
          class="absolute z-20 top-3 left-1/2 -translate-x-1/2 !transform
          bg-white px-6 py-4 rounded-md shadow grid gap-6 text-base text-base-700"
          :class="countMenuCols === 1 ? 'w-60'
            : countMenuCols === 2 ? 'w-screen max-w-md grid-cols-3'
            : countMenuCols === 3 ? 'w-screen max-w-lg grid-cols-4'
            : countMenuCols === 4 ? 'w-screen max-w-xl grid-cols-6'
            : countMenuCols === 5 ? 'w-screen max-w-2xl grid-cols-7'
            : `w-screen max-w-5xl ${(countMenuCols === 6 ? 'grid-cols-8' : 'grid-cols-9')}`"
        >
          <ul v-if="subcategoryLinks.length">
            <li
              v-for="(subcategory, i) in subcategoryLinks"
              :key="`link-${i}`"
              :class="subcategoryLinks.length > 10 ? 'text-sm mb-1' : 'mb-2'"
            >
              <a :href="`/${subcategory.slug}`" class="hover:text-primary">
                <h3>{{ subcategory.name }}</h3>
              </a>
            </li>
          </ul>
          <div v-for="(subcategory, i) in subcategoryCols" :key="subcategory._id">
            <a :href="`/${subcategory.slug}`" class="hover:text-primary">
              <h3>{{ subcategory.name }}</h3>
            </a>
            <ul class="text-sm text-base-600 mt-1">
              <li
                v-for="(nestedSubcategory, ii) in subcategory.subcategories"
                :key="`${i}-${ii}`"
                class="mb-0.5"
              >
                <a
                  :href="`/${nestedSubcategory.slug}`"
                  class="hover:text-primary hover:underline"
                >
                  <h3>{{ nestedSubcategory.name }}</h3>
                </a>
              </li>
            </ul>
          </div>
          <div
            v-if="categoryPicture"
            :class="countMenuCols < 4 ? 'col-span-2' : 'col-span-3'"
          >
            <img
              loading="lazy"
              :src="categoryPicture.url"
              :alt="categoryPicture.alt || categoryTree.name"
              class="ml-auto rounded"
            />
          </div>
        </PopoverPanel>
      </Fade>
    </div>
  </Popover>
</template>

<script setup lang="ts">
import type { CategoryTree } from '@@sf/composables/use-shop-header';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import useShopHeaderSubmenu from '@@sf/composables/use-shop-header-submenu';

export interface Props {
  categoryTree: CategoryTree;
}

const props = defineProps<Props>();
const {
  categoryPicture,
  subcategoryLinks,
  subcategoryCols,
  countMenuCols,
} = useShopHeaderSubmenu(props);
</script>
