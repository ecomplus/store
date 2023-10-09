<template>
  <div class="-mx-4 flex w-screen gap-3 sm:mx-0 sm:w-full md:h-[525px] 2xl:gap-5">
    <Carousel
      v-if="pictures.length > 1"
      axis="y"
      class="group hidden w-[300px] shrink-0 md:block"
    >
      <li
        v-for="i in Math.ceil(pictures.length / 2)"
        :key="i"
        class="grid h-1/3 w-full grid-cols-2 gap-3 px-1 pb-3"
        :class="i === 1 && 'pt-1'"
      >
        <template
          v-for="index in [1, 2].map(ii => (i - 1) * 2 + (ii - 1))"
          :key="`${i}-${index}`"
        >
          <button
            v-if="index < pictures.length"
            class="bg-secondary-100 h-full rounded"
            @click="activeIndex = index"
          >
            <AImg
              :picture="pictures[index]"
              class="ring-secondary/10 h-full w-full rounded border-2
              object-cover opacity-90 transition-colors"
              :class="index === activeIndex
                ? 'border-secondary/50 ring-4 cursor-auto'
                : 'border-transparent hover:border-primary'
                  + ' hover:ring-4 hover:ring-primary/20'"
            />
          </button>
        </template>
      </li>
      <template #controls>
        <span>
          <CarouselControl
            v-if="pictures.length > 6"
            class="hover:bg-primary-300/60 text-primary
            !bottom-3 !left-1/2 -ml-5 h-10 w-10
            rounded-full bg-white/60 text-xl
            opacity-0 shadow-sm ring-1 ring-black/5
            group-hover:opacity-90"
          />
        </span>
      </template>
    </Carousel>
    <div class="relative mx-auto aspect-square h-full grow
    md:aspect-auto lg:aspect-square">
      <Carousel
        as="div"
        v-model:index="activeIndex"
        class="text-base-600 [&_i]:i-arrow-right
        h-full w-full [&>*]:h-full [&_i]:mx-2 [&_i]:text-2xl"
        :class="isLoadingLightbox && 'opacity-80'"
        :id="psId"
      >
        <ALink
          v-for="(picture, i) in pictures"
          :key="`big-${i}`"
          :href="picture.zoom?.size && picture.zoom.url"
          :data-pswp-width="getImgSizes(picture.zoom || '').width"
          :data-pswp-height="getImgSizes(picture.zoom || '').height"
          target="_blank"
          rel="noreferrer"
          class="shrink-0 basis-full rounded"
          :class="picture.zoom?.size && 'cursor-zoom-in'"
          v-once
          @click.prevent="() => picture.zoom?.size && zoom(i)"
        >
          <AImg
            :picture="picture"
            preferred-size="big"
            class="h-full w-full object-cover"
            :fetchpriority="i === 0 ? 'high' : 'low'"
            :loading="i === 0 ? 'eager' : 'lazy'"
          />
        </ALink>
      </Carousel>
      <i
        v-if="isLoadingLightbox"
        class="i-arrow-path bg-base-200 absolute
        left-1/2 top-1/2 -ml-7 -mt-7 h-14 w-14 animate-spin"
        :aria-label="$t.i19loading"
      ></i>
      <ul
        v-if="pictures.length > 1"
        class="mt-2 flex justify-center gap-1.5 md:hidden"
      >
        <li v-for="i in pictures.length" :key="`d-${i}`">
          <button
            class="bg-base-700 block h-1.5 w-3 rounded-full"
            :class="activeIndex !== i - 1 && 'opacity-40'"
            :aria-label="`${$t.i19picture} ${i}`"
            @click="activeIndex = i - 1"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Products } from '@cloudcommerce/api/types';
import { imgSizes as getImgSizes } from '@ecomplus/utils';
import { useId } from '@@sf/sf-lib';
import Carousel from '@@sf/components/Carousel.vue';
import CarouselControl from '@@sf/components/CarouselControl.vue';

export interface Props {
  pictures: Exclude<Products['pictures'], undefined>;
}

defineProps<Props>();
const activeIndex = ref(0);
const psId = ref('');
let lightbox: any;
const isLoadingLightbox = ref(false);
const zoom = (index: number) => {
  psId.value = `ps-${useId()}`;
  if (!lightbox && !isLoadingLightbox.value) {
    isLoadingLightbox.value = true;
    Promise.all([
      // @ts-ignore
      import('photoswipe/lightbox'),
      import('photoswipe'),
      import('photoswipe/style.css'),
    ]).then(([{ default: PhotoSwipeLightbox }, { default: pswpModule }]) => {
      lightbox = new PhotoSwipeLightbox({
        gallery: `#${psId.value} > div`,
        children: 'a',
        pswpModule,
        showAnimationDuration: 300,
        hideAnimationDuration: 300,
      });
      lightbox.init();
      lightbox.loadAndOpen(index);
      isLoadingLightbox.value = false;
    });
  }
};
</script>
