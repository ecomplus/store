<template>
  <Menu
    as="div"
    class="text-base-800 relative text-center text-sm"
    v-slot="{ open }"
  >
    <div v-if="open">
      <span v-once>{{ initializeFirebaseAuth() }}</span>
    </div>
    <AccountLink role="button" @click.prevent>
      <MenuButton class="outline-none" :aria-label="$t.i19myAccount">
        <slot name="button" v-bind="{ open }" />
      </MenuButton>
    </AccountLink>
    <Fade>
      <MenuItems class="divide-base-100 absolute -right-8 mt-2
        w-56 divide-y rounded bg-white shadow
        ring-1 ring-black/5 focus:outline-none">
        <div class="text-base-600 p-3">
          {{ `${$t.i19hello} ${customerName || $t.i19visitor}` }}
          <AccountLink role="button" class="ui-btn-sm ui-btn-primary my-1 block">
            {{ $t.i19accessMyAccount }}
          </AccountLink>
          <AccountLink v-if="!isLogged" is-sign-up class="ui-link block">
            {{ $t.i19createAnAccount }}
          </AccountLink>
        </div>
        <ul class="list-none">
          <MenuItem as="li" v-slot="{ active }">
            <AccountLink
              to="orders"
              class="block p-2"
              :class="active ? 'bg-primary-100 text-primary' : null"
            >
              {{ $t.i19myOrders }}
            </AccountLink>
          </MenuItem>
          <MenuItem as="li" v-slot="{ active }">
            <AccountLink
              to="favorites"
              class="block p-2"
              :class="active ? 'bg-primary-100 text-primary' : null"
            >
              <i class="i-heart mr-1"></i>
              {{ $t.i19myFavorites }}
            </AccountLink>
          </MenuItem>
          <MenuItem
            as="li"
            v-slot="{ active }"
            v-for="({ title, href }, i) in $settings.serviceLinks"
            :key="`s-${i}`"
          >
            <ALink
              :href="href"
              class="block p-2"
              :class="active ? 'bg-primary-100 text-primary' : null"
            >
              {{ title }}
            </ALink>
          </MenuItem>
          <MenuItem as="li">
            <div class="text-base-500 flex justify-center gap-2 p-2 text-base">
              <span v-for="(href, network) in socialNetworks" :key="network">
                <SocialNetworkLink :network="network" class="hover:text-primary p-1" />
              </span>
            </div>
          </MenuItem>
          <MenuItem v-if="isLogged" as="li">
            <button @click="logout" class="text-base-800 p-2 text-right">
              <span class="text-base-600">{{ $t.i19logout }}</span>
              <i class="i-arrow-right-on-rectangle ml-1 text-lg"></i>
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
import { socialNetworks } from '@@sf/sf-lib';
import {
  customerName,
  initializeFirebaseAuth,
  isLogged,
  logout,
} from '@@sf/state/customer-session';
import AccountLink from '@@sf/components/AccountLink.vue';
import SocialNetworkLink from '@@sf/components/SocialNetworkLink.vue';
</script>
