<template>
  <article class="from-secondary-700 to-secondary-950 flex
    min-h-screen w-full flex-col justify-center bg-gradient-to-br">
    <div class="mx-auto p-4">
      <section class="ui-section text-center">
        <a href="/" class="text-base-200 hover:text-white">
          <i class="i-arrow-right mr-1 rotate-180"></i>
          {{ $t.i19goToStore }}
        </a>
      </section>
      <section class="overflow-hidden rounded-md
        shadow-md ring-4 ring-black/10">
        <LoginForm v-bind="{ loginLinkActionUrl }">
          <template #head>
            <div class="mb-5 text-center">
              <a href="/" class="inline-block">
                <slot name="logo" />
              </a>
            </div>
          </template>
        </LoginForm>
      </section>
      <nav v-if="$settings.serviceLinks?.length" class="ui-section px-0">
        <ul class="mx-auto flex max-w-sm flex-wrap items-center
          justify-evenly gap-4 px-3">
          <li
            v-for="({ title, href }, i) in $settings.serviceLinks"
            :key="`s-${i}`"
          >
            <ALink :href="href" class="ui-link text-base-200 hover:text-white">
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

let loginLinkActionUrl: string | null = null;
if (!import.meta.env.SSR) {
  const { location } = window;
  const returnUrl = new URLSearchParams(location.search).get('return_url');
  if (!returnUrl) {
    const url = new URL(location.toString());
    url.pathname = '/app/';
    url.hash = `#${location.pathname.replace('/app/', '/')}`;
    loginLinkActionUrl = url.toString();
  }
  watch(isLogged, () => {
    if (isLogged.value) {
      location.href = (returnUrl || loginLinkActionUrl) as string;
    }
  }, {
    immediate: true,
  });
}
</script>
