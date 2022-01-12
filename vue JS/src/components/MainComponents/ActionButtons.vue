<template>
  <div class="action__wrapper">
    <div class="action__buttons">
      <button
        @click="changeAmount(-1)"
        type="button"
        aria-label="minus amount"
        class="button--amount"
      >
        <img
          :src="require(`@/assets/images/icon-minus.svg`)"
          alt="minus icon"
        />
      </button>

      <span class="item__quantity">
        {{ amount }} / <sup>{{ item.inventory }}</sup></span
      >

      <button
        @click="changeAmount(1)"
        type="button"
        aria-label="plus amount"
        class="button--amount"
      >
        <img :src="require(`@/assets/images/icon-plus.svg`)" alt="plus icon" />
      </button>
    </div>

    <button @click="addToCart(item, amount)" class="button--orange">
      <svg
        width="22"
        height="20"
        xmlns="http://www.w3.org/2000/svg"
        class="cart__icon--add"
      >
        <path
          d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
          fill="#fff"
          fill-rule="nonzero"
        />
      </svg>
      <span>Add to cart</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ActionButtons',
  inject: ['addToCart'],
  props: {
    item: {
      type: Object,
      default: () => ({
        id: {
          type: [Number, String],
          default: '',
        },
        inventory: {
          type: Number,
          default: 0,
        },
      }),
      required: true,
    },
  },
  data() {
    return {
      amount: 0,
    };
  },
  methods: {
    changeAmount(val) {
      this.amount += val;

      if (this.amount < 0) return (this.amount = 0);
      if (this.amount > this.item.inventory)
        return (this.amount = this.item.inventory);
    },
  },
};
</script>

<style lang="scss">
.action__wrapper {
  @include flex(row, center, null);
  gap: 1rem;
}

.action__buttons {
  display: grid;
  gap: 0.225rem;
  grid-template-columns: repeat(3, 1fr);
  border-radius: 10px;
  background: $Light-grayish-blue;
}

.item__quantity {
  @include flex(row, center, center);
  color: $Black;
  font-size: var(--normal-font-size);
  font-weight: $Weight-700;
}

.item__quantity,
.button--amount {
  min-height: 3rem;
  min-width: 3rem;
}

.button--amount {
  @include flex(row, center, center);
  transition: background-color 250ms ease-in-out;
  will-change: background-color;

  &:hover,
  &:focus-within {
    background-color: $Pale-orange;
  }
}

.cart__icon--add {
  margin-right: 1rem;
}

@include media-mobile-sm {
  .action__wrapper {
    @include flex(column, null, null);
  }

  .action__buttons {
    width: 100%;
  }
}

@include media-tablet-lg {
  .price__wrapper {
    @include flex(column, flex-start, null);
  }
}
</style>
