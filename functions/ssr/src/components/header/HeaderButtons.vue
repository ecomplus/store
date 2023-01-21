<script lang="ts" setup>
import {
  i19myAccountAndOrders,
  i19openCart,
} from '@@i18n';
import LoginDrawer, { Props as LoginDrawerProps } from '@@sf/components/LoginDrawer.vue';
import HeaderButtonLink from '~/components/header/HeaderButtonLink.vue';

export interface Props {
  accountUrl?: string;
  cartUrl?: string;
  loginDrawerAdditionalLinks?: LoginDrawerProps['additionalLinks'];
}

withDefaults(defineProps<Props>(), {
  accountUrl: '/app/account',
  cartUrl: '/app/#/cart',
});
</script>

<template>
  <slot name="account">
    <LoginDrawer
      :account-url="accountUrl"
      :additional-links="loginDrawerAdditionalLinks"
    >
      <template #toggle>
        <HeaderButtonLink
          :href="accountUrl"
          :title="i19myAccountAndOrders"
        >
          <div class="i-user-circle"></div>
        </HeaderButtonLink>
      </template>
    </LoginDrawer>
  </slot>
  <slot />
  <slot name="cart">
    <HeaderButtonLink
      :href="cartUrl"
      :title="i19openCart"
    >
      <div class="i-shopping-cart"></div>
    </HeaderButtonLink>
  </slot>
</template>
