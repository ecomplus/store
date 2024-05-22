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
          class="text-xs font-normal text-base-500 ui-link"
        >
          Não sei meu CEP
          <i class="mr-1 opacity-50 i-arrow-top-right-on-square"></i>
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
          class="absolute inset-y-0
          end-0 grid w-12 place-content-center text-xl
          hover:text-primary group-focus-within:text-primary"
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
        class="mt-2 grow divide-y divide-base-200
        rounded border border-base-100 bg-base-50/50 px-3 py-1"
      >
        <li
          v-for="({ label, shipping_line: shipping }, i) in shippingServices"
          :key="`${zipCode}-${i}`"
          class="py-2.5 text-base-800 md:text-sm"
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
    <Fade slide="down">
      <div v-if="!isFetching && isZipCodeRefused" class="mt-3 text-sm ui-alert">
        {{ $t.i19zipCodeRefusedMsg }}
      </div>
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
  isZipCodeRefused,
  getShippingDeadline,
  getShippingPrice,
} = useShippingCalculator({ ...props, zipCode });
const isMounted = ref(false);
onMounted(() => { isMounted.value = true; });
</script>
