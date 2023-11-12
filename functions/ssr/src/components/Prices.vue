<template>
  <div
    class="text-base-600
      [&>div]:[font-size:90%] [&_small]:lowercase [&_small]:[font-size:92%]"
    :class="isBig ? 'text-lg' : null"
  >
    <span v-if="comparePrice" class="text-base-500 mr-1 text-[87%]">
      <small v-if="isLiteral">
        {{ `${$t.i19from} ` }}
      </small>
      <s>{{ $money(comparePrice) }}</s>
      <small v-if="isLiteral">
        {{ ` ${$t.i19to}` }}
      </small>
    </span>
    <strong
      class="text-base-800"
      :class="isBig ? 'text-4xl block' : 'inline-block'"
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
          <i class="i-arrow-uturn-left mr-1"></i>
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
          {{ ` ${$t.i19interestFree}` }}
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
import {
  type Props as UsePricesProps,
  usePrices,
} from '@@sf/composables/use-prices';

export interface Props extends UsePricesProps {
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
