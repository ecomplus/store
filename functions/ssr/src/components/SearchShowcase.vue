<template>
  <div
    v-if="isFetching && !products.length"
    class="ui-section relative min-h-[300px]"
  >
    <Skeleton class="absolute top-0 w-full px-5" is-bold is-large />
  </div>
  <article class="relative">
    <Fade>
      <section
        v-if="resultMeta.count > 4"
        class="ui-section-slim sticky-header:translate-y-14
        to-base-100 sticky top-0 z-[12] flex items-center justify-between
        rounded-b bg-white/80 px-6 py-4 shadow-sm backdrop-blur-sm
        transition-transform duration-75"
      >
        <strong class="text-base-700 font-medium lowercase">
          {{ resultMeta.count }}
          <span class="hidden lg:inline">{{ $t.i19itemsFound }}</span>
          <span class="lg:hidden">{{ $t.i19products }}</span>
        </strong>
        <div class="flex items-center gap-4">
          <span class="hidden text-xl leading-none md:block">
            <i class="i-adjustments-horizontal text-base-600 m-0"></i>
          </span>
          <button
            @click="isFiltersOpen = !isFiltersOpen"
            class="ui-btn-sm ui-btn-secondary"
          >
            <span class="hidden md:inline">
              {{ $t.i19filterProducts }}
            </span>
            <span class="md:hidden">
              <i class="i-adjustments-horizontal mr-1"></i>
              {{ $t.i19filterOut }}
            </span>
          </button>
          <Listbox
            v-model="sortOption"
            as="div"
            class="text-base-800 relative text-sm"
          >
            <ListboxButton class="ui-btn-sm ui-btn-secondary">
              {{ $t.i19sort }}
            </ListboxButton>
            <Fade>
              <ListboxOptions class="divide-base-100
                absolute right-0 mt-2 divide-y rounded bg-white
                shadow ring-1 ring-black/5 focus:outline-none">
                <ListboxOption
                  v-for="({ label, value }) in sortOptions"
                  :key="value || 'sort'"
                  :value="value"
                  as="template"
                  v-slot="{ selected }"
                >
                  <li>
                    <component
                      :is="selected ? 'div' : 'button'"
                      class="flex w-full py-2 pl-3 pr-6"
                      :class="!selected && 'hover:bg-base-100'"
                    >
                      <div class="w-5">
                        <i v-show="selected" class="i-check"></i>
                      </div>
                      {{ label }}
                    </component>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </Fade>
          </Listbox>
        </div>
      </section>
    </Fade>
    <ProductShelf :products="products" is-grid />
    <Fade>
      <div
        v-if="isFetching"
        class="absolute left-0 top-0 z-[14] h-full w-full bg-white/40"
      ></div>
    </Fade>
  </article>
  <Drawer
    v-model="isFiltersOpen"
    placement="end"
    :backdrop-target="null"
    :can-lock-scroll="false"
    class="!z-[80] shadow"
  >
    <aside class="flex h-screen flex-col bg-white"></aside>
  </Drawer>
</template>

<script setup lang="ts">
import {
  useSearchShowcase,
  type Props as UseSearchShowcaseProps,
} from '@@sf/composables/use-search-showcase';
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue';
import Drawer from '@@sf/components/Drawer.vue';
import ProductShelf from '~/components/ProductShelf.vue';

export interface Props extends UseSearchShowcaseProps {}

const props = withDefaults(defineProps<Props>(), {
  canUseUrlParams: true,
});
const {
  fetching,
  isFetching,
  products,
  resultMeta,
  sortOptions,
  sortOption,
} = useSearchShowcase(props);
if (import.meta.env.SSR) {
  await fetching;
}
const isFiltersOpen = ref(false);
</script>
