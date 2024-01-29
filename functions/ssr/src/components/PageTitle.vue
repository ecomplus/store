<template>
  <section v-if="title" class="bg-secondary-100 py-2">
    <article class="ui-section">
      <div class="prose mx-auto">
        <div class="not-prose flex items-center gap-4 md:justify-center">
          <AImg
            v-if="logo"
            :picture="logo"
            :alt="logo.alt || title"
            class="h-auto max-w-[150px] xl:max-w-[200px]"
          />
          <h1 class="ui-title text-secondary-800 text-center">
            {{ title }}
          </h1>
        </div>
        <p
          v-if="description"
          :class="description.length < 120 && 'md:text-center'"
        >
          {{ description }}
        </p>
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
import type { Categories, Brands, Collections } from '@cloudcommerce/api/types';

export interface Props {
  apiDoc?: Partial<Categories | Brands | Collections>;
  title?: string;
  description?: string;
}

const props = withDefaults(defineProps<Props>(), {
  apiDoc: () => globalThis.$storefront.apiContext?.doc as Categories,
});
const title = computed(() => {
  return props.title || props.apiDoc?.name;
});
const logo = computed(() => {
  return (props.apiDoc as Brands)?.logo;
});
const description = computed(() => {
  return props.description || props.apiDoc?.short_description;
});
</script>
