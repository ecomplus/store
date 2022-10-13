<script lang="ts" setup>
import { toRefs, ImgHTMLAttributes } from 'vue';

export interface Props {
  logo?: ImgHTMLAttributes;
}

const props = defineProps<Props>();
const { logo } = toRefs(props);
</script>

<template>
  <header class="header bg-surface bg-opacity-70 sticky py-1 sm:py-2">
    <div class="container">
      <div class="grid grid-flow-col auto-cols-max justify-between items-center">
        <slot name="aside">
          <div class="header__aside md:hidden">
            <div class="i-bars-3-bottom-left"></div>
          </div>
        </slot>
        <slot name="logo" v-bind="{ logo }">
          <a v-if="logo" href="/">
            <component :is="logo.alt ? 'h1' : 'span'" class="m-0">
              <img v-bind="logo" />
            </component>
          </a>
        </slot>
        <div class="flex items-center">
          <slot name="actions">
            <slot name="nav" />
            <slot name="search" />
            <slot name="buttons" />
          </slot>
        </div>
      </div>
    </div>
  </header>
</template>
