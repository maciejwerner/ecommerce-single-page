<template>
  <div class="box box__description" v-for="item in data" :key="item.id">
    <Product :item="item" />
    <ActionButtons :item="item" />
  </div>
</template>

<script>
import Product from './Product.vue';
import ActionButtons from './ActionButtons.vue';

export default {
  name: 'ProductDescription',
  inject: ['data'],
  components: {
    Product,
    ActionButtons,
  },
};
</script>

<style lang="scss" scoped>
.box__description {
  padding: 2.5rem;
}

@include media-mobile-sm-up {
  .box__description {
    padding: 0;
  }
}
</style>
