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
      <nav v-if="$settings.serviceLinks?.length" class="ui-section">
        <ul class="flex items-center justify-center gap-3">
          <li class="basis-full text-center md:basis-1/2">
            <ALink
              v-for="({ title, href }, i) in $settings.serviceLinks"
              :key="`s-${i}`"
              :href="href"
              class="ui-link text-base-200 hover:text-white"
            >
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

watch(isLogged, () => {
  if (isLogged.value) {
    window.location.href = `/app/#${window.location.pathname.replace('/app/', '/')}`;
  }
}, {
  immediate: true,
});
let loginLinkActionUrl: string | null = null;
if (!import.meta.env.SSR) {
  const url = new URL(window.location.toString());
  url.pathname = '/app/';
  url.hash = `#${window.location.pathname.replace('/app/', '/')}`;
  loginLinkActionUrl = url.toString();
}
</script>
