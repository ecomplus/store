<template>
  <header
    ref="header"
    class="relative top-0 z-50 transition-colors"
    :class="[
      isSticky && !isSidenavOpen ? 'bg-white/80' : 'bg-white',
      isSticky ? 'py-2 shadow backdrop-blur-md md:py-3' : 'py-3 sm:py-4 md:py-5',
    ]"
  >
    <div class="mx-auto flex w-screen grid-flow-col
      grid-cols-3 items-center justify-between px-1 sm:pl-2 sm:pr-2.5 md:grid
      lg:w-[calc(100vw-1rem)] lg:auto-cols-max lg:grid-cols-none lg:px-1
      xl:max-w-[82rem] 2xl:max-w-[85rem]">
      <div class="basis-1/4 lg:hidden">
        <button
          class="my-1 px-2"
          :aria-label="$t.i19toggleMenu"
          @click="isSidenavOpen = !isSidenavOpen"
        >
          <i
            class="text-base-500 text-3xl"
            :class="isSidenavOpen ? 'i-close' : 'i-bars-3-bottom-left'"
          ></i>
        </button>
      </div>
      <slot name="logo" />
      <ShopHeaderMenu class="hidden lg:block" v-bind="{ inlineMenuTrees }" />
      <div class="text-base-800 flex
        basis-1/4 items-center justify-end gap-3 px-2 lg:gap-4">
        <button
          :aria-label="$t.i19searchProducts"
          @click="isSearchOpen = !isSearchOpen"
        >
          <i class="i-magnifying-glass hover:text-primary h-7 w-7
            hover:scale-110 active:scale-125"></i>
        </button>
        <AccountMenu class="hidden sm:block">
          <template #button="{ open }">
            <i
              class="i-user-circle hover:text-primary h-7 w-7
              hover:scale-110 active:scale-125"
              :class="open ? 'text-black scale-110' : null"
            ></i>
          </template>
        </AccountMenu>
        <button
          :aria-label="$t.i19openCart"
          @click="isCartOpen = !isCartOpen"
          class="group relative"
        >
          <i class="i-shopping-bag group-hover:text-primary h-7 w-7
            group-hover:scale-110 group-active:scale-125"></i>
          <span
            v-if="delayedTotalItems"
            class="ui-badge-pill-sm absolute -right-1.5 -top-1"
          >
            {{ delayedTotalItems }}
          </span>
        </button>
      </div>
    </div>
    <Drawer
      v-model="isSidenavOpen"
      :has-close-button="false"
      position="absolute"
      :class="isSticky ? 'mt-2 md:mt-3' : 'mt-3 sm:mt-4 md:mt-5'"
      :style="{
        height: `calc(100vh - ${positionY}px + .5rem)`,
        maxHeight: `calc(100dvh - ${positionY}px + .5rem)`,
      }"
    >
      <ShopSidenav class="bg-white pt-6" v-bind="{ categoryTrees }" />
    </Drawer>
    <Drawer
      v-model="isSearchOpen"
      :has-close-button="false"
      placement="top"
    >
      <Suspense>
        <SearchModal v-if="isSearchOpenOnce" />
        <template #fallback>
          <div class="container mx-auto">
            <Skeleton class="p-6" is-large />
          </div>
        </template>
      </Suspense>
    </Drawer>
    <Teleport v-if="isMounted" to="#teleported-overlap">
      <Drawer
        v-model="isCartOpen"
        placement="end"
        backdrop-target="#teleported-overlap"
      >
        <Suspense>
          <CartSidebar v-if="isCartOpenOnce" @close="isCartOpen = false" />
          <template #fallback>
            <Skeleton class="px-6 pt-16" is-bold />
          </template>
        </Suspense>
      </Drawer>
    </Teleport>
  </header>
</template>

<script setup lang="ts">
import {
  ref,
  watch,
  onMounted,
  defineAsyncComponent,
} from 'vue';
import { watchOnce } from '@vueuse/core';
import { totalItems } from '@@sf/state/shopping-cart';
import {
  type Props as UseShopHeaderProps,
  useShopHeader,
} from '@@sf/composables/use-shop-header';
import Drawer from '@@sf/components/Drawer.vue';
import ShopSidenav from '~/components/ShopSidenav.vue';
import ShopHeaderMenu from '~/components/ShopHeaderMenu.vue';
import AccountMenu from '~/components/AccountMenu.vue';

export interface Props extends Omit<UseShopHeaderProps, 'header'> {}

const SearchModal = defineAsyncComponent(() => import('~/components/SearchModal.vue'));
const CartSidebar = defineAsyncComponent(() => import('~/components/CartSidebar.vue'));
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
const isSearchOpenOnce = ref(false);
watchOnce(isSearchOpen, () => {
  isSearchOpenOnce.value = true;
});
const isCartOpen = ref(false);
const isCartOpenOnce = ref(false);
watchOnce(isCartOpen, () => {
  isCartOpenOnce.value = true;
});
const isMounted = ref(false);
const delayedTotalItems = ref(0);
onMounted(() => {
  isMounted.value = true;
  watch(totalItems, (newTotalItems, prevTotalItems) => {
    if (typeof prevTotalItems === 'number') {
      if (prevTotalItems < newTotalItems) {
        isCartOpen.value = true;
      } else if (prevTotalItems && !newTotalItems) {
        isCartOpen.value = false;
      }
    }
    delayedTotalItems.value = newTotalItems;
  }, { immediate: true });
});
</script>
