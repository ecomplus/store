<template>
  <section
    v-if="searchTerm"
    class="px-6 text-center text-xl lowercase text-base-700 ui-section-slim"
    :class="hasFiltersBar ? 'relative z-[14] -mb-4' : 'mb-0'"
  >
    {{ $t.i19searchingFor }}
    <h1 class="inline font-bold italic text-base-800">
      {{ searchTerm }}
    </h1>
  </section>
  <div
    v-if="isFetching && !products.length"
    class="relative min-h-[300px] ui-section"
  >
    <Skeleton class="absolute top-0 w-full px-5" is-bold is-large />
  </div>
  <article ref="showcase" class="relative">
    <Fade>
      <section
        v-if="hasFiltersBar"
        class="sticky top-0 z-[12]
        flex items-center justify-between
        rounded-b bg-white/80 to-base-100 px-6 py-4
        shadow-sm backdrop-blur-sm transition-transform ui-section-slim
        sticky-header:translate-y-16 lg:sticky-header:translate-y-14"
      >
        <strong class="font-medium lowercase text-base-700">
          <template v-if="resultMeta.count > 1">
            {{ resultMeta.count }}
            <span class="hidden lg:inline">{{ $t.i19itemsFound }}</span>
            <span class="lg:hidden">{{ $t.i19products }}</span>
          </template>
        </strong>
        <div class="flex items-center gap-4">
          <span class="hidden text-xl leading-none md:block">
            <i class="m-0 text-base-600 i-adjustments-horizontal"></i>
          </span>
          <button
            @click="isFiltersOpen = !isFiltersOpen"
            class="relative ui-btn-sm ui-btn-secondary"
          >
            <span class="hidden md:inline">
              {{ $t.i19filterProducts }}
            </span>
            <span class="md:hidden">
              <i class="mr-1 i-adjustments-horizontal"></i>
              {{ $t.i19filterOut }}
            </span>
            <span
              v-if="filtersCount"
              class="outline-3 absolute -right-1.5
              -top-1 outline outline-secondary/80 ui-badge-pill-sm"
            >
              {{ filtersCount }}
            </span>
          </button>
          <Listbox
            v-if="!fixedParams?.sort"
            v-model="sortOption"
            as="div"
            class="relative text-sm text-base-800"
          >
            <ListboxButton :id="$useId('ss')" class="ui-btn-sm ui-btn-secondary">
              {{ $t.i19sort }}
            </ListboxButton>
            <Fade>
              <ListboxOptions class="absolute
                right-0 mt-2 divide-y divide-base-100 rounded bg-white
                shadow ring-1 ring-black/5 focus:outline-none">
                <ListboxOption
                  v-for="({ label, value }) in sortOptions"
                  :key="value || 'sort'"
                  :value="value"
                  as="template"
                  v-slot="{ selected, active }"
                >
                  <li>
                    <component
                      :is="selected ? 'div' : 'button'"
                      class="flex w-full py-2 pl-3 pr-6"
                      :class="!selected && active
                        && 'bg-secondary-100 text-secondary'"
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
    <ProductShelf :products is-grid>
      <template #append>
        <Fade slide="down">
          <nav v-if="!isFetching && totalPages > 1" class="mt-3 lg:mt-4">
            <Pagination
              v-model:page="searchEngine.pageNumber.value"
              :total-pages
            />
          </nav>
        </Fade>
      </template>
    </ProductShelf>
    <Fade>
      <div
        v-if="isFetching"
        class="absolute left-0 top-0 z-[14] size-full bg-white/40"
      ></div>
    </Fade>
  </article>
  <Drawer
    v-model="isFiltersOpen"
    placement="end"
    :backdrop-target="null"
    :can-lock-scroll="false"
    class="!z-[80] bg-white shadow [&_[data-drawer-close]]:bg-white/80"
  >
    <SearchFilters :search-engine :fixed-params />
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
import Pagination from '~/components/Pagination.vue';
import ProductShelf from '~/components/ProductShelf.vue';
import SearchFilters from '~/components/SearchFilters.vue';

export interface Props extends UseSearchShowcaseProps {}

const props = withDefaults(defineProps<Props>(), {
  canUseUrlParams: true,
});
const showcase = ref<HTMLElement | null>(null);
const {
  searchEngine,
  fetching,
  isFetching,
  products,
  resultMeta,
  totalPages,
  filtersCount,
  sortOptions,
  sortOption,
} = useSearchShowcase({ ...props, showcase });
if (import.meta.env.SSR) {
  await fetching;
}
const wasFetched = computed(() => searchEngine.wasFetched.value);
const searchTerm = computed(() => searchEngine.term.value);
const hasFiltersBar = computed(() => {
  return wasFetched && !!(resultMeta.value.count > 4 || filtersCount.value);
});
const isFiltersOpen = ref(false);
</script>
