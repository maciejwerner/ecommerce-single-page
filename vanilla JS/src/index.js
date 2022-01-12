'use strict';

const app = (function () {
  // HAMBURGER & MENU
  const navMenuListener = () => {
    const hamburgerButton = document.querySelector(
      '[data-attribute="hamburgerButton"]',
    );
    const hamburgerIcon = document.querySelector(
      '[data-attribute="hamburgerIcon"]',
    );
    const navMenu = document.querySelector('[data-attribute="navMenu"]');
    const menuItems = document.querySelectorAll('.menu__item');

    const toggleNavMenu = () => {
      navMenu.classList.toggle('active');

      if (navMenu.classList.contains('active')) {
        hamburgerIcon.setAttribute('src', './src/images/icon-close.svg');
        hamburgerIcon.setAttribute('alt', 'hamburger icon close');
      }
      if (!navMenu.classList.contains('active')) {
        hamburgerIcon.setAttribute('src', './src/images/icon-menu.svg');
        hamburgerIcon.setAttribute('alt', 'hamburger menu icon');
      }

      menuItems.forEach((item, index) => {
        if (item.style.animation) {
          item.style.animation = '';
        } else {
          item.style.animation = `itemAnimation 0.5s ease forwards ${
            index / 5 + 0.3
          }s`;
        }
      });
    };

    hamburgerButton.addEventListener('click', toggleNavMenu);
  };

  // THUMBS & MAIN IMAGE
  const imagesToggle = () => {
    const mainImage = document.querySelector('[data-attribute="mainImage"]');
    const thumbBoxes = [
      ...document.querySelectorAll('[data-attribute="thumbBox"]'),
    ];
    const prevButton = document.querySelector('[data-attribute="prevBtn"]');
    const nextButton = document.querySelector('[data-attribute="nextBtn"]');

    let currentThumb = 0;

    const removeActiveThumbnail = () => {
      thumbBoxes.forEach((box) => box.classList.remove('thumb__box--active'));
    };

    const toggleMainImage = (slide) => {
      removeActiveThumbnail();

      if (slide >= thumbBoxes.length) slide = 0;
      if (slide < 0) slide = thumbBoxes.length - 1;

      thumbBoxes[slide].classList.toggle('thumb__box--active');

      mainImage.setAttribute(
        'src',
        `./src/images/image-product-${slide + 1}.jpg`,
      );
      mainImage.setAttribute('data-main-image-index', slide);

      currentThumb = slide;
    };

    toggleMainImage(currentThumb);

    thumbBoxes.forEach((box, index) => {
      box.addEventListener('click', () => {
        toggleMainImage(index);
      });
    });

    // LEFT / RIGHT ARROWS
    prevButton.addEventListener('click', () =>
      toggleMainImage(currentThumb - 1),
    );
    nextButton.addEventListener('click', () =>
      toggleMainImage(currentThumb + 1),
    );

    // MODAL
    const modal = document.querySelector('.modal');
    const closeModalButton = document.querySelector(
      '[data-attribute="closeModal"]',
    );

    const modalMainImage = document.querySelector(
      '[data-attribute="mainImageModal"]',
    );
    const modalPrebButton = document.querySelector(
      '[data-attribute="modalPrevBtn"]',
    );
    const modalNextButton = document.querySelector(
      '[data-attribute="modalNextBtn"]',
    );
    const modalThumbs = document.querySelectorAll(
      '[data-attribute="modalThumbBox"]',
    );
    let modalCurrentThumb = 0;

    const openModal = () => {
      modal.classList.add('modal--active');
      const activeImage = parseInt(mainImage.dataset.mainImageIndex, 10);
      modalMainImage.setAttribute(
        'src',
        `./src/images/image-product-${activeImage + 1}.jpg`,
      );

      setActiveModalThumb(activeImage);
      modalCurrentThumb = activeImage;
    };

    const closeModal = (e) => {
      if (
        e.target.classList.contains('modal') ||
        e.target.contains(closeModalButton)
      ) {
        modal.classList.remove('modal--active');
      }
    };

    mainImage.addEventListener('click', openModal);

    closeModalButton.addEventListener('click', (e) => closeModal(e));
    modal.addEventListener('click', (e) => closeModal(e));

    const removeActiveModalThumbnail = () => {
      modalThumbs.forEach((box) => box.classList.remove('thumb__box--active'));
    };

    const setActiveModalThumb = (index) => {
      removeActiveModalThumbnail();
      modalThumbs[index].classList.add('thumb__box--active');

      modalCurrentThumb = index;
    };

    const toggleMainModalImage = (slide) => {
      removeActiveModalThumbnail();

      if (slide >= modalThumbs.length) slide = 0;
      if (slide < 0) slide = modalThumbs.length - 1;

      modalThumbs[slide].classList.toggle('thumb__box--active');

      modalMainImage.setAttribute(
        'src',
        `./src/images/image-product-${slide + 1}.jpg`,
      );

      modalCurrentThumb = slide;
    };

    toggleMainModalImage(modalCurrentThumb);

    modalThumbs.forEach((box, index) => {
      box.addEventListener('click', () => {
        toggleMainModalImage(index);
      });
    });

    // LEFT / RIGHT ARROWS IN mODAL
    modalPrebButton.addEventListener('click', () =>
      toggleMainModalImage(modalCurrentThumb - 1),
    );
    modalNextButton.addEventListener('click', () =>
      toggleMainModalImage(modalCurrentThumb + 1),
    );
  };

  // SHOW & HIDE CART
  const cartListener = () => {
    const cartLink = document.querySelector('[data-attribute="cartLink"]');
    const cart = document.querySelector('[data-attribute="cart"]');

    const toggleCart = () => {
      cart.classList.toggle('cart--active');

      cart.classList.contains('cart--active')
        ? cart.setAttribute('aria-hidden', 'false')
        : cart.setAttribute('aria-hidden', 'true');
    };

    cartLink.addEventListener('click', toggleCart);

    // MINUS & PLUS BUTTONS
    const cartItem = document.querySelector('[data-attribute="cartItem"]');
    const minusButton = document.querySelector(
      '[data-attribute="minusAmount"]',
    );
    const plusButton = document.querySelector('[data-attribute="plusAmount"]');
    const addToCartButton = document.querySelector(
      '[data-attribute="addToCartButton"]',
    );
    const spanPrice = document.querySelector('[data-attribute="itemPrice"]');
    const productPrice = Number(spanPrice.dataset.itemPrice, 10);
    const itemQuanity = document.querySelector(
      '[data-attribute="itemQuantity"]',
    );
    const productName = itemQuanity.dataset.itemName;

    let itemQuanityValue = parseInt(itemQuanity.textContent, 10);
    let itemsArr = [];

    const addToItemsArr = (item) => {
      const isItem = itemsArr.find(({ name }) => name === item.name);

      if (!isItem) itemsArr = [...itemsArr, item];
      else {
        itemsArr = itemsArr.map(({ name }) =>
          name === isItem.name ? item : name,
        );
      }
    };

    const totalPrice = (item) => {
      return item.price * item.qty;
    };

    const showCartItem = () => {
      if (itemQuanityValue < 1) return;

      cartItem.textContent = itemQuanityValue;

      itemQuanityValue >= 1
        ? cartItem.classList.add('cart__items--active')
        : cartItem.classList.remove('cart__items--active');

      cartContent(itemsArr);
    };

    const changeQuantity = (val) => {
      itemQuanityValue += val;
      if (itemQuanityValue <= 0) itemQuanityValue = 0;
      if (itemQuanityValue > 99) return;
      itemQuanity.textContent = itemQuanityValue;

      addToItemsArr({
        name: productName,
        qty: itemQuanityValue,
        price: productPrice,
      });
    };

    minusButton.addEventListener('click', () => changeQuantity(-1));
    plusButton.addEventListener('click', () => changeQuantity(1));

    addToCartButton.addEventListener('click', showCartItem);

    const cartContent = (arr) => {
      const cartDetails = document.querySelector('.cart__details');

      const renderCart = (arr) => {
        if (!arr.length) {
          cartDetails.innerHTML = `
          <h5 class="details__title">Your cart is empty.</h5>
        `;
        }
        if (arr.length) {
          cartDetails.innerHTML = `
          <div class="cart__body">
            ${arr
              .map(
                (item) => `
                <div class="item__container">
                  <img
                    src="./src/images/image-product-1-thumbnail.jpg"
                    alt="product thumbnail"
                  />
    
                  <div class="item__details">
                    <h5 class="detail__title">${item.name}</h5>
                    <p>
                      $<span class="span--gray" data-attribute="itemPrice"
                        >${item.price.toFixed(2)}</span
                      >
                      x
                      <span class="span--gray" data-attribute="itemAmount"
                        >${item.qty}
                      </span>
                      <span class="span--black" data-attribute="itemTotal"
                        >$${totalPrice(item).toFixed(2)}</span
                      >
                    </p>
                  </div>
                <button type="button" data-attribute="deleteItemButton" data-filter="${
                  item.name
                }">
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
                `,
              )
              .join('\n')}
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
              chekcout
            </button>
          </div>
        `;

          const deleteButton = document.querySelector(
            '[data-attribute="deleteItemButton"]',
          );
          const dataFilter = deleteButton.dataset.filter;

          const deleteItem = (item) => {
            itemsArr = itemsArr.filter(({ name }) => name !== item);

            renderCart(itemsArr);
            cartItem.textContent = '';
            itemQuanity.textContent = '0';
            itemQuanityValue = 0;
          };

          deleteButton.addEventListener('click', () => deleteItem(dataFilter));
        }
      };

      renderCart(arr);
    };

    cartContent(itemsArr);
  };

  navMenuListener();
  imagesToggle();
  cartListener();
})();
