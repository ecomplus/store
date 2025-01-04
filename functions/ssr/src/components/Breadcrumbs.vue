<template>
  <section v-if="breadcrumbs.length > 1" class="ui-section-slim">
    <nav
      aria-label="Breadcrumb"
      class="w-full overflow-hidden text-lg md:text-sm"
    >
      <ol class="flex items-center gap-1 text-base-600">
        <li>
          <a href="/" class="hover:text-primary">
            <span class="sr-only">{{ $t.i19home }}</span>
            <i class="i-home"></i>
          </a>
        </li>
        <template v-for="({ name, link }, i) in breadcrumbs" :key="i">
          <template v-if="i + 1 < breadcrumbs.length">
            <li class="text-base-300">
              <i class="i-chevron-right"></i>
            </li>
            <li class="whitespace-nowrap">
              <a :href="link" class="hover:text-primary">{{ name }}</a>
            </li>
          </template>
          <template v-else>
            <li class="hidden text-base-300 lg:block">
              <i class="i-chevron-right"></i>
            </li>
            <li class="hidden truncate lg:block">
              <span class="text-base-500">{{ name }}</span>
            </li>
          </template>
        </template>
      </ol>
    </nav>
  </section>
  <script
    v-if="inlineJSONLd"
    type="application/ld+json"
    v-html="inlineJSONLd"
  ></script>
</template>

<script setup lang="ts">
import {
  type Props as UseBreadcrumbsProps,
  useBreadcrumbs,
} from '@@sf/composables/use-breadcrumbs';

export type Props = UseBreadcrumbsProps & {}
const props = defineProps<Props>();
const { breadcrumbs, inlineJSONLd } = await useBreadcrumbs(props);
</script>
