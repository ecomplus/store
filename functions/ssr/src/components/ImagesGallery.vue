<template>
  <div class="flex h-[525px] gap-2">
    <Carousel
      v-if="pictures.length"
      axis="y"
      class="group hidden w-[300px] md:block"
    >
      <li
        v-for="i in Math.ceil(pictures.length / 2)"
        :key="i"
        class="flex h-1/3 w-full gap-1 pb-1"
      >
        <template
          v-for="index in [1, 2].map(ii => (i - 1) * 2 + (ii - 1))"
          :key="`${i}-${index}`"
        >
          <button
            v-if="index < pictures.length"
            class="h-full w-1/2"
            @click="activeIndex = index"
          >
            <AImg
              :picture="pictures[index]"
              class="hover:border-primary ring-primary/20 ring-b
              h-full w-full rounded-sm border object-cover transition-colors"
              :class="index === activeIndex
                ? 'border-secondary' : 'border-secondary-300 hover:ring-1'"
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
    <div class="relative aspect-square h-full">
      <Carousel
        as="div"
        v-model:index="activeIndex"
        class="text-base-700 h-full [&>*]:h-full [&_i]:text-2xl"
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
          class="shrink-0 basis-full"
          :class="picture.zoom?.size && 'cursor-zoom-in'"
          v-once
          @click.prevent="() => zoom(i)"
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
