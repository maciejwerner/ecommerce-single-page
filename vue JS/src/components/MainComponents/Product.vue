<template>
  <h4 class="box__subtitle">{{ item.brand }}</h4>
  <h1 class="box__title">{{ item.name }}</h1>

  <p class="box__text">
    {{ item.description }}
  </p>

  <div class="price__wrapper">
    <h3 class="promo__price">
      <span>${{ item.price }}</span>
      <span class="discount">{{ item.discount }}%</span>
    </h3>
    <h3 class="regular__price">${{ item.price_before_discount }}</h3>
  </div>
</template>

<script>
export default {
  name: 'Product',
  props: {
    item: {
      type: Object,
      default: () => ({
        brand: {
          type: String,
          default: '',
        },
        name: {
          type: String,
          default: '',
        },
        description: {
          type: String,
          default: '',
        },
        price: {
          type: Number,
          default: 0,
        },
        discount: {
          type: Number,
          default: 0,
        },
        price_before_discount: {
          type: Number,
          default: 0,
        },
      }),
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.box__subtitle {
  color: $Orange;
  font-size: var(--small-font-size);
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: $Weight-700;
  margin-bottom: var(--mb-1);
}

.box__title {
  color: $Black;
  font-size: var(--big-font-size);
  font-weight: $Weight-700;
  line-height: 1.1;
  margin-bottom: var(--mb-2);
}

.box__text {
  color: $Dark-grayish-blue;
  font-size: var(--normal-font-size);
  font-weight: $Weight-400;
  line-height: 1.6;
  margin-bottom: var(--mb-1-5);
}

.price__wrapper {
  @include flex(row, center, space-between);
  gap: 7px;
  margin-bottom: var(--mb-1-5);
}

.promo__price {
  @include flex(row, center, null);
  color: $Black;
  font-size: var(--h2-font-size);
  font-weight: $Weight-700;
}

.discount {
  color: $Orange;
  font-size: var(--normal-font-size);
  padding: 3px 7px;
  background-color: $Pale-orange;
  border-radius: 2px;
  margin-left: 0.5rem;
}

.regular__price {
  color: $Grayish-blue;
  font-size: var(--normal-font-size);
  font-weight: $Weight-700;
  text-decoration: line-through;
}

@include media-mobile-sm {
  .box__description {
    padding: 3rem 1.5rem;
  }
}

@include media-mobile-sm-up {
  .box {
    max-width: 460px;
  }

  .box__description {
    padding: 3rem 0;
  }
}

@include media-tablet-lg {
  .price__wrapper {
    @include flex(column, flex-start, null);
  }

  .box__description {
    padding: 0;
  }
}
</style>
