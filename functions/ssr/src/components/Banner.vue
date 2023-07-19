<template>
  <div
    class="mx-auto overflow-x-hidden"
    :class="hasHeader ? 'grid grid-cols-1 md:grid-cols-2 items-center' : null"
  >
    <component
      :is="href ? 'a-link' : 'span'"
      :href="href"
      :class="hasHeader ? 'basis-1/2 grow-0 md:order-last' : null"
    >
      <slot name="picture" />
    </component>
    <div
      v-if="hasHeader"
      class="basis-1/2 grow-0 p-12 xl:ps-32 mb-3 md:mb-0"
    >
      <Component
        v-if="parsedTitle"
        :is="headingTag"
        class="ui-title mt-1"
      >
        {{ parsedTitle }}
      </Component>
      <p v-if="parsedSubtitle" class="text-lg mt-4 md:mt-6">
        {{ parsedSubtitle }}
      </p>
      <component
        v-if="parsedButtonText"
        :is="buttonLink ? 'a-link' : 'span'"
        :href="buttonLink"
        class="ui-btn-lg ui-btn-contrast min-w-[150px] mt-7 md:mt-10"
      >
        {{ parsedButtonText }}
      </component>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  type Props as UseBannerProps,
  useBanner,
} from '@@sf/composables/use-banner';

export type Props = UseBannerProps & {
  headingTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const props = withDefaults(defineProps<Props>(), {
  headingTag: 'h3',
});
const {
  hasHeader,
  parsedTitle,
  parsedSubtitle,
  parsedButtonText,
} = useBanner(props);
</script>
