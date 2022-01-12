<template>
  <div class="modal" @click.self="$emit('close')">
    <button type="button" class="button--modal" @click="$emit('close')">
      <svg
        width="14"
        height="15"
        xmlns="http://www.w3.org/2000/svg"
        class="close__icon"
      >
        <path
          d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
          fill="#69707D"
          fill-rule="evenodd"
        />
      </svg>
    </button>
    <ImagesContainer :isModal="true" />
  </div>
</template>

<script>
import ImagesContainer from './ImagesContainer.vue';

export default {
  name: 'Modal',
  components: {
    ImagesContainer,
  },
  emits: ['close'],
};
</script>

<style lang="scss">
.modal {
  position: fixed;
  z-index: 200;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: grid;
  align-items: start;
  justify-content: center;
}

.button--modal {
  align-self: flex-end;
  justify-self: flex-end;
  padding: 0.35rem;
  margin-bottom: var(--mb-0-5);

  svg path {
    fill: $White;
    transition: 250ms ease-in-out;
  }

  &:hover path,
  &:focus-within path {
    fill: $Orange;
  }
}
</style>
