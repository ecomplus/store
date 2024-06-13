<template>
  <section class="ui-section">
    <article class="mx-auto prose">
      <h1 class="my-4 not-prose ui-title">{{ title }}</h1>
      <ContentClearfix :html="html" />
    </article>
  </section>
</template>

<script setup lang="ts">
import { micromark } from 'micromark';
import ContentClearfix from '@@sf/components/ContentClearfix.vue';

export interface Props {
  title: string;
  markdown: string;
}

const props = defineProps<Props>();
const html = computed(() => micromark(props.markdown, {
  allowDangerousHtml: true,
}));
</script>
