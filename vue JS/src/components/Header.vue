<template>
  <header class="header">
    <div class="container">
      <button
        type="button"
        class="hamburger"
        aria-expanded="false"
        aria-controls="menu"
        aria-label="toggle navigation"
        aria-hidden="true"
        @click="menuOpen = !menuOpen"
      >
        <svg
          width="14"
          height="15"
          xmlns="http://www.w3.org/2000/svg"
          v-if="menuOpen"
          class="hamburger__icon"
        >
          <path
            d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
            fill="#69707D"
            fill-rule="evenodd"
          />
        </svg>
        <svg
          width="16"
          height="15"
          xmlns="http://www.w3.org/2000/svg"
          v-else-if="!menuOpen"
          class="hamburger__icon"
        >
          <path
            d="M16 12v3H0v-3h16Zm0-6v3H0V6h16Zm0-6v3H0V0h16Z"
            fill="#69707D"
            fill-rule="evenodd"
          />
        </svg>
      </button>
      <h1 class="logo">
        <a href="#" class="logo__link">
          <img
            :src="require(`@/assets/images/logo.svg`)"
            alt="logo icon"
            class="logo__icon"
          />
        </a>
      </h1>
      <NavMenu :menuOpen="menuOpen" />
      <UserMenu
        :getProductAmount="getProductAmount"
        :getProductsCart="getProductsCart"
      />
    </div>
  </header>
</template>

<script>
import { ref } from 'vue';
import UserMenu from './HeaderComponents/UserMenu.vue';
import NavMenu from './HeaderComponents/NavMenu.vue';

export default {
  name: 'Header',
  components: {
    UserMenu,
    NavMenu,
  },
  props: ['getProductAmount', 'getProductsCart'],
  setup() {
    const menuOpen = ref(false);

    return {
      menuOpen,
    };
  },
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 90px;
  @include flex(row, null, null);

  .container {
    @include flex(row, center, null);
    border-bottom: 1px solid $Grayish-blue;
    position: relative;
  }

  @include media-between-mobile-xs-and-media-tablet-lg {
    .hamburger {
      position: relative;
      z-index: 100;
      @include flex(row, center, center);
      $size: 25px;
      width: $size;
      height: $size;

      &:focus path,
      &:hover path {
        fill: $Black;
        transition: fill 300ms ease-in-out;
      }
    }

    .logo {
      margin-left: 1.5rem;
    }
  }

  @include media-tablet-lg {
    .hamburger {
      display: none;
    }

    .logo {
      margin-left: 0;
    }
  }
}

@include media-mobile-sm {
  .header {
    height: 70px;

    .container {
      border-bottom: none;
    }
  }
}
</style>
