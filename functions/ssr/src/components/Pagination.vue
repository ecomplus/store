<template>
  <ol class="text-base-900 flex justify-center gap-1.5
    text-center text-sm font-medium leading-9">
    <li>
      <ALink
        :href="prevPageLink"
        @click.prevent="prevPageLink && (page = page - 1)"
        class="mr-1 block min-w-9 rounded border px-3"
        :class="prevPageLink
          ? 'border-base-100 hover:bg-base-100'
          : 'border-transparent text-base-500'"
      >
        <i class="i-arrow-right rotate-180"></i>
        <span class="ml-1.5 hidden md:inline">{{ $t.i19previous }}</span>
      </ALink>
    </li>
    <li v-for="(pageN, i) in pages" :key="pageN">
      <ALink
        :href="pageN !== page ? pageLinks[i] : null"
        @click.prevent="page = pageN"
        class="block w-9 rounded border ring-black/10"
        :class="pageN === page
          ? 'bg-base-50 border-base-100 ring text-base-700'
          : 'border-transparent hover:bg-base-100'"
      >
        {{ pageN }}
      </ALink>
    </li>
    <li>
      <ALink
        :href="nextPageLink"
        @click.prevent="nextPageLink && (page = page + 1)"
        class="ml-1 block min-w-9 rounded border px-3"
        :class="nextPageLink
          ? 'border-base-100 hover:bg-base-100'
          : 'border-transparent text-base-500'"
      >
        <span class="mr-1.5 hidden md:inline">{{ $t.i19next }}</span>
        <i class="i-arrow-right"></i>
      </ALink>
    </li>
  </ol>
</template>

<script setup lang="ts">
import {
  type Props as UsePaginationProps,
  usePagination,
} from '@@sf/composables/use-pagination';

export interface Props extends UsePaginationProps {}

const props = withDefaults(defineProps<Props>(), {
  maxPages: 7,
  isUrlPath: false,
});
const page = defineModel<number>('page', { default: 1 });
const {
  pages,
  pageLinks,
  prevPageLink,
  nextPageLink,
} = usePagination(props);
</script>
