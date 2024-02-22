<template>
  <div class="max-w-sm">
    <form
      class="group"
      @submit.prevent="() => !isFetching && fetchShippingServices()"
    >
      <label
        :for="zipInputId"
        :class="hasLabel
          ? 'lg:text-sm text-base-700 flex flex-wrap gap-x-5 items-center mb-1.5'
          : 'sr-only'"
      >
        <span>{{ $t.i19calculateShipping }}</span>
        <ALink
          v-if="hasLabel && $settings.countryCode === 'BR'"
          href="https://buscacepinter.correios.com.br/app/endereco/index.php"
          class="ui-link text-base-500 text-xs font-normal"
        >
          Não sei meu CEP
          <i class="i-arrow-top-right-on-square mr-1 opacity-50"></i>
        </ALink>
      </label>
      <div class="relative max-w-52">
        <input
          ref="zipInput"
          :id="zipInputId"
          type="tel"
          :readonly="isFetching"
          v-model.trim="zipCode"
          placeholder="12345-123"
          class="w-full"
          :class="isFetching && 'bg-base-50'"
        />
        <button
          class="hover:text-primary group-focus-within:text-primary absolute inset-y-0 end-0
          grid w-12
          place-content-center text-xl"
          :class="isMounted && !shippingServices.length && zipCode.length > 1
            ? 'text-primary' : `${hasLabel ? 'text-base-400' : 'text-base-600'}`"
          :aria-label="$t.i19calculateShipping"
        >
          <Spinner v-if="isFetching" class="size-5" />
          <i v-else class="i-truck"></i>
        </button>
      </div>
    </form>
    <Fade slide="down">
      <ul
        v-if="!isFetching && shippingServices.length"
        class="divide-base-200 bg-base-50/50 border-base-100 mt-2
        grow divide-y rounded border px-3 py-1"
      >
        <li
          v-for="({ label, shipping_line: shipping }, i) in shippingServices"
          :key="`${zipCode}-${i}`"
          class="text-base-800 py-2.5 md:text-sm"
        >
          <div class="flex flex-wrap items-center">
            <div class="grow">
              <strong class="mr-2 font-semibold">
                {{ getShippingDeadline(shipping) }}
              </strong>
              <span class="mr-2">{{ getShippingPrice(shipping) }}</span>
            </div>
            <small class="text-base-600">{{ label }}</small>
          </div>
          <small v-if="shipping.delivery_instructions" class="text-base-700">
            {{ shipping.delivery_instructions }}
          </small>
        </li>
      </ul>
    </Fade>
  </div>
</template>

<script setup lang="ts">
import {
  type Props as UseShippingCalculatorProps,
  useShippingCalculator,
} from '@@sf/composables/use-shipping-calculator';
import { useId } from '@@sf/sf-lib';
import Spinner from '@@sf/components/Spinner.vue';

export interface Props extends UseShippingCalculatorProps {
  hasLabel?: boolean;
}

const props = defineProps<Props>();
const zipCode = ref('');
const zipInputId = useId('ZipInput');
const {
  isFetching,
  fetchShippingServices,
  shippingServices,
  getShippingDeadline,
  getShippingPrice,
} = useShippingCalculator({ ...props, zipCode });
const isMounted = ref(false);
onMounted(() => { isMounted.value = true; });
</script>
