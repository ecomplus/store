<template>
  <Menu
    as="div"
    class="relative text-center text-sm text-base-800"
    v-slot="{ open }"
  >
    <div v-if="open">
      <span v-once>{{ initializeFirebaseAuth() }}</span>
    </div>
    <AccountLink role="button" @click.prevent>
      <MenuButton
        id="AccountBtn"
        class="outline-none"
        :aria-label="$t.i19myAccount"
      >
        <slot name="button" v-bind="{ open }" />
      </MenuButton>
    </AccountLink>
    <Fade>
      <MenuItems class="absolute -right-8 mt-2 w-56
        divide-y divide-base-100 rounded bg-white shadow
        ring-1 ring-black/5 focus:outline-none">
        <div class="p-3 text-base-600">
          {{ `${$t.i19hello} ${customerName || $t.i19visitor}` }}
          <AccountLink role="button" class="my-1 block ui-btn-sm ui-btn-primary">
            {{ isLogged ? $t.i19myAccount : $t.i19accessMyAccount }}
          </AccountLink>
          <AccountLink v-if="!isLogged" is-sign-up class="block ui-link">
            {{ $t.i19createAnAccount }}
          </AccountLink>
        </div>
        <ul class="list-none">
          <MenuItem v-if="isLogged" as="li" v-slot="{ active }">
            <AccountLink
              to="orders"
              class="block p-2"
              :class="active ? 'bg-primary-100 text-primary' : null"
            >
              {{ $t.i19myOrders }}
            </AccountLink>
          </MenuItem>
          <MenuItem v-if="isLogged" as="li" v-slot="{ active }">
            <AccountLink
              to="favorites"
              class="block p-2"
              :class="active ? 'bg-primary-100 text-primary' : null"
            >
              <i class="mr-1 i-heart"></i>
              {{ $t.i19myFavorites }}
            </AccountLink>
          </MenuItem>
          <MenuItem
            v-for="({ title, href }, i) in $settings.serviceLinks"
            :key="`s-${i}`"
            as="li"
            v-slot="{ active }"
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
            <div class="flex justify-center gap-2 p-2 text-base text-base-500">
              <span v-for="(href, network) in socialNetworks" :key="network">
                <SocialNetworkLink
                  :network="network"
                  class="p-1 hover:text-primary"
                />
              </span>
            </div>
          </MenuItem>
          <MenuItem v-if="isLogged" as="li">
            <button
              @click="logout"
              class="p-2 text-right text-base-400 hover:text-danger-800"
            >
              <span class="text-danger-800">{{ $t.i19logout }}</span>
              <i class="ml-1 text-lg i-arrow-right-on-rectangle"></i>
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
