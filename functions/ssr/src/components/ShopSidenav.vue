<template>
  <aside class="flex flex-col h-full">
    <nav class="py-4 grow">
      <ul class="relative h-full">
        <ShopSidenavCategory
          v-for="categoryTree in categoryTrees"
          :key="categoryTree._id"
          :category-tree="categoryTree"
        />
      </ul>
    </nav>
    <footer class="text-base">
      <div class="flex items-center px-2 py-4 bg-base-100">
        <AccountLink class="p-2 grow flex items-center gap-3">
          <i class="i-account text-4xl text-base-500 m-0"></i>
          <span class="leading-tight">
            {{ `${$t.i19hello} ${customerName || $t.i19visitor}` }}
            <small class="block lowercase font-semibold text-primary">
              {{ $t.i19myOrders }}, {{ $t.i19myAccount }}
            </small>
          </span>
        </AccountLink>
        <button
          v-if="isLogged"
          @click="logout"
          class="p-2 text-right text-base-800"
        >
          <span class="text-base-600">{{ $t.i19logout }}</span>
          <i class="i-logout text-lg ml-1"></i>
        </button>
      </div>
      <ul class="flex gap-3 p-4 bg-base-200 text-xl text-base-700">
        <li v-for="(href, network) in socialNetworks" :key="network">
          <SocialNetworkLink :network="network" class="p-1 active:text-primary" />
        </li>
      </ul>
    </footer>
  </aside>
</template>

<script setup lang="ts">
import type { CategoryTree } from '@@sf/composables/use-shop-header';
import { onMounted } from 'vue';
import {
  customerName,
  initializeFirebaseAuth,
  isLogged,
  logout,
} from '@@sf/state/customer-session';
import { socialNetworks } from '@@sf/server-data';
import AccountLink from '@@sf/components/AccountLink.vue';
import SocialNetworkLink from '@@sf/components/SocialNetworkLink.vue';
import ShopSidenavCategory from '~/components/ShopSidenavCategory.vue';

export interface Props {
  categoryTrees: CategoryTree[];
}

defineProps<Props>();
onMounted(() => initializeFirebaseAuth());
</script>
