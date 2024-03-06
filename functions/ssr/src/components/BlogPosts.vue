<template>
  <article class="mb-9 mt-6 md:mb-12 md:mt-8">
    <section class="ui-section">
      <article
        v-if="featured"
        class="mb-9 flex flex-wrap gap-x-8 lg:flex-nowrap"
      >
        <a :href="`/posts/${featured.slug}`" class="w-full max-w-[600px]">
          <AImg
            v-if="featured.thumbnail"
            :picture="{ url: featured.thumbnail, size: '750x500' }"
            class="aspect-[3/2] w-full max-w-[600px] rounded object-cover"
          />
        </a>
        <div class="grow pt-5 prose">
          <small class="font-semibold uppercase text-base-500">Blog</small>
          <a :href="`/posts/${featured.slug}`" class="not-prose">
            <h1 class="mb-4 mt-2 ui-title">
              {{ featured.title }}
            </h1>
          </a>
          <p class="text-xl" v-html="featured.description"></p>
          <span v-if="featured.date" class="mr-4 text-base-600">
            {{ formatDate(featured.date) }}
          </span>
          <em v-if="featured.author" class="text-base-600">
            --- {{ featured.author }}
          </em>
          <div class="mt-5 not-prose">
            <a
              :href="`/posts/${featured.slug}`"
              class="ui-btn-lg ui-btn-primary"
            >
              <i class="mr-1 i-chevron-right"></i>
              {{ $t.i19seeMore }}
            </a>
          </div>
        </div>
      </article>
      <ul class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="(post, i) in gridPosts" :key="i">
          <article>
            <a :href="`/posts/${post.slug}`">
              <AImg
                v-if="post.thumbnail"
                :picture="{ url: post.thumbnail, size: '750x500' }"
                class="aspect-[3/2] w-full rounded object-cover"
              />
              <div class="px-3 pt-4 text-base-700">
                <h3 class="mb-1 text-xl font-medium text-base-800">
                  {{ post.title }}
                </h3>
                <p v-html="post.description"></p>
                <small v-if="post.date" class="mt-1 block text-base-500">
                  {{ formatDate(post.date) }}
                </small>
              </div>
            </a>
          </article>
        </li>
      </ul>
    </section>
    <section v-if="totalPages > 1" class="ui-section">
      <Pagination
        :page="page"
        :total-pages="totalPages"
        is-url-path
      />
    </section>
  </article>
</template>

<script setup lang="ts">
import { formatDate } from '@ecomplus/utils';
import Pagination from '~/components/Pagination.vue';

export interface Props {
  page: number;
  totalPages: number;
  posts: Array<{
    slug: string;
    title?: string;
    description?: string;
    author?: string;
    thumbnail?: string;
    date?: string;
  }>;
}

const props = defineProps<Props>();
const featured = computed(() => props.posts[0]);
const gridPosts = computed(() => props.posts.slice(1));
</script>
