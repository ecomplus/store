<template>
  <article class="flex min-h-screen flex-col justify-end">
    <section class="bg-base-50">
      <div class="flex flex-wrap items-center
        justify-center gap-6 ui-section lg:gap-12">
        <ALink href="/">
          <slot name="logo" />
        </ALink>
        <div class="flex items-center gap-2">
          <i class="m-0 bg-success-400 text-3xl i-shield-check-solid"></i>
          <span class="text-base text-base-600">
            {{ $t.i19safeBuy }}
          </span>
        </div>
      </div>
    </section>
    <section class="grow">
      <article id="storefront-app"></article>
    </section>
    <section class="mt-4 bg-base-50 lg:mt-8">
      <nav class="ui-section-slim">
        <ul class="mt-6 flex flex-wrap justify-center gap-6 lg:gap-8">
          <li
            v-for="({ title, href }, i) in $settings.serviceLinks"
            :key="`s-${i}`"
          >
            <ALink :href="href" target="blank" class="text-base-700 ui-link">
              {{ title }}
              <i class="ml-0.5 bg-base-300 i-arrow-top-right-on-square"></i>
            </ALink>
          </li>
        </ul>
      </nav>
      <FooterStamps :stamps="footerStamps" />
    </section>
  </article>
</template>

<script setup lang="ts">
import FooterStamps from '~/components/FooterStamps.vue';

export interface Props {
  footerStamps: InstanceType<typeof FooterStamps>['$props']['stamps'];
}

defineProps<Props>();
</script>
