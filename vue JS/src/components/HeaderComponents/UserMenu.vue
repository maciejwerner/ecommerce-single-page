<template>
  <nav class="nav__cart">
    <div class="user__cart">
      <a
        @click="toggleCart"
        href="#"
        class="cart__link"
        aria-label="Go to cart with added items"
        data-attribute="cartLink"
      >
        <svg
          width="22"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          class="cart__icon"
        >
          <path
            d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
            fill="#69707D"
            fill-rule="nonzero"
          />
        </svg>
        <span class="cart__indicator" v-if="getProductAmount">
          {{ getProductAmount }}
        </span>
      </a>
    </div>
    <div class="user__cart">
      <a href="#" class="avatar__link" aria-label="Go to user profile">
        <img
          :src="require(`@/assets/images/image-avatar.png`)"
          class="user__avatar"
          alt="avatar"
          aria-hidden="true"
        />
      </a>
    </div>
    <Cart :showCart="showCart" :getProductsCart="getProductsCart" />
  </nav>
</template>

<script>
import Cart from '../Cart.vue';

export default {
  name: 'UserMenu',
  components: {
    Cart,
  },
  props: {
    getProductAmount: {
      type: Number,
      default: 0,
    },
    getProductsCart: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      showCart: false,
    };
  },
  methods: {
    toggleCart() {
      this.showCart = !this.showCart;
    },
  },
};
</script>

<style lang="scss" scoped>
.nav__cart {
  margin-left: auto;
  @include flex(row, center, null);

  .user__cart {
    position: relative;
  }

  .cart__link {
    display: flex;
  }

  .cart__icon {
    transition: 300ms ease-in-out;
  }

  .cart__link:hover .cart__icon path,
  .cart__link:hover .cart__icon use,
  .cart__link:focus .cart__icon path,
  .cart__link:focus .cart__icon use {
    fill: $Black;
  }

  .cart__indicator {
    position: absolute;
    top: -10px;
    right: -10px;
    background: $Orange;
    padding: 0px 6px;
    border-radius: 50%;
    color: $White;
    font-size: var(--small-font-size);
  }

  .avatar__link {
    border-radius: 50%;
  }

  .user__avatar {
    transition: 250ms ease-in-out;
  }

  .user__avatar:hover,
  .user__avatar:focus-within {
    box-shadow: 0px 0px 1px 2px $Orange;
  }

  .user__avatar {
    border-radius: 50%;
  }
}

@include media-between-mobile-xs-and-media-tablet-lg {
  .nav__cart {
    gap: 1.45rem;
  }

  .user__avatar {
    $size: 35px;
    width: $size;
    height: $size;
  }
}

@include media-tablet-lg {
  .nav__cart {
    gap: 2rem;
  }

  .user__avatar {
    $size: 45px;
    width: $size;
    height: $size;
  }
}
</style>
