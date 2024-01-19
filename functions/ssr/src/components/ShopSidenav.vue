<template>
  <aside class="flex h-full flex-col bg-white">
    <nav class="grow py-4">
      <ul class="relative h-full">
        <ShopSidenavCategory
          v-for="(categoryTree, i) in categoryTrees"
          :key="i"
          :category-tree="categoryTree"
        />
      </ul>
    </nav>
    <footer class="text-base">
      <div class="bg-base-100 flex items-center px-2 py-4">
        <AccountLink class="flex grow items-center gap-3 p-2">
          <i class="text-base-500 i-user-circle m-0 text-4xl"></i>
          <span class="leading-tight">
            {{ `${$t.i19hello} ${customerName || $t.i19visitor}` }}
            <small class="text-primary block font-semibold lowercase">
              {{ $t.i19myOrders }}, {{ $t.i19myAccount }}
            </small>
          </span>
        </AccountLink>
        <button
          v-if="isLogged"
          @click="logout"
          class="text-base-800 p-2 text-right"
        >
          <span class="text-base-600">{{ $t.i19logout }}</span>
          <i class="i-arrow-right-on-rectangle ml-1 text-lg"></i>
        </button>
      </div>
      <ul class="bg-base-200 text-base-700 flex gap-3 p-4 text-xl">
        <li v-for="(href, network) in socialNetworks" :key="network">
          <SocialNetworkLink
            :network="network"
            class="active:text-primary p-1"
          />
        </li>
      </ul>
    </footer>
  </aside>
</template>

<script setup lang="ts">
import type { CategoryTree } from '@@sf/composables/use-shop-header';
import {
  customerName,
  initializeFirebaseAuth,
  isLogged,
  logout,
} from '@@sf/state/customer-session';
import { socialNetworks } from '@@sf/sf-lib';
import AccountLink from '@@sf/components/AccountLink.vue';
import SocialNetworkLink from '@@sf/components/SocialNetworkLink.vue';
import ShopSidenavCategory from '~/components/ShopSidenavCategory.vue';

export interface Props {
  categoryTrees: CategoryTree[];
}

defineProps<Props>();
onMounted(() => initializeFirebaseAuth());
</script>
