<template>
  <Popover v-slot="{ open }">
    <PopoverButton class="outline-none">
      <slot name="button" v-bind="{ open }" />
    </PopoverButton>
    <div class="relative">
      <Fade>
        <PopoverPanel
          class="absolute z-20 top-3 left-1/2 -translate-x-1/2 !transform
          px-6 py-4 rounded-md backdrop-blur-md shadow bg-white/80
          text-base text-base-700"
          :class="countMenuCols === 1 ? 'w-60'
            : countMenuCols === 2 ? `w-screen ${(categoryPicture ? 'max-w-lg' : 'max-w-sm')}`
            : countMenuCols === 3 ? `w-screen ${(categoryPicture ? 'max-w-xl' : 'max-w-md')}`
            : countMenuCols < 6 ? 'w-screen max-w-3xl' : 'w-screen max-w-5xl'"
        >
          <div class="flex gap-6 w-full">
            <ul v-if="subcategoryLinks.length" class="flex-1">
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
            <div
              v-for="(subcategory, i) in subcategoryCols"
              :key="subcategory._id"
              class="flex-1"
            >
              <a :href="`/${subcategory.slug}`" class="hover:text-primary">
                <h3>{{ subcategory.name }}</h3>
              </a>
              <ul class="text-sm text-base-600 mt-1 mb-1.5">
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
              :class="countMenuCols === 2 ? 'basis-1/2'
                : countMenuCols < 5 ? 'basis-2/5' : 'basis-1/3'"
            >
              <AImg :picture="categoryPicture" class="ml-auto rounded" />
            </div>
          </div>
          <a
            :href="`/${categoryTree.slug}`"
            class="block mt-1 text-xs text-base-600 leading-snug underline"
          >
            {{ $t.i19seeAll$1Category.replace('$1', categoryTree.name) }}
          </a>
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
