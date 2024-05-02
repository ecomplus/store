<template>
  <form
    class="w-96 max-w-full bg-white p-6 text-base text-base-800 md:p-8"
    @submit.prevent="() => submitLogin(loginLinkActionUrl)"
  >
    <slot name="head" />
    <p class="mb-4 text-2xl font-light text-base-600">
      {{ $t.i19hello }}
      <span v-if="customerName">{{ customerName }}</span>
      <span v-else class="lowercase">{{ $t.i19visitor }}</span>
    </p>
    <label v-if="isLinkSignIn" for="login-form-email">
      {{ $t.i19sendLoginLinkByEmail }}
    </label>
    <input
      id="login-form-email"
      type="email"
      placeholder="email@mail.com"
      v-model="email"
      class="mb-0.5 mt-2 w-full"
      required
    />
    <input
      v-if="!isSignUp && !isLinkSignIn"
      type="password"
      autocomplete="current-password"
      :placeholder="$t.i19password"
      v-model="password"
      class="mb-0.5 mt-2 w-full lowercase"
      required
    />
    <div class="relative">
      <div
        class="transition-opacity"
        :class="isEmailSentMsg && 'opacity-0 invisible'"
      >
        <a
          v-show="!isSignUp && !isLinkSignInBlocked"
          href="?password"
          class="text-right text-sm lowercase text-base-500 ui-link"
          @click.prevent="isLinkSignIn = !isLinkSignIn"
        >
          {{ isLinkSignIn ? $t.i19enterWithPassword : $t.i19iForgotMyPassword }}
        </a>
        <button
          type="submit"
          :disabled="!isSubmitReady"
          class="mb-2 mt-5 flex w-full
          items-center justify-center gap-3 ui-btn-lg ui-btn-primary"
          :class="!isSubmitReady && 'opacity-50'"
        >
          <Fade slide="left">
            <Spinner v-if="!isSubmitReady" class="size-4" />
          </Fade>
          <span>{{ isSignUp ? $t.i19signUp : $t.i19accessMyAccount }}</span>
        </button>
      </div>
      <Fade speed="slow">
        <p
          v-if="isEmailSentMsg"
          class="absolute left-0 top-0 mt-4 font-medium text-success-800"
        >
          <i class="mr-1 i-check"></i>
          {{ $t.i19emailWasSentMsg }}
        </p>
      </Fade>
      <a
        href="?sign_up"
        class="block w-full text-center ui-btn-lg ui-btn-contrast"
        @click.prevent="isSignUp = !isSignUp"
      >
        {{ isSignUp ? $t.i19accessMyAccount : $t.i19createAnAccount }}
      </a>
      <button
        v-if="hasGoogleSignIn"
        type="button"
        class="mt-4 flex w-full items-center justify-center gap-3
        bg-base-50 font-medium text-base-800 ui-btn-lg
        hover:bg-base-100 hover:text-base-950"
        @click="signInWithGoogle"
      >
        <span class="size-5">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlns:xlink="http://www.w3.org/1999/xlink" style="display: block;"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></svg>
        </span>
        <span>{{ $t.i19signInWith }} Google</span>
      </button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import useLoginForm from '@@sf/composables/use-login-form';
import { customerName } from '@@sf/state/customer-session';
import Spinner from '@@sf/components/Spinner.vue';

export interface Props {
  loginLinkActionUrl?: string | null;
}

defineProps<Props>();
const {
  isLinkSignIn,
  isSignUp,
  email,
  password,
  isSubmitting,
  isSubmitReady,
  submitLogin,
  hasGoogleSignIn,
  signInWithGoogle,
} = useLoginForm();
const isEmailSentMsg = ref(false);
const countEmailsSent = ref(0);
const isLinkSignInBlocked = computed(() => {
  return countEmailsSent.value > 9;
});
watch((isSubmitting), () => {
  if (!isSubmitting.value && isLinkSignIn.value) {
    isEmailSentMsg.value = true;
    countEmailsSent.value += 1;
  }
});
watch([email, isSignUp], () => {
  isEmailSentMsg.value = false;
});
watch(isLinkSignInBlocked, () => {
  isLinkSignIn.value = false;
});
</script>
