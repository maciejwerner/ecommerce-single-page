<template>
  <Header
    :getProductAmount="getProductAmount"
    :getProductsCart="getProductsCart"
  />
  <Main :product="product" />
  <Footer />
</template>

<script>
import Header from '@/components/Header.vue';
import Main from '@/components/Main.vue';
import Footer from '@/components/Footer.vue';
import data from './assets/data/data.json';

export default {
  name: 'App',
  components: {
    Header,
    Main,
    Footer,
  },
  data() {
    return {
      product: data,
      productsCart: [],
    };
  },
  provide() {
    return {
      data: this.product,
      addToCart: this.addToCart,
      deleteItem: this.deleteItem,
    };
  },
  computed: {
    getProductAmount() {
      let qty = this.productsCart.reduce(
        (acc, reducer) => acc + reducer.qty,
        0,
      );
      return qty;
    },
    getProductsCart() {
      return this.productsCart;
    },
  },
  methods: {
    addToCart(propsItem, propsQty) {
      if (propsQty === 0) return;

      const isInCart = this.productsCart.find(({ id }) => id === propsItem.id);

      const item = {
        id: propsItem.id,
        qty: propsQty,
        name: propsItem.name,
        price: propsItem.price,
        thumb: propsItem.imgs.thumbnails[0],
      };

      if (!isInCart) {
        this.productsCart = [...this.productsCart, item];
      } else {
        this.productsCart = this.productsCart.map(({ id }) =>
          id === isInCart.id ? item : id,
        );
      }
    },
    deleteItem(itemId) {
      return (this.productsCart = this.productsCart.filter(
        ({ id }) => id !== itemId,
      ));
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/_reset.scss';
@import '@/assets/scss/_root.scss';
@import '@/assets/scss/_styles.scss';
@import '@/assets/scss/_body.scss';
</style>
