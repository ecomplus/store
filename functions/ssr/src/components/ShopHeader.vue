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
            class="text-3xl transition-colors"
            :class="[
              isSidenavOpen ? 'i-close' : 'i-bars-3-bottom-left',
              isMounted ? 'text-base-500' : 'text-base-400 animate-pulse',
            ]"
          ></i>
        </button>
      </div>
      <slot name="logo" />
      <ShopHeaderMenu class="hidden lg:block" v-bind="{ inlineMenuTrees }" />
      <div class="text-base-800 flex
        basis-1/4 items-center justify-end gap-3 px-2 lg:gap-4">
        <form action="/s" method="get" class="relative">
          <label for="HeaderSearch" class="sr-only">
            {{ $t.i19searchProducts }}
          </label>
          <Fade>
            <div
              v-show="isSearchOpen"
              class="absolute -right-0.5 -top-2.5 flex items-stretch"
            >
              <div class="hidden w-12 bg-gradient-to-r from-transparent
                to-white sm:block"></div>
              <input
                ref="searchInput"
                type="search"
                id="HeaderSearch"
                name="q"
                v-model.trim="searchTerm"
                class="to-primary-50 border-primary/20
                border-1 w-72 max-w-md bg-gradient-to-r from-white py-3
                pl-5 pr-12 text-base ring-0 md:w-screen"
                :placeholder="`${$t.i19searchProducts} ...`"
              />
            </div>
          </Fade>
          <button
            type="submit"
            :aria-label="$t.i19searchProducts"
            @click="toggleSearch"
          >
            <i
              class="i-magnifying-glass hover:text-primary h-7 w-7
              hover:scale-110 active:scale-125"
              :class="isSearchOpen && 'text-primary-600 -translate-x-2'"
            ></i>
          </button>
        </form>
        <AccountMenu class="hidden sm:block">
          <template #button="{ open }">
            <i
              class="i-user-circle hover:text-primary h-7 w-7
              hover:scale-110 active:scale-125"
              :class="open ? 'text-black scale-110' : null"
            ></i>
          </template>
        </AccountMenu>
        <a
          :href="$settings.cartUrl || '/app/'"
          :aria-label="$t.i19openCart"
          @click.prevent="isCartOpen = !isCartOpen"
          class="group relative"
          role="button"
        >
          <i class="i-shopping-bag group-hover:text-primary h-7 w-7
            group-hover:scale-110 group-active:scale-125"></i>
          <span
            v-if="cartTotalItems"
            class="ui-badge-pill-sm absolute -right-1.5 -top-1"
          >
            {{ cartTotalItems }}
          </span>
        </a>
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
      <ShopSidenav class="pt-6" v-bind="{ categoryTrees }" />
    </Drawer>
    <Drawer
      v-model="isSearchOpen"
      :is-hidden="!quickSearchTerm"
      :has-close-button="false"
      :anchor-el="searchInput?.parentElement"
      position="absolute"
      placement="top"
      animation="scale"
      max-width="55rem"
      class="bg-transparent lg:mt-12"
      :class="isSticky ? 'mt-2 md:mt-3' : 'mt-3 sm:mt-4 md:mt-5'"
    >
      <Suspense>
        <SearchModal v-if="isSearchOpenOnce" :term="quickSearchTerm" />
        <template #fallback>
          <div class="container mx-auto">
            <Skeleton class="p-6" is-large is-bold />
          </div>
        </template>
      </Suspense>
    </Drawer>
    <Teleport v-if="isMounted" to="#teleported-overlap">
      <Drawer
        v-model="isCartOpen"
        placement="end"
        backdrop-target="#teleported-overlap"
        class="shadow"
      >
        <Suspense>
          <CartSidebar v-if="isCartOpenOnce" @close="isCartOpen = false" />
          <template #fallback>
            <div class="h-full bg-white">
              <Skeleton class="px-6 pt-16" is-bold />
            </div>
          </template>
        </Suspense>
      </Drawer>
    </Teleport>
  </header>
</template>

<script setup lang="ts">
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
const searchInput = ref<HTMLInputElement | null>(null);
const {
  isSticky,
  positionY,
  categoryTrees,
  inlineMenuTrees,
  isSearchOpen,
  isSearchOpenOnce,
  searchTerm,
  quickSearchTerm,
  toggleSearch,
  isCartOpen,
  isCartOpenOnce,
  cartTotalItems,
  handleOnMounted,
} = useShopHeader({ ...props, header, searchInput });
const isSidenavOpen = ref(false);
const isMounted = ref(false);
onMounted(() => {
  isMounted.value = true;
  handleOnMounted();
});
</script>
