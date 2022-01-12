<template>
  <nav class="nav__menu" :class="{ nav__active: menuOpen }">
    <ul class="menu" v-if="links">
      <li class="menu__item" v-for="link in links" :key="link">
        <a href="#" class="menu__link">{{ link }} </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'NavMenu',
  props: ['menuOpen'],
  data() {
    return {
      links: ['collections', 'men', 'women', 'about', 'contact'],
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

    .nav__menu {
      position: absolute;
      z-index: 50;
      inset: 0;
      left: -45px;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.6);
      transform: translateX(-100%);
      transition: transform 300ms ease-in-out;
    }

    .nav__active {
      transform: translateX(0);
      transition: transform 300ms ease-in-out;
    }

    .menu {
      @include flex(column, null, null);
      gap: 1.25rem;
      min-width: 300px;
      max-width: 330px;
      height: 100vh;
      background: $White;
      padding: 5rem 0 0 50px;

      &__link {
        display: inine-block;
        color: $Black;
        font-size: var(--h3-font-size);
        font-weight: $Weight-700;
        text-transform: capitalize;
        transition: color 300ms ease-in-out;
        will-change: color;

        &:hover,
        &:focus-within {
          color: $Orange;
        }
      }
    }
  }

  @include media-tablet-lg {
    .hamburger {
      display: none;
    }

    .logo {
      margin-left: 0;
    }

    .nav__menu {
      margin-left: 2.5rem;
    }

    .menu {
      @include flex(row, center, null);
      gap: 1.35rem;

      &__item {
        display: inline-block;
      }

      &__link {
        display: block;
        color: $Dark-grayish-blue;
        text-transform: capitalize;
        font-size: var(--normal-font-size);
        font-weight: $Weight-400;
        position: relative;

        @include hover-link-element($Very-vark-blue, $Orange, -2.1rem, 3px);
      }
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

@keyframes itemAnimation {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0%);
  }
}

@keyframes slideOut {
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-100%);
  }
}
</style>
