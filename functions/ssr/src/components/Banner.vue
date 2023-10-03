<template>
  <div
    class="mx-auto overflow-x-hidden"
    :class="hasHeader ? 'grid grid-cols-1 sm:grid-cols-2 items-center' : null"
  >
    <ALink
      :href="href"
      :class="hasHeader
        ? 'sm:order-last [&_img]:max-w-full sm:[&_img]:max-w-none'
          + ' [&_img]:aspect-video sm:[&_img]:aspect-[2.5] [&_img]:object-cover'
        : '[&_img]:max-w-full'"
    >
      <slot name="picture" />
    </ALink>
    <div
      v-if="hasHeader"
      class="mb-3 p-12 sm:mb-0 xl:ps-32"
    >
      <Component
        v-if="parsedTitle"
        :is="headingTag"
        class="ui-title mt-1"
      >
        {{ parsedTitle }}
      </Component>
      <p v-if="parsedSubtitle" class="mt-4 text-lg md:mt-6">
        {{ parsedSubtitle }}
      </p>
      <ALink
        v-if="parsedButtonText"
        :href="buttonLink"
        class="ui-btn-lg ui-btn-contrast mt-7 min-w-[150px] md:mt-10"
      >
        {{ parsedButtonText }}
      </ALink>
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
