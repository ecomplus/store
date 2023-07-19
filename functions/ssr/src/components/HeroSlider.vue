<template>
  <section class="relative mx-auto">
    <Carousel :autoplay="autoplay" class="secondary [&>*]:items-center">
      <li
        v-for="(slide, i) in parsedSlides"
        :key="i"
        class="shrink-0 basis-full"
      >
        <Banner
          v-bind="{ ...slide, headingTag: i === 0 ? 'h2' : 'h3' }"
          class="w-screen max-w-screen-2xl"
        >
          <template #picture>
            <slot :name="`picture-${i}`" />
          </template>
        </Banner>
      </li>
      <template #controls>
        <div
          v-show="parsedSlides.length > 1"
          class="absolute z-10 bottom-5 flex justify-end items-center
          w-screen right-5 xl:right-auto xl:max-w-screen-xl xl:left-1/2 xl:-ms-[640px]"
        >
          <div class="relative w-20 h-10 rounded-full
            bg-white/50 text-primary shadow-sm ring-1 ring-black/5">
            <CarouselControl class="w-10 h-10 rounded-full hover:bg-primary/10" is-prev>
              <i class="i-arrow-left"></i>
            </CarouselControl>
            <CarouselControl class="w-10 h-10 rounded-full hover:bg-primary/10">
              <i class="i-arrow-right"></i>
            </CarouselControl>
          </div>
        </div>
      </template>
    </Carousel>
  </section>
</template>

<script setup lang="ts">
import {
  type Props as UseHeroSliderProps,
  useHeroSlider,
} from '@@sf/composables/use-hero-slider';
import Carousel from '@@sf/components/Carousel.vue';
import CarouselControl from '@@sf/components/CarouselControl.vue';
import Banner from '~/components/Banner.vue';

export interface Props extends UseHeroSliderProps {}

const props = defineProps<Props>();
const { parsedSlides } = useHeroSlider(props);
</script>
