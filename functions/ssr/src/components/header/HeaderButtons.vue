<script lang="ts" setup>
import {
  i19myAccountAndOrders,
  i19openCart,
} from '@@i18n';
import LoginDrawer, { Props as LoginDrawerProps } from '@@components/LoginDrawer.vue';
import HeaderButtonLink from '@@components/header/HeaderButtonLink.vue';

export interface Props {
  accountUrl?: string;
  cartUrl?: string;
  loginDrawerAdditionalLinks?: LoginDrawerProps['additionalLinks'];
}

defineProps<Props>();
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
          <slot>
            <div class="i-user-circle"></div>
          </slot>
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
      <slot>
        <div class="i-shopping-cart"></div>
      </slot>
    </HeaderButtonLink>
  </slot>
</template>
