<template>
  <article>
    <nav class="bg-base-100/80 p-4 backdrop-blur-md lg:rounded">
      <Carousel class="gap-2 px-6" :wrapper-key="term">
        <li
          v-for="(term, i) in searchHistory"
          :key="i"
          class="shrink-0"
        >
          {{ term }}
        </li>
      </Carousel>
    </nav>
    <ProductShelf :products="searchEngine.products" class="rounded bg-white" />
  </article>
</template>

<script setup lang="ts">
import { SearchEngine, searchHistory } from '@@sf/state/search-engine';
import ProductShelf from '~/components/ProductShelf.vue';

export interface Props {
  term: string;
}

const props = defineProps<Props>();
const searchEngine = new SearchEngine();
watch(toRef(props, 'term'), (term) => searchEngine.fetch(term));
</script>
