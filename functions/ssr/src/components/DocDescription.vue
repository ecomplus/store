<template>
  <section v-if="html" class="ui-section">
    <Collapse
      :title="title || $t.i19description"
      class="mx-auto max-w-prose"
      open
    >
      <ContentClearfix :html="html" />
    </Collapse>
  </section>
</template>

<script setup lang="ts">
import type {
  Products,
  Categories,
  Brands,
  Collections,
} from '@cloudcommerce/api/types';
import ContentClearfix from '@@sf/components/ContentClearfix.vue';
import Collapse from '~/components/Collapse.vue';

export interface Props {
  apiDoc?: Partial<Products | Categories | Brands | Collections>;
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  apiDoc: () => (globalThis.$storefront.apiContext?.doc || {}) as Partial<Brands>,
});
const html = computed(() => props.apiDoc.body_html);
</script>
