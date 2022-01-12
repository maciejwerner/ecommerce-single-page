<template>
  <p class="author">
    Challenge by
    <a
      href="https://www.frontendmentor.io/"
      target="_blank"
      rel="nofollow noreferrer"
      class="author__link"
    >
      Frontend Mentor.
    </a>
    Coded by &copy; 2021
    <a href="/" class="author__link" target="_blank" rel="nofollow noreferrer">
      Maciej Werner
    </a>
  </p>
</template>

<script>
export default {
  name: 'Author',
};
</script>

<style lang="scss" scoped>
.author {
  padding: 1rem 0 1rem;
  font-size: var(--smaller-font-size);
  font-weight: $Weight-400;
  color: $Dark-grayish-blue;
  text-align: center;
  overflow-wrap: break-word;

  &__link {
    display: inline-block;
    position: relative;
    color: $Orange;
    margin: 0 4px;
    transition: color 300ms ease-in-out;

    @include hover-link-element($Orange, $Orange, -3px, 1px);
  }
}
</style>
