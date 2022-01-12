<template>
  <div class="box box__images" :class="{ 'box__images-active': isModal }">
    <div class="image__container">
      <img
        :src="require(`@/assets/images/${images[active]}`)"
        class="main__image"
        alt="product image"
        @click="$emit('modalOpen')"
      />
      <button
        @click="changeSlide(-1)"
        type="button"
        class="button__control button__control-prev"
        aria-label="previous button"
      >
        <svg
          width="12"
          height="18"
          xmlns="http://www.w3.org/2000/svg"
          class="arrow__icon"
        >
          <path
            d="M11 1 3 9l8 8"
            stroke="#1D2026"
            stroke-width="3"
            fill="none"
            fill-rule="evenodd"
          />
        </svg>
      </button>
      <button
        @click="changeSlide(1)"
        type="button"
        class="button__control button__control-next"
        aria-label="next button"
      >
        <svg
          width="13"
          height="18"
          xmlns="http://www.w3.org/2000/svg"
          class="arrow__icon"
        >
          <path
            d="m2 1 8 8-8 8"
            stroke="#1D2026"
            stroke-width="3"
            fill="none"
            fill-rule="evenodd"
          />
        </svg>
      </button>
    </div>
    <div class="thumbs__wrapper">
      <ul class="thumb__list" v-if="thumbs">
        <li class="thumb__item" v-for="(thumb, index) in thumbs" :key="index">
          <section
            class="thumb__box"
            @click="active = index"
            :class="{ 'thumb__box-active': active === index }"
          >
            <img
              :src="require(`@/assets/images/${thumb}`)"
              class="thumb__image"
              :alt="`shoe thumbnail ${index}`"
            />
          </section>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'ImagesContainer',
  props: {
    isModal: {
      type: Boolean,
      default: false,
    },
  },
  components: {},
  setup() {
    const images = [
      'image-product-1.jpg',
      'image-product-2.jpg',
      'image-product-3.jpg',
      'image-product-4.jpg',
    ];
    const thumbs = [
      'image-product-1-thumbnail.jpg',
      'image-product-2-thumbnail.jpg',
      'image-product-3-thumbnail.jpg',
      'image-product-4-thumbnail.jpg',
    ];
    let active = ref(0);

    const changeSlide = (val) => {
      active.value += val;

      if (active.value >= thumbs.length) active.value = 0;
      if (active.value < 0) active.value = thumbs.length - 1;
    };

    return {
      active,
      images,
      thumbs,
      changeSlide,
    };
  },
};
</script>

<style lang="scss">
.image__container {
  position: relative;
}

.main__image {
  cursor: pointer;
}

.button__control {
  @include flex(row, center, center);
  $size: 40px;
  width: $size;
  height: $size;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: $White;
  border-radius: 50%;
  cursor: pointer;
  transition: all 300ms ease-in-out;
  display: none;

  &-prev {
    left: 2rem;
  }

  &-next {
    right: 0rem;
  }
}

.modal .button__control {
  display: flex;
  &-prev {
    left: 0px;
  }

  &-next {
    right: -40px;
  }
}

.arrow__icon {
  transition: fill 250ms ease-in-out;
}

.button__control-prev:hover .arrow__icon path,
.button__control-prev:focus-within .arrow__icon path,
.button__control-next:hover .arrow__icon path,
.button__control-next:focus-within .arrow__icon path {
  fill: none;
  stroke: $Orange;
}

.thumb__wrapper {
  width: 100%;
}

.thumb__list {
  width: 100%;
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(4, 1fr);

  &--modal {
    padding: 0 1rem;
  }
}

.thumb__box {
  position: relative;
  z-index: 10;
  cursor: pointer;
  border-radius: 8px;

  transition: 300ms ease-in-out;

  &::before {
    content: '';
    position: absolute;
    z-index: 1;
    inset: 0;
    border-radius: 8px;
    transition: background-color 300ms ease-in-out;
  }

  &:hover::before {
    background-color: rgba(255, 255, 255, 0.5);
  }
}

.thumb__box-active {
  box-shadow: 0px 0px 1px 2px $Orange;

  &::before {
    background-color: rgba(255, 255, 255, 0.5);
  }
}

.thumb__image {
  border-radius: 8px;
}

.box__images-active {
  position: relative;
  z-index: 150;
}

@include media-mobile-sm {
  .button__control {
    display: flex;
  }

  .thumbs__wrapper {
    display: none;
  }
}

@include media-mobile-sm-up {
  .box {
    max-width: 460px;
  }

  .box__images {
    display: grid;
    gap: 2rem;
  }

  .main__image {
    border-radius: 1rem;
  }
}

@include media-between-mobile-xs-and-media-tablet-md {
  .main__image {
    pointer-events: none;
  }
}
</style>
