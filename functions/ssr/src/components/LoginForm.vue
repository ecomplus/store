<template>
  <form
    class="text-base-800 w-full max-w-sm bg-white p-6 text-base md:p-8"
    @submit.prevent="submitLogin"
  >
    <slot name="head" />
    <p class="text-base-600 mb-4 text-2xl font-light">
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
      class="mb-0.5 mt-2 w-full rounded"
      required
    />
    <input
      v-if="!isLinkSignIn"
      type="password"
      :placeholder="$t.i19password"
      v-model="password"
      class="mb-0.5 mt-2 w-full rounded lowercase"
      required
    />
    <a
      v-show="!isSignUp"
      href="?password"
      class="ui-link text-base-500 text-right text-sm lowercase"
      @click.prevent="isLinkSignIn = !isLinkSignIn"
    >
      {{ isLinkSignIn ? $t.i19enterWithPassword : $t.i19iForgotMyPassword }}
    </a>
    <button type="submit" class="ui-btn-lg ui-btn-primary mb-2 mt-5 w-full">
      {{ isSignUp ? $t.i19signUp : $t.i19accessMyAccount }}
    </button>
    <a
      href="?sign_up"
      class="ui-btn-lg ui-btn-contrast block w-full text-center"
      @click.prevent="isSignUp = !isSignUp"
    >
      {{ isSignUp ? $t.i19accessMyAccount : $t.i19createAnAccount }}
    </a>
  </form>
</template>

<script lang="ts" setup>
import useLoginForm from '@@sf/composables/use-login-form';
import { customerName } from '@@sf/state/customer-session';

const {
  isLinkSignIn,
  isSignUp,
  email,
  password,
  submitLogin,
} = useLoginForm();
</script>
