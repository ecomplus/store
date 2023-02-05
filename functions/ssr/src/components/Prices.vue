<template>
  <div
    class="text-base-600"
    :class="isBig ? 'text-lg' : null"
    data-prices
  >
    <span v-if="comparePrice" class="text-base-500 mr-1">
      <small v-if="isLiteral">
        {{ `${$t.i19from} ` }}
      </small>
      <s>{{ $money(comparePrice) }}</s>
      <small v-if="isLiteral">
        {{ ` ${$t.i19to}` }}
      </small>
    </span>
    <strong
      class="inline-block text-base-800"
      :class="isBig ? 'text-5xl block' : null"
    >
      <small v-if="hasVariedPrices">
        {{ `${$t.i19asOf} ` }}
      </small>
      {{ $money(salePrice) }}
    </strong>
    <Fade slide="down">
      <div v-if="cashbackValue && hasCashback" class="relative z-10">
        <span :data-tooltip="$t.i19get$1back
          .replace('$1', $percentage(cashbackPercentage))">
          <i class="i-cashback mr-1"></i>
          <span class="font-medium">
            {{ $money(cashbackValue) }}
          </span>
          <small> cashback</small>
        </span>
      </div>
    </Fade>
    <Fade slide="down">
      <div v-if="installmentValue && hasPriceOptions">
        <small v-if="isLiteral">
          {{ `${$t.i19upTo} ` }}
        </small>
        {{ installmentsNumber }}x
        <small v-if="isLiteral">
          {{ ` ${$t.i19of} ` }}
        </small>
        <span>{{ $money(installmentValue) }}</span>
        <small v-if="!monthlyInterest && isLiteral">
          {{ $t.i19interestFree }}
        </small>
      </div>
    </Fade>
    <Fade slide="down">
      <div v-if="priceWithDiscount < salePrice && hasPriceOptions">
        <small v-if="!discountLabel">
          {{ `${$t.i19asOf} ` }}
        </small>
        <span>{{ $money(priceWithDiscount) }}</span>
        <small v-if="discountLabel">
          {{ ` ${discountLabel}` }}
        </small>
      </div>
    </Fade>
  </div>
</template>

<script setup lang="ts">
import type { Products, ListPaymentsResponse } from '@cloudcommerce/types';
import usePrices from '@@sf/composables/use-prices';

export interface Props {
  product?: Partial<Products> & { price: number, final_price?: number };
  price?: number;
  basePrice?: number;
  isAmountTotal?: boolean;
  installmentsOption?: ListPaymentsResponse['installments_option'];
  discountOption?: ListPaymentsResponse['discount_option'];
  isBig?: boolean;
  isLiteral?: boolean;
  hasCashback?: boolean;
  hasPriceOptions?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  hasCashback: true,
  hasPriceOptions: true,
});
const {
  hasVariedPrices,
  salePrice,
  comparePrice,
  cashbackPercentage,
  cashbackValue,
  installmentsNumber,
  monthlyInterest,
  installmentValue,
  priceWithDiscount,
  discountLabel,
} = usePrices(props);
</script>

<style>
[data-prices] > span {
  font-size: 87%;
}
[data-prices] > div {
  font-size: 90%;
}
[data-prices] small {
  @apply lowercase;
  font-size: 92%;
}
</style>
