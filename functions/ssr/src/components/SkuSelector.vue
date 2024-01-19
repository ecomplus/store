<template>
  <div>
    <div
      v-for="(options, gridId) in variationsGrids" :key="gridId"
      class="mt-3"
    >
      <span class="text-base-700 text-sm font-medium">
        {{ getGridTitle(gridId) }}:
        <strong v-if="selectedOptions[gridId]" class="text-base-800">
          {{ selectedOptions[gridId] }}
        </strong>
      </span>
      <ul v-if="options.length < 7" class="mt-2 flex gap-2">
        <li v-for="(optionText, i) in options" :key="`${gridId}-${i}`">
          <button
            class="ring-primary/60 rounded border"
            :class="[
              selectedOptions[gridId] === optionText
                ? 'border-primary ring-2'
                : null,
              gridId === 'colors'
                ? 'size-9 text-[0px]'
                : 'px-2.5 py-2 leading-none',
              activeVariationsGrids[gridId].includes(optionText)
                ? 'border-primary-400 bg-primary-100 text-primary-950'
                : 'border-primary-300 bg-primary-200 text-primary-600'
            ]"
            :style="gridId === 'colors' && getColorOptionBg(optionText)"
            @click="selectOption({ optionText, gridId, gridIndex: i })"
          >
            {{ optionText }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  type Props as UseSkuSelector,
  useSkuSelector,
} from '@@sf/composables/use-sku-selector';

export interface Props extends UseSkuSelector {}

const props = defineProps<Props>();
const emit = defineEmits(['update:variationId']);
const {
  variationsGrids,
  activeVariationsGrids,
  selectOption,
  selectedOptions,
  variationId,
  getGridTitle,
  getColorOptionBg,
} = useSkuSelector(props);
watch(variationId, (_id) => {
  emit('update:variationId', _id);
});
</script>
