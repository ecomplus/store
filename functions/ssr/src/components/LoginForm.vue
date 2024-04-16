<template>
  <form
    class="w-full max-w-sm bg-white p-6 text-base text-base-800 md:p-8"
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
      v-if="!isLinkSignIn"
      type="password"
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
