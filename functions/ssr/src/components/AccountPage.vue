<template>
  <article class="flex min-h-screen w-full flex-col
    justify-center bg-gradient-to-br from-secondary-700 to-secondary-950">
    <div class="mx-auto p-4">
      <section class="text-center ui-section">
        <a href="/" class="text-base-200 hover:text-white">
          <i class="mr-1 rotate-180 i-arrow-right"></i>
          {{ $t.i19goToStore }}
        </a>
      </section>
      <section class="overflow-hidden rounded-md
        shadow-md ring-4 ring-black/10">
        <LoginForm>
          <template #head>
            <div class="mb-5 text-center">
              <a href="/" class="inline-block">
                <slot name="logo" />
              </a>
            </div>
          </template>
        </LoginForm>
      </section>
      <nav v-if="$settings.serviceLinks?.length" class="px-0 ui-section">
        <ul class="mx-auto flex max-w-sm flex-wrap items-center
          justify-evenly gap-4 px-3">
          <li
            v-for="({ title, href }, i) in $settings.serviceLinks"
            :key="`s-${i}`"
          >
            <ALink :href="href" class="text-base-200 ui-link hover:text-white">
              {{ title }}
            </ALink>
          </li>
        </ul>
      </nav>
    </div>
  </article>
</template>

<script setup lang="ts">
import { isLogged } from '@@sf/state/customer-session';
import LoginForm from '~/components/LoginForm.vue';

if (!import.meta.env.SSR) {
  const { location } = window;
  let returnUrl = new URLSearchParams(location.search).get('return_url');
  if (!returnUrl) {
    const url = new URL(location.toString());
    url.pathname = '/app/';
    url.hash = location.hash || '#/account';
    returnUrl = url.toString();
  }
  watch(isLogged, () => {
    if (isLogged.value) {
      location.href = returnUrl;
    }
  }, {
    immediate: true,
  });
}
</script>
