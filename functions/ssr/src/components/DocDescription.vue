<template>
  <section v-if="html" class="ui-section">
    <details class="[&_i]:open:rotate-180" open>
      <summary role="button" class="list-none text-2xl font-medium lowercase
        text-base-700 hover:text-base-800 [&>i]:hover:text-primary">
        <i class="i-chevron-down mr-1"></i>
        <span>{{ title || $t.i19description }}</span>
      </summary>
      <ContentClearfix :html="html" />
    </details>
  </section>
</template>

<script setup lang="ts">
import type {
  Products,
  Categories,
  Brands,
  Collections,
} from '@cloudcommerce/api/types';
import { computed } from 'vue';
import ContentClearfix from '@@sf/components/ContentClearfix.vue';

export interface Props {
  apiDoc?: Partial<Products | Categories | Brands | Collections>;
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  apiDoc: () => globalThis.$storefront.apiContext?.doc as Products,
});
const html = computed(() => props.apiDoc.body_html || props.apiDoc.body_text);
</script>
