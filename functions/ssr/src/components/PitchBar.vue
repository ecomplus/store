<template>
  <div v-if="countValidSlides" class="relative z-20 bg-base-100">
    <div class="container mx-auto px-3 py-1 md:w-2/3">
      <Carousel :autoplay="countValidSlides > 1 ? 7000 : undefined">
        <li
          v-for="(slide, i) in slides"
          :key="i"
          class="h-full shrink-0 basis-full text-center"
        >
          <ALink
            :href="slide.href"
            :target="slide.target"
            class="inline-block px-8"
            :class="slide.href ? 'hover:underline' : null"
          >
            <span
              v-if="parsedContents[i]"
              v-html="parsedContents[i]"
              class="text-sm text-base-800 prose"
            ></span>
          </ALink>
        </li>
        <template #controls>
          <div
            v-show="countValidSlides > 1"
            class="text-xl leading-none text-base-400"
          >
            <CarouselControl
              class="bg-base-100 pr-2 hover:text-base-700"
              is-prev
            />
            <CarouselControl class="bg-base-100 pl-2 hover:text-base-700" />
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

export interface Props extends UsePitchBarProps {}

const props = defineProps<Props>();
const {
  parsedContents,
  countValidSlides,
} = usePitchBar(props);
</script>
