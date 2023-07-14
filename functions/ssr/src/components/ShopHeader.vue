<template>
  <header
    ref="header"
    class="relative top-0 z-50 transition-colors"
    :class="[
      isSticky && !isSidenavOpen ? 'bg-white/80' : 'bg-white',
      isSticky ? 'backdrop-blur-md shadow py-2 md:py-3' : 'py-3 sm:py-4 md:py-5',
    ]"
  >
    <div class="container 2xl:max-w-7xl
      mx-auto px-1 lg:pr-3 lg:pl-5 xl:pr-7 xl:pl-9 2xl:pr-0 2xl:pl-2
      flex md:grid grid-flow-col grid-cols-3 lg:grid-cols-none lg:auto-cols-max
      justify-between items-center">
      <div class="basis-1/4 lg:hidden">
        <button
          class="px-2 my-1"
          :aria-label="$t.i19toggleMenu"
          @click="isSidenavOpen = !isSidenavOpen"
        >
          <i
            class="text-base-500 text-3xl"
            :class="isSidenavOpen ? 'i-close' : 'i-menu'"
          ></i>
        </button>
      </div>
      <slot name="logo" />
      <ShopHeaderMenu class="hidden lg:block" v-bind="{ inlineMenuTrees }" />
      <div class="basis-1/4 px-2
        flex justify-end items-center gap-3 lg:gap-4 text-base-800">
        <button
          :aria-label="$t.i19searchProducts"
          @click="isSearchOpen = !isSearchOpen"
        >
          <i class="i-search w-7 h-7
            hover:text-primary hover:scale-110 active:scale-125"></i>
        </button>
        <AccountMenu
          class="hidden sm:block"
          :aria-label="$t.i19myAccount"
          :service-links="serviceLinks"
        >
          <template #button="{ open }">
            <i
              class="i-account w-7 h-7
              hover:text-primary hover:scale-110 active:scale-125"
              :class="open ? 'text-black scale-110' : null"
            ></i>
          </template>
        </AccountMenu>
        <button
          :aria-label="$t.i19openCart"
          @click="isCartOpen = !isCartOpen"
          class="relative group"
        >
          <i class="i-shopping-cart w-7 h-7 group-hover:text-primary
            group-hover:scale-110 group-active:scale-125"></i>
          <span v-if="totalItems" class="ui-badge-sm absolute -top-1 -right-1.5">
            {{ totalItems }}
          </span>
        </button>
      </div>
    </div>
    <Drawer
      v-model="isSidenavOpen"
      :has-close-button="false"
      position="absolute"
      :class="isSticky ? 'mt-2 md:mt-3' : 'mt-3 sm:mt-4 md:mt-5'"
      :style="{ height: `calc(100vh - ${positionY}px + .5rem)` }"
    >
      <ShopSidenav class="bg-white pt-6" v-bind="{ categoryTrees }" />
    </Drawer>
    <Drawer
      v-model="isSearchOpen"
      :has-close-button="false"
      placement="top"
    >
      <SearchModal />
    </Drawer>
    <Teleport v-if="isMounted" to="#teleported-overlap">
      <Drawer
        v-model="isCartOpen"
        placement="end"
        backdrop-target="#teleported-overlap"
      >
        <CartSidebar />
      </Drawer>
    </Teleport>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { totalItems } from '@@sf/state/shopping-cart';
import {
  type Props as UseShopHeaderProps,
  useShopHeader,
} from '@@sf/composables/use-shop-header';
import Drawer from '@@sf/components/Drawer.vue';
import ShopSidenav from '~/components/ShopSidenav.vue';
import ShopHeaderMenu from '~/components/ShopHeaderMenu.vue';
import SearchModal from '~/components/SearchModal.vue';
import AccountMenu from '~/components/AccountMenu.vue';
import CartSidebar from '~/components/CartSidebar.vue';

export interface Props extends Omit<UseShopHeaderProps, 'header'> {
  serviceLinks?: Array<{
    title: string;
    href: string;
  }>;
}

const props = defineProps<Props>();
const header = ref<HTMLElement | null>(null);
const {
  isSticky,
  positionY,
  categoryTrees,
  inlineMenuTrees,
} = useShopHeader({ ...props, header });
const isSidenavOpen = ref(false);
const isSearchOpen = ref(false);
const isCartOpen = ref(false);
const isMounted = ref(false);
onMounted(() => {
  isMounted.value = true;
});
</script>
