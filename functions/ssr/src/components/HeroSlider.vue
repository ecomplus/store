<template>
  <section class="relative mx-auto mb-9 md:mb-12">
    <Carousel :autoplay="autoplay" class="secondary [&>*]:items-center">
      <li
        v-for="(slide, i) in slides"
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
          v-show="slides.length > 1"
          class="absolute bottom-5 right-5 z-10 flex w-screen items-center justify-end
          xl:left-1/2 xl:right-auto xl:-ms-[640px] xl:max-w-screen-xl"
        >
          <div
            class="text-primary relative h-10 w-20 rounded-full bg-white/50
            shadow-sm ring-1 ring-black/5 transition-opacity"
            :class="isMounted ? 'opacity-100' : 'opacity-20 [&>*]:cursor-wait'"
          >
            <CarouselControl class="hover:bg-primary/10 h-10 w-10 rounded-full" is-prev>
              <i class="i-arrow-right rotate-180"></i>
            </CarouselControl>
            <CarouselControl class="hover:bg-primary/10 h-10 w-10 rounded-full">
              <i class="i-arrow-right"></i>
            </CarouselControl>
          </div>
        </div>
      </template>
    </Carousel>
  </section>
</template>

<script setup lang="ts">
import type { Props as UseBannerProps } from '@@sf/composables/use-banner';
import Banner from '~/components/Banner.vue';

export type Props = {
  autoplay?: number;
  slides: UseBannerProps[];
}

defineProps<Props>();
const isMounted = ref(false);
onMounted(() => {
  isMounted.value = true;
});
</script>
