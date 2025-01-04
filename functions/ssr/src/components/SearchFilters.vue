<template>
  <aside class="h-screen overflow-y-auto bg-base-50/40">
    <header class="px-6 pb-3 pt-5 text-center">
      <button
        v-if="filtersCount"
        class="py-1 ui-btn-sm ui-btn-danger"
        @click="clearFilters"
      >
        {{ $t.i19clearFilters }}
        <i class="ml-0.5 i-trash"></i>
      </button>
      <p
        v-else
        class="border border-transparent pb-1
        text-base font-semibold text-base-500"
      >
        {{ $t.i19filterResults }}
      </p>
    </header>
    <article v-if="resultBuckets" class="px-6 pb-3">
      <Collapse
        v-if="priceRanges"
        :title="$t.i19price"
        class="[&>summary]:text-xl"
        open
      >
        <div class="space-y-1.5">
          <div
            v-for="({ range, key }) in priceRanges"
            :key="`prices-${key}`"
            class="flex items-center"
          >
            <input
              type="radio"
              :id="`priceRange-${key}`"
              name="priceRange"
              :value="key"
              v-model="priceRangeKey"
            />
            <label
              :for="`priceRange-${key}`"
              class="cursor-pointer px-3 text-sm"
            >
              {{ getPriceRangeLabel(range) }}
              <small class="font-medium text-base-500">
                ({{ range.count }})
              </small>
            </label>
          </div>
          <div
            v-if="activeFilters['price<'] || activeFilters['price>']"
            class="flex items-center"
          >
            <input
              type="radio"
              id="priceRange-null"
              name="priceRange"
              :value="null"
              v-model="priceRangeKey"
            />
            <label for="priceRange-null" class="cursor-pointer px-3 text-sm">
              {{ $t.i19anyPrice }}
            </label>
          </div>
        </div>
      </Collapse>
      <Collapse
        v-for="({ title, options, field }) in filterOptions"
        :key="field"
        :title="title"
        class="[&>summary]:text-xl"
        :open="!!activeFilters[field]"
      >
        <div class="space-y-1.5">
          <div
            v-for="(count, value, i) in options"
            :key="`${field}-${i}`"
            class="flex items-center"
          >
            <input
              type="checkbox"
              :id="`${field}-${value}`"
              :value="value"
              :checked="checkFilterOption(field, value)"
              @change="toggleFilterOption(field, value)"
            />
            <label
              :for="`${field}-${value}`"
              class="cursor-pointer px-3 text-sm"
            >
              {{ value }}
              <small class="font-medium text-base-500">
                ({{ count }})
              </small>
            </label>
          </div>
        </div>
      </Collapse>
    </article>
  </aside>
</template>

<script setup lang="ts">
import {
  type Props as UseSearchFiltersProps,
  useSearchFilters,
} from '@@sf/composables/use-search-filters';
import Collapse from '~/components/Collapse.vue';

export type Props = UseSearchFiltersProps
const props = defineProps<Props>();
const {
  resultBuckets,
  activeFilters,
  filtersCount,
  clearFilters,
  priceRanges,
  priceRangeKey,
  getPriceRangeLabel,
  filterOptions,
  checkFilterOption,
  toggleFilterOption,
} = useSearchFilters(props);
</script>
