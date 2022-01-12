<template>
  <main class="main">
    <section class="section">
      <div class="container__main">
        <ImagesContainer @modalOpen="modalOpened = true" />
        <ProductDescription />
      </div>
    </section>

    <Modal v-show="modalOpened" @close="modalClose" />
  </main>
</template>

<script>
import ImagesContainer from './MainComponents/ImagesContainer.vue';
import ProductDescription from './MainComponents/ProductDescription.vue';
import Modal from './MainComponents/Modal.vue';

export default {
  name: 'Main',
  components: {
    ImagesContainer,
    ProductDescription,
    Modal,
  },
  data() {
    return {
      modalOpened: false,
    };
  },
  methods: {
    modalOpen() {
      this.modalOpened = true;
    },
    modalClose() {
      this.modalOpened = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.container__main {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  gap: 2rem;
}

@include media-mobile-sm-up {
  .container__main {
    width: 90%;
    margin: 0 auto;
    max-width: 1300px;
  }
}

@include media-tablet-lg {
  .container__main {
    @include flex(row, center, center);
    gap: 4rem;
  }
}
</style>
