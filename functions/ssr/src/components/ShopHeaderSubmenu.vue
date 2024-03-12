<template>
  <Popover v-slot="{ open }">
    <a :href="`/${categoryTree.slug}`" role="button">
      <PopoverButton
        :id="`PopB${categoryTree._id || $useId('c')}`"
        class="outline-none"
      >
        <slot name="button" v-bind="{ open }" />
      </PopoverButton>
    </a>
    <div class="relative" ref="panel">
      <Fade>
        <PopoverPanel
          v-slot="{ close }"
          class="absolute left-1/2 top-3 z-50 -translate-x-1/2 !transform
          rounded bg-white px-6 py-4 text-base text-base-700 shadow"
          :class="countMenuCols === 1 ? 'w-60'
            : countMenuCols === 2
              ? `w-screen ${(categoryPicture ? 'max-w-lg' : 'max-w-sm')}`
            : countMenuCols === 3
              ? `w-screen ${(categoryPicture ? 'max-w-xl' : 'max-w-md')}`
            : countMenuCols < 6
              ? 'w-screen max-w-3xl' : 'w-screen max-w-5xl'"
        >
          <div class="flex w-full gap-6">
            <ul v-if="subcategoryLinks.length" class="flex-1">
              <li
                v-for="(subcategory, i) in subcategoryLinks"
                :key="`link-${i}`"
                :class="subcategoryLinks.length > 10 ? 'text-sm mb-1' : 'mb-2'"
              >
                <ALink
                  :href="`/${subcategory.slug}`"
                  prefetch="visible"
                  class="hover:text-primary"
                >
                  <h3>{{ subcategory.name }}</h3>
                </ALink>
              </li>
            </ul>
            <div
              v-for="(subcategory, i) in subcategoryCols"
              :key="i"
              class="flex-1"
            >
              <ALink :href="`/${subcategory.slug}`" class="hover:text-primary">
                <h3>{{ subcategory.name }}</h3>
              </ALink>
              <ul class="mb-1.5 mt-1 text-sm text-base-600">
                <li
                  v-for="(nestedSubcategory, ii) in subcategory.subcategories"
                  :key="`${i}-${ii}`"
                  class="mb-0.5"
                >
                  <ALink
                    :href="`/${nestedSubcategory.slug}`"
                    class="hover:text-primary hover:underline"
                  >
                    <h3>{{ nestedSubcategory.name }}</h3>
                  </ALink>
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
          <ALink
            :href="`/${categoryTree.slug}`"
            prefetch="visible"
            class="mt-1 block text-xs leading-snug text-base-600 underline"
          >
            {{ $t.i19seeAll$1Category.replace('$1', categoryTree.name) }}
          </ALink>
          <button ref="close" @click.stop="close" class="hidden"></button>
        </PopoverPanel>
      </Fade>
    </div>
  </Popover>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import {
  type Props as UseShopHeaderSubmenuProps,
  useShopHeaderSubmenu,
} from '@@sf/composables/use-shop-header-submenu';

export interface Props extends UseShopHeaderSubmenuProps {}

const props = defineProps<Props>();
const {
  categoryPicture,
  subcategoryLinks,
  subcategoryCols,
  countMenuCols,
} = useShopHeaderSubmenu(props);
const panel = ref(null);
const close = ref<HTMLElement | null>(null);
onClickOutside(panel, () => close.value?.click());
</script>
