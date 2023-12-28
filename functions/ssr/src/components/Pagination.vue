<template>
  <ol class="text-base-900 flex justify-center gap-1.5
    text-center text-sm font-medium leading-9">
    <li>
      <ALink
        :href="page > 1 ? `?p=${page - 1}` : null"
        @click.prevent="page > 1 && emit('update:page', page - 1)"
        class="mr-1 block min-w-9 rounded border px-3"
        :class="page > 1
          ? 'border-base-100 hover:bg-base-100'
          : 'border-transparent text-base-500'"
      >
        <i class="i-arrow-right rotate-180"></i>
        <span class="ml-1.5 hidden md:inline">{{ $t.i19previous }}</span>
      </ALink>
    </li>
    <li v-for="pageN in pages" :key="pageN">
      <ALink
        :href="pageN !== page ? `?p=${pageN}` : null"
        @click.prevent="emit('update:page', pageN)"
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
        :href="page < totalPages ? `?p=${page + 1}` : null"
        @click.prevent="page < totalPages && emit('update:page', page + 1)"
        class="ml-1 block min-w-9 rounded border px-3"
        :class="page < totalPages
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

export type Props = UsePaginationProps;

const props = withDefaults(defineProps<Props>(), {
  page: 1,
  maxPages: 7,
});
const emit = defineEmits<{
  'update:page': [value: number]
}>();
const { totalPages, pages } = usePagination(props);
</script>
