<template>
  <transition name="cart" mode="out-in">
    <div v-if="showCart" class="cart" :class="{ cart__active: showCart }">
      <div class="cart__header">
        <h4 class="cart__title">cart</h4>
      </div>
      <div class="cart__details">
        <div class="cart__body-wrapper" v-if="getProductsCart.length > 0">
          <div class="cart__body">
            <div
              class="item__container"
              v-for="item in getProductsCart"
              :key="item.id"
            >
              <img
                :src="require(`@/assets/images/${item.thumb}`)"
                alt="product thumbnail"
              />
              <div class="item__details">
                <h5 class="detail__title">{{ item.name }}</h5>
                <p>
                  <span class="span--gray">${{ item.price }}</span>
                  x
                  <span class="span--gray">{{ item.qty }} </span>
                  <span class="span--black" style="margin-left: 6px"
                    >${{ item.price * item.qty }}</span
                  >
                </p>
              </div>
              <button
                type="button"
                @click="deleteItem(item.id)"
                data-attribute="deleteItemButton"
              >
                <svg
                  width="14"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  class="delete__icon"
                >
                  <defs>
                    <path
                      d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z"
                      id="a"
                    />
                  </defs>
                  <use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a" />
                </svg>
              </button>
            </div>
          </div>
          <div class="cart__footer">
            <button
              type="button"
              class="button__checkout button--orange"
              data-attribute="checkoutButton"
              data-role="checkout"
              aria-label="checkout button"
            >
              checkout
            </button>
          </div>
        </div>
        <h5 class="details__title" v-else-if="getProductsCart.length === 0">
          Your cart is empty.
        </h5>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Cart',
  props: {
    showCart: {
      type: Boolean,
      default: false,
      required: true,
    },
    getProductsCart: {
      type: Array,
      required: true,
    },
  },
  inject: ['deleteItem'],
};
</script>

<style lang="scss" scoped>
// enter
.cart-enter-from {
  opacity: 0;
  transform: translateY(35px);
}
.cart-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.cart-enter-active {
  transition: all 300ms ease;
}

// leave
.cart-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.cart-leave-to {
  opacity: 0;
  transform: translateY(35px);
}
.cart-leave-active {
  transition: all 300ms ease;
}

// CART
.cart {
  position: absolute;
  z-index: 90;
  background-color: $White;
  width: 340px;
  border-radius: 0.5rem;
  box-shadow: 0px 3px 6px 0px $Grayish-blue;
  top: 3.5rem;
  right: 0;

  .cart__header,
  .cart__body,
  .cart__footer {
    padding: 0.8rem;
  }

  .cart__header {
    border-bottom: 1px solid $Grayish-blue;
  }

  .cart__details {
    min-height: 12rem;
    display: grid;
    align-content: center;
  }

  .details__title {
    text-align: center;
    color: $Dark-grayish-blue;
    font-size: var(--normal-font-size);
    font-weight: $Weight-700;
  }

  .cart__title {
    color: $Black;
    font-size: var(--normal-font-size);
    font-weight: $Weight-700;
    text-transform: capitalize;
  }

  .delete__icon {
    transition: 250ms ease-in-out;
  }

  .delete__icon:hover use,
  .delete__icon:focus-within use {
    fill: $Black;
  }

  .item__container {
    display: grid;
    gap: 0.85rem;
    grid-template-columns: auto 1fr auto;

    img {
      border-radius: 5px;
      $size: 55px;
      height: $size;
      width: $size;
    }

    .item__details {
      color: $Dark-grayish-blue;
      font-size: var(--normal-font-size);
      font-weight: $Weight-400;
    }

    .detail__title {
      font-weight: $Weight-400;
      margin-bottom: var(--mb-0-5);
    }

    .span--black {
      font-weight: $Weight-700;
    }
  }
}

.cart__active {
  @include show-content;
}
</style>
