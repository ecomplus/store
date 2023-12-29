<template>
  <section v-if="title" class="ui-section">
    <div class="flex items-center gap-4">
      <AImg
        v-if="logo"
        :picture="logo"
        :alt="logo.alt || title"
        class="h-auto max-w-[150px] xl:max-w-[200px]"
      />
      <h1 class="ui-title">
        {{ title }}
      </h1>
    </div>
    <div class="prose">
      <p v-if="description">
        {{ description }}
      </p>
    </div>
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
