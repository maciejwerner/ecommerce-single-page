<template>
  <footer class="footer">
    <div class="container">
      <Author />
    </div>
  </footer>
</template>

<script>
import Author from './FooterComponents/Author.vue';

export default {
  name: 'Footer',
  components: {
    Author,
  },
};
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;

  .container {
    border-top: 1px solid $Grayish-blue;
  }
}
</style>
