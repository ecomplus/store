<template>
  <section v-if="hasSpecs" class="ui-section">
    <Collapse :title="title || $t.i19specifications">
      <ul>
        <li
          v-for="(grid, gridId) in specifications"
          :key="gridId"
          class="grid grid-cols-2 border-dashed border-base-200
          py-2 sm:grid-cols-3 [&:not(:last-child)]:border-b"
        >
          <span class="text-base-700">
            {{ getGridTitle(`${gridId}`, grids || []) }}
          </span>
          <strong class="font-semibold sm:col-span-2">
            {{ getSpecTextValue(product, `${gridId}`, grids) }}
          </strong>
        </li>
      </ul>
    </Collapse>
  </section>
</template>

<script setup lang="ts">
import type { Products } from '@cloudcommerce/api/types';
import {
  gridTitle as getGridTitle,
  specTextValue as getSpecTextValue,
} from '@ecomplus/utils';
import Collapse from '~/components/Collapse.vue';

export interface Props {
  product: Products;
  title?: string;
}

const props = defineProps<Props>();
const specifications = computed(() => props.product.specifications || {});
const hasSpecs = computed(() => Object.keys(specifications.value).length);
const { grids } = globalThis.$storefront.data;
</script>
