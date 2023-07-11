<template>
  <div class="bg-base-100 relative z-20">
    <div class="container md:w-2/3 mx-auto px-3 py-1">
      <Carousel :autoplay="countValidSlides > 1 ? 7000 : undefined">
        <li
          v-for="(slide, i) in slides"
          :key="i"
          class="shrink-0 basis-full h-full text-center"
        >
          <component
            :is="slide.href ? 'ALink' : 'span'"
            :href="slide.href"
            :target="slide.target"
            class="inline-block px-8"
            :class="slide.href ? 'hover:underline' : null"
          >
            <span
              v-if="parsedContents[i]"
              v-html="parsedContents[i]"
              class="prose text-sm text-base-800"
            ></span>
          </component>
        </li>
        <template #controls>
          <div
            v-show="countValidSlides > 1"
            class="text-xl leading-none text-base-400"
          >
            <CarouselControl class="pr-2 bg-base-100 hover:text-base-700" is-prev />
            <CarouselControl class="pl-2 bg-base-100 hover:text-base-700" />
          </div>
        </template>
      </Carousel>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  type Props as UsePitchBarProps,
  usePitchBar,
} from '@@sf/composables/use-pitch-bar';
import Carousel from '@@sf/components/Carousel.vue';
import CarouselControl from '@@sf/components/CarouselControl.vue';

export interface Props extends UsePitchBarProps {}

const props = defineProps<Props>();
const {
  parsedContents,
  countValidSlides,
} = usePitchBar(props);
</script>
