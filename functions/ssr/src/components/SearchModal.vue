<template>
  <article class="relative">
    <Fade slide="down">
      <section
        v-if="linkHits.length"
        class="bg-white p-4"
        :class="!isFetching && products.length ? 'lg:rounded-t' : 'lg:rounded'"
      >
        <nav>
          <Carousel :wrapper-key="term" class="px-6 [&>ul]:gap-3">
            <li
              v-for="({ title, href }, i) in linkHits"
              :key="i"
              class="shrink-0"
            >
              <ALink :href="href" class="ui-link">
                {{ title }}
              </ALink>
            </li>
          </Carousel>
        </nav>
      </section>
    </Fade>
    <Skeleton v-if="isFetching" class="absolute top-0 w-full px-5 pt-20" />
    <Fade :is-leave-to="false">
      <ProductShelf
        v-if="!isFetching && products.length"
        :products="products"
        class="m-0 max-w-none bg-white px-4
        lg:[&_[data-carousel-control=next]]:!-right-10
        lg:[&_[data-carousel-control=previous]]:!-left-10"
        :class="linkHits.length ? 'lg:rounded-b' : 'lg:rounded'"
      />
    </Fade>
    <Fade :is-leave-to="false">
      <section
        v-if="!isFetching
          && (searchHistory.length || productCount > products.length)"
        class="bg-base-100/80 grid grid-cols-1 items-center
        gap-4 p-4 backdrop-blur-md
        md:grid-cols-2 md:rounded-b lg:mt-5 lg:grid-cols-3 lg:rounded"
      >
        <div class="flex items-center justify-end gap-4 md:order-2">
          <p v-if="productCount > 1" class="text-base-900 text-sm lowercase">
            <strong>{{ productCount }}</strong> {{ $t.i19itemsFound }}
          </p>
          <a
            v-if="productCount > products.length"
            :href="getSearchUrl(term)"
            class="ui-btn ui-btn-primary w-auto text-center"
          >
            {{ $t.i19seeAll }}
          </a>
        </div>
        <div class="lg:col-span-2">
          <nav>
            <Carousel :wrapper-key="term" class="px-6 [&>ul]:gap-2.5">
              <li
                v-for="(term, i) in searchHistory"
                :key="i"
                class="shrink-0"
              >
                <a
                  :href="getSearchUrl(term)"
                  class="ui-link text-base-700 text-sm font-normal"
                >
                  {{ term }}
                </a>
              </li>
              <template #previous>
                <i class="i-clock m-0" :aria-label="$t.i19searchAgain"></i>
              </template>
            </Carousel>
          </nav>
        </div>
      </section>
    </Fade>
  </article>
</template>

<script setup lang="ts">
import {
  type Props as UseSearchModalProps,
  useSearchModal,
} from '@@sf/composables/use-search-modal';
import { getSearchUrl } from '@@sf/sf-lib';
import ProductShelf from '~/components/ProductShelf.vue';

export interface Props extends UseSearchModalProps {}

const props = defineProps<Props>();
const {
  searchHistory,
  isFetching,
  products,
  productCount,
  linkHits,
} = useSearchModal(props);
</script>
