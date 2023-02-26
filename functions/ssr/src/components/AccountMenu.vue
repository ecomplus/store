<template>
  <Menu
    as="div"
    class="relative text-center text-sm text-base-800"
    v-slot="{ open }"
  >
    <div v-if="open">
      <span v-once>{{ initializeFirebaseAuth() }}</span>
    </div>
    <MenuButton class="outline-none">
      <slot name="button" v-bind="{ open }" />
    </MenuButton>
    <Fade>
      <MenuItems class="absolute -right-8 mt-2 w-56
        rounded-md shadow ring-1 ring-black ring-opacity-5 bg-white
        divide-y divide-base-100 focus:outline-none">
        <div class="p-3 text-base-600">
          {{ `${$t.i19hello} ${customerName || $t.i19visitor}` }}
          <AccountLink class="block py-1.5 rounded primary hover:primary-bold my-1">
            {{ $t.i19accessMyAccount }}
          </AccountLink>
          <AccountLink
            v-if="!isLogged"
            class="block font-medium text-primary hover:text-primary-bold"
            is-sign-up
          >
            {{ $t.i19createAnAccount }}
          </AccountLink>
        </div>
        <ul class="list-none">
          <MenuItem as="li" v-slot="{ active }">
            <AccountLink
              to="orders"
              class="block p-2"
              :class="active ? 'bg-base-100 text-primary' : null"
            >
              {{ $t.i19myOrders }}
            </AccountLink>
          </MenuItem>
          <MenuItem as="li" v-slot="{ active }">
            <AccountLink
              to="favorites"
              class="block p-2"
              :class="active ? 'bg-base-100 text-primary' : null"
            >
              <i class="i-favorites mr-1"></i>
              {{ $t.i19myFavorites }}
            </AccountLink>
          </MenuItem>
          <MenuItem
            as="li"
            v-slot="{ active }"
            v-for="({ title, href }, i) in serviceLinks"
            :key="`s-${i}`"
          >
            <ALink
              :href="href"
              class="block p-2"
              :class="active ? 'bg-base-100 text-primary' : null"
            >
              {{ title }}
            </ALink>
          </MenuItem>
          <MenuItem as="li">
            <div class="flex justify-center gap-2 p-2 text-base-500 text-base">
              <span v-for="(href, network) in socialNetworks" :key="network">
                <SocialNetworkLink :network="network" class="p-1 hover:text-primary" />
              </span>
            </div>
          </MenuItem>
          <MenuItem v-if="isLogged" as="li">
            <button @click="logout" class="p-2 text-right text-base-800">
              <span class="text-base-600">{{ $t.i19logout }}</span>
              <i class="i-logout text-lg ml-1"></i>
            </button>
          </MenuItem>
        </ul>
      </MenuItems>
    </Fade>
  </Menu>
</template>

<script setup lang="ts">
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
} from '@headlessui/vue';
import { socialNetworks } from '@@sf/server-data';
import {
  customerName,
  initializeFirebaseAuth,
  isLogged,
  logout,
} from '@@sf/state/customer-session';
import AccountLink from '@@sf/components/AccountLink.vue';
import SocialNetworkLink from '@@sf/components/SocialNetworkLink.vue';

export interface Props {
  serviceLinks?: Array<{
    title: string;
    href: string;
  }>;
}

defineProps<Props>();
</script>
