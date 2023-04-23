<template>
  <section class="relative mx-auto">
    <Carousel :autoplay="autoplay">
      <li
        v-for="(slide, i) in parsedSlides"
        :key="i"
        class="shrink-0 basis-full h-full secondary"
      >
        <div
          class="w-screen max-w-screen-2xl mx-auto overflow-x-hidden"
          :class="slide.hasHeader ? 'grid grid-cols-1 md:grid-cols-2 items-center' : null"
        >
          <a
            :href="slide.href"
            :class="slide.hasHeader ? 'basis-1/2 grow-0 md:order-last' : null"
          >
            <slot :name="`picture-${i}`" />
          </a>
          <div
            v-if="slide.hasHeader"
            class="basis-1/2 grow-0 p-12 xl:ps-32 mb-3 md:mb-0"
          >
            <Component
              :is="i === 0 ? 'h2' : 'h3'"
              class="mt-1 text-3xl xl:text-5xl font-black"
            >
              {{ slide.title }}
            </Component>
            <p v-if="slide.subtitle" class="text-lg mt-4 md:mt-6">
              {{ slide.subtitle }}
            </p>
            <a
              v-if="slide.buttonText"
              :href="slide.buttonLink"
              class="not-prose inline-block min-w-[150px] mt-7 md:mt-10
              bg-white text-primary text-lg font-bold px-6 py-2.5 rounded
              hover:bg-primary-100 active:ring-3 ring-white/30"
            >
              {{ slide.buttonText }}
            </a>
          </div>
        </div>
      </li>
      <template #controls>
        <div
          v-show="parsedSlides.length > 1"
          class="absolute z-10 bottom-5 flex justify-end items-center
          w-screen xl:max-w-screen-xl xl:left-1/2 -ms-[640px]"
        >
          <div class="relative w-20 h-10 rounded-full
            bg-white/50 text-primary shadow-sm ring-1 ring-black/5">
            <CarouselControl
              :direction="-1"
              class="w-10 h-10 rounded-full hover:bg-primary/10"
            />
            <CarouselControl class="w-10 h-10 rounded-full hover:bg-primary/10" />
          </div>
        </div>
      </template>
    </Carousel>
  </section>
</template>

<script setup lang="ts">
import useHeroSlider from '@@sf/composables/use-hero-slider';
import Carousel from '@@sf/components/Carousel.vue';
import CarouselControl from '@@sf/components/CarouselControl.vue';

export interface Props {
  autoplay?: number;
  slides: Array<{
    img?: string;
    alt?: string;
    mobileImg?: string;
    href?: string;
    title?: string;
    subtitle?: string;
    buttonLink?: string;
    buttonText?: string;
  }>;
}

const props = defineProps<Props>();
const { parsedSlides } = useHeroSlider(props);
</script>
