$(".AddToCart").click(function (e) {
  e.preventDefault();
  if ($("#image") && $("#image").val() === "") {
    let ele = $(this);
    ele.addClass("required-file");
    ele.html("No File Selected !!");
    setTimeout(function () {
      ele.removeClass("required-file");
      ele.html("order now");
    }, 2000);
  } else {
    addToCartVariant();
  }
});

function addToCartVariant() {
  let section_id = $(".AddToCart").data("section-id");
  console.log(section_id);
  let addToCartForm = document.getElementById(section_id);
  let formData = new FormData(addToCartForm);
  let renderedHtml;
  let renderedTotalPrice;
  let btn_txt = $(".AddToCart").html();
  $(".AddToCart").addClass("special-loader");
  $(".AddToCart").html(
    'Loading <span class="bounce1"></span><span class="bounce2"></span><span class="bounce3"></span>'
  );
  $(".mobile-cart-submit").addClass("special-loader");
  $(".mobile-cart-submit").html(
    'Loading <span class="bounce1"></span><span class="bounce2"></span><span class="bounce3"></span>'
  );
  fetch("/cart/add.js", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      $("#cartLogo").attr("src", "https://cdn.shopify.com/s/files/1/0571/9641/3125/t/8/assets/fullcart-bowl-thicker-100px-01.png?v=6117101600441770735");
      renderedHtml = getSectionInnerHTML(
        data.sections["cart-items-template"],
        "#CartContainer"
      );
      renderedTotalPrice = getSectionInnerHTML(
        data.sections["cart-total-price"],
        ".shopify-section"
      );
      $("#CartContainer").html(renderedHtml);
      shippingCalculator(parseInt(renderedTotalPrice));
      // jQuery.getJSON('/cart.js', function (cart) {
      //   shippingCalculator(cart);
      // });
      openCart();
      $(".mobile-cart-submit, .AddToCart").removeClass("special-loader");
      $(".mobile-cart-submit").html("Upload a picture");
      $(".AddToCart").html(btn_txt);
      $(".box").css("background-image", "url()");
      $(".box__input label").css({ visibility: "visible" });
      $("#image").val("");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}


$("body").on("click", ".direct-cart", function () {
  addToCart(this);
  
});

//upsellcart
$("body").on("click", ".UpsellAddToCart", function () {
  addToCart(this);
});

function addToCart(element) {
  $("#CartContainer").addClass("block-cursor");
  let variant_id = parseInt(element.getAttribute("data-variant-id"));
  let variant_quantity =
    $(element).data("quantity") != "" ? $(element).data("quantity") : 1;
  let renderedHtml;
  let renderedTotalPrice;

  let btn_txt = $(element).html();
  $(element).addClass("special-loader");
  $(element).html(
    'Loading <span class="bounce1"></span><span class="bounce2"></span><span class="bounce3"></span>'
  );

  var formData = {
    items: [
      {
        id: variant_id,
        quantity: parseInt(variant_quantity),
      },
    ],
    sections: "cart-total-price,cart-items-template",
  };

  $.ajax({
    url: "/cart/add.js",
    method: "POST",
    dataType: "json",
    data: formData,
  })
    .done(function (data) {
      $("#cartLogo").attr("src", "https://cdn.shopify.com/s/files/1/0571/9641/3125/t/8/assets/fullcart-bowl-thicker-100px-01.png?v=6117101600441770735");
      renderedHtml = getSectionInnerHTML(
        data.sections["cart-items-template"],
        "#CartContainer"
      );
      renderedTotalPrice = getSectionInnerHTML(
        data.sections["cart-total-price"],
        ".shopify-section"
      );
      $("#CartContainer").html(renderedHtml);
      shippingCalculator(parseInt(renderedTotalPrice));
      $("#CartContainer").removeClass("block-cursor");
      // jQuery.getJSON('/cart.js', function (cart) {
      //   // openAjaxCart(cart);
      // });
      openCart();
      $(element).html(btn_txt);
      $(element).removeClass("special-loader");
    })
    .fail(function (error) {
      console.log(error);
      $("#CartContainer").removeClass("block-cursor");
    });
}

$("body").on("change", "#CartSpecialInstructions", function () {
  $("#CartContainer").addClass("block-cursor");
  let renderedHtml;
  let text_val = $(this).val();
  var formData = {
    note: `${text_val}`,
    sections: "cart-items-template",
  };

  $.ajax({
    url: "/cart/update.js",
    method: "POST",
    dataType: "json",
    data: formData,
  })
    .done(function (data) {
      renderedHtml = getSectionInnerHTML(
        data.sections["cart-items-template"],
        "#CartContainer"
      );
      $("#CartContainer").html(renderedHtml);
      shippingCalculator(data.total_price);
      $("#CartContainer").removeClass("block-cursor");
    })
    .fail(function (error) {
      console.log(error);
    });
});

function shippingCalculator(cartTotalPrice) {
  // let cartDiscountAmt = 45;
  var total_price = cartTotalPrice / 100;
  if (total_price < cartDiscountAmt) {
    $(".ProgressBar__indicator").ready(function () {
      if (total_price > 0 && total_price <= cartDiscountAmt * 0.1) {
        $(".ProgressBar__indicator").toggleClass("less-than-10");
      }
      if (
        total_price > cartDiscountAmt * 0.1 &&
        total_price <= cartDiscountAmt * 0.2
      ) {
        $(".ProgressBar__indicator").toggleClass("less-than-20");
      }
      if (
        total_price > cartDiscountAmt * 0.2 &&
        total_price <= cartDiscountAmt * 0.25
      ) {
        $(".ProgressBar__indicator").toggleClass("quarter-clicked");
      }

      if (
        total_price > cartDiscountAmt * 0.25 &&
        total_price <= cartDiscountAmt * 0.3
      ) {
        $(".ProgressBar__indicator").toggleClass("less-than-30");
      }
      if (
        total_price > cartDiscountAmt * 0.3 &&
        total_price <= cartDiscountAmt * 0.4
      ) {
        $(".ProgressBar__indicator").toggleClass("less-than-40");
      }
      if (
        total_price > cartDiscountAmt * 0.4 &&
        total_price <= cartDiscountAmt * 0.5
      ) {
        $(".ProgressBar__indicator").toggleClass("half-clicked");
      }
      if (
        total_price > cartDiscountAmt * 0.5 &&
        total_price <= cartDiscountAmt * 0.6
      ) {
        $(".ProgressBar__indicator").toggleClass("less-than-60");
      }
      if (
        total_price > cartDiscountAmt * 0.6 &&
        total_price <= cartDiscountAmt * 0.7
      ) {
        $(".ProgressBar__indicator").toggleClass("less-than-70");
      }
      if (
        total_price > cartDiscountAmt * 0.7 &&
        total_price <= cartDiscountAmt * 0.75
      ) {
        $(".ProgressBar__indicator").toggleClass("three-quarters-clicked");
      }
      if (
        total_price > cartDiscountAmt * 0.75 &&
        total_price <= cartDiscountAmt * 0.8
      ) {
        $(".ProgressBar__indicator").toggleClass("less-than-80");
      }
      if (
        total_price > cartDiscountAmt * 0.8 &&
        total_price <= cartDiscountAmt * 0.9
      ) {
        $(".ProgressBar__indicator").toggleClass("less-than-90");
      }
      if (
        total_price > cartDiscountAmt * 0.9 &&
        total_price < cartDiscountAmt * 0.95
      ) {
        $(".ProgressBar__indicator").toggleClass("less-than-95");
      }
      if (
        total_price > cartDiscountAmt * 0.95 &&
        total_price < cartDiscountAmt
      ) {
        $(".ProgressBar__indicator").toggleClass("less-than-95");
      }
    });
  }

  if (total_price >= cartDiscountAmt) {
    // console.log("Discount Applied : " + data.cartDiscountsApplied);
    // console.log("Cart Total : " + total_price);
    $(".shipping-text").text("Congrats! You get free shipping.");

    $(".ProgressBar__indicator").ready(function () {
      $(".ProgressBar__indicator").toggleClass("clicked");
    });
  } else {
    // console.log("Cart Total : " + total_price);
    var remainingAmt = cartDiscountAmt - total_price;
    $(".shipping-text").text(
      `You're ${currency_symbol}${remainingAmt.toFixed(2)} away from free shipping`
    );
  }
}

// function openAjaxCart(cart) {
//   var upsellHandle = $("#CartContainer").data("handle");
//   var upsellId = $("#CartContainer").data("value");
//   var items = cart.items;
//   var hide_cart = "";
//   var output = "";
//   let shipping_bar;
//   let cartDiscountAmt = 45;

//   for (var i = 0; i < items.length; i++) {
//     let item = cart.items[i];
//     if (item.handle === upsellHandle) {
//       hide_cart = "hide-cart";
//     }
//   }
//   output += `
        
//         <div id="cart-form" class="cart-form ${hide_cart}">
//             <div class="ajaxcart__inner ajaxcart__inner--has-fixed-footer">
//                  <div class="shipping-text">
//                   </div>
//                   <div class="ProgressBar__hide"></div>
//                   <div class="ProgressBar__indicator"></div>
//                 `;
//   if (cart.item_count > 0) {
//     $("#cartLogo").attr(
//       "src",
//       "https://cdn.shopify.com/s/files/1/0571/9641/3125/t/8/assets/fullcart-bowl-thicker-100px-01.png?v=6117101600441770735"
//     );
//     output += `
//         <div class="cart-body">`;

//     for (var i = 0; i < items.length; i++) {
//       let item = cart.items[i];
//       let properties = item["properties"];
//       var variantTitle;
//       if (item.variant_title) {
//         variantTitle = item.variant_title;
//       } else {
//         variantTitle = "";
//       }
//       if (jQuery.isEmptyObject(item["properties"])) {
//         var cart_item = {
//           image: `${item.image}`,
//           title: `${item.product_title}`,
//         };
//       } else {
//         let j = 0;
//         for (const property in properties) {
//           if (j < 1) {
//             var cart_item = {
//               image: `${properties[property]}`,
//               title: ` ${property}`,
//             };
//             break;
//           }
//           j++;
//         }
//       }

//       // for (const property in properties) {

//       output += `
//         <div class="ajaxcart__product">
//             <div class="ajaxcart__row" data-line="${i + 1}">
//                 <div class="grid">
//                     <div class="grid__item one-quarter">
//                         <a href="${item.url}" class="ajaxcart__product-image">
//                             <img src="${cart_item["image"]}" alt="" />
//                         </a>
//                     </div>
//                     <div class="grid__item three-quarters">
//                         <div class="ajaxcart__product-name--wrapper">
//                             <a href="${item.url
//         }" class="ajaxcart__product-name">
//                                 ${cart_item["title"]}
//                             </a>
//                             <span class="ajaxcart__product-meta">${variantTitle}</span>
//                         </div>
    
//                         <div class="grid">
//                             <div class="grid__item one-half">
//                                 <div class="ajaxcart__qty">
//                                     <button type="button"
//                                         class="ajaxcart__qty-adjust ajaxcart__qty--minus icon-fallback-text " 
//                                         data-id="${item.key}"
//                                         data-qty="${item.quantity - 1}" 
//                                         data-line="${i + 1
//         }" aria-label="Reduce item quantity by one">
//                                         <span class="icon icon-minus" aria-hidden="true"></span>
//                                         <span class="fallback-text" aria-hidden="true">−</span>
//                                     </button>
//                                     <input type="text" name="updates[]" class="ajaxcart__qty-num" 
//                                         value="${item.quantity}" min="0"
//                                         data-id="${item.key}" 
//                                         data-line="${i + 1
//         }" aria-label="quantity" pattern="[0-9]*" />
//                                     <button type="button"
//                                         class="ajaxcart__qty-adjust ajaxcart__qty--plus icon-fallback-text" 
//                                         data-id="${item.key}"
//                                         data-line="${i + 1}" 
//                                         data-qty="${item.quantity + 1
//         }" aria-label="Increase item quantity by one">
//                                         <span class="icon icon-plus" aria-hidden="true"></span>
//                                         <span class="fallback-text" aria-hidden="true">+</span>
//                                     </button>
//                                 </div>
//                             </div>
//                             <div class="grid__item one-half text-right">
//                                 <span class="ajaxcart__price euro">€ ${(
//           item.line_price / 100
//         ).toFixed(2)}</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>`;
//       // }
//     }
//     output += `
//     </div>
    
    
//       <div class="cart-foot">
    
//           <div id="add-gift" data-handle="${upsellHandle}" data-value="${upsellId}" class="ajaxcart__product" style="padding: 0 0 10px;">
//               <div class="" data-line="1" style="padding: 0 20px;background-color: #a5dcde;border-radius: 5px;">
//                   <div class="grid">
//                       <div class="grid__item one-third">
//                           <label class="ajaxcart__product-image"><img
//                                   src="//cdn.shopify.com/s/files/1/0268/5580/0887/t/15/assets/Gift_bag_1.png?v=18267070932788411929"
//                                   alt="gift bag" style="width: 59px;height: 59px;margin: 10px auto;object-fit: contain;"></label>
//                       </div>
//                       <div class="grid__item two-thirds">
//                           <div class="ajaxcart__product-name--wrapper ajax-padder">
//                               <label class="ajaxcart__product-name text-left"
//                                   style="padding-top: 15px;padding-bottom: 15px;">Better with a
//                                   <strong>gift bag</strong>.</label>
//                               <label class="ajaxcart__product-name text-right euro">+ €2.00</label>
//                           </div>
//                       </div>
//                   </div>
//               </div>
//           </div>
//           <div class="grid">
//               <div class="grid__item one-third">
//                   <p class="ajaxcart__subtotal">Subtotal</p>
//               </div>
//               <div class="grid__item two-thirds text-right">
//                   <p class="ajaxcart__subtotal euro">€ ${(
//         cart.total_price / 100
//       ).toFixed(2)} INCL. VAT</p>
//               </div>
//           </div>
//           <div class="grid">
//               <div class="grid__item one-half">
//                   <p class="ajaxcart__ship">Shipping</p>
//               </div>
//               <div class="grid__item one-half text-right">
//                   <p class="ajaxcart__ship">Calc. at next step</p>
//               </div>
//           </div>
//           <a href="/checkout" class="button cart__checkout btn upload-btn-xl euro" name="checkout">
//               Checkout
//           </a>
//           <a href="#" id="poundcheckout" class="btn upload-btn-xl pound display-non"
//               style="color: #fff;width: 100%;border-radius: 5px;">
//               Checkout
//           </a>
//           <a href="/" class="continue-shopping button euro" style="width: 100%;border-radius: 5px;">
//               Continue Shopping
//           </a>
//           <p style="padding-top: 15px;border-bottom: 1px solid;margin: 0 0 12px 0;"></p>
      
//           <div>
//               <label for="CartSpecialInstructions" class="ajaxcart__note">woof, anything special we
//                   can do for you?</label>
//               <textarea name="note" class="input-full" id="CartSpecialInstructions"
//                   style="border-radius: 5px;min-height: 40px;"></textarea>
//           </div>
    
//       </div>
//             `;
//   } else {
//     $("#cartLogo").attr(
//       "src",
//       "https://cdn.shopify.com/s/files/1/0571/9641/3125/t/8/assets/cart-bowl-thicker-100px-01.png?v=15354146367745521056"
//     );
//   }
//   output += `
//             </div >
//         </div >
//     `;

//   $("#CartContainer").html(output);
//   openCart();
//   $("#AddToCart--product-template").html("order now");

//   // if ((cart.total_price / 100) < cartDiscountAmt) {

//   //     var total_price = cart.total_price / 100;
//   //     $('.ProgressBar__indicator').ready(function () {

//   //         if (total_price > 0 && total_price <= (cartDiscountAmt * 0.10)) {
//   //             $('.ProgressBar__indicator').toggleClass('less-than-10');
//   //         }
//   //         if (total_price > (cartDiscountAmt * 0.10) && total_price <= (cartDiscountAmt * 0.20)) {
//   //             $('.ProgressBar__indicator').toggleClass('less-than-20');
//   //         }
//   //         if (total_price > (cartDiscountAmt * 0.20) && total_price <= (cartDiscountAmt * 0.25)) {
//   //             $('.ProgressBar__indicator').toggleClass('quarter-clicked');
//   //         }

//   //         if (total_price > (cartDiscountAmt * 0.25) && total_price <= (cartDiscountAmt * 0.30)) {
//   //             $('.ProgressBar__indicator').toggleClass('less-than-30');
//   //         }
//   //         if (total_price > (cartDiscountAmt * 0.30) && total_price <= (cartDiscountAmt * 0.40)) {
//   //             $('.ProgressBar__indicator').toggleClass('less-than-40');
//   //         }
//   //         if (total_price > (cartDiscountAmt * 0.40) && total_price <= (cartDiscountAmt * 0.50)) {
//   //             $('.ProgressBar__indicator').toggleClass('half-clicked');
//   //         }
//   //         if (total_price > (cartDiscountAmt * 0.50) && total_price <= (cartDiscountAmt * 0.60)) {
//   //             $('.ProgressBar__indicator').toggleClass('less-than-60');
//   //         }
//   //         if (total_price > (cartDiscountAmt * 0.60) && total_price <= (cartDiscountAmt * 0.70)) {
//   //             $('.ProgressBar__indicator').toggleClass('less-than-70');
//   //         }
//   //         if (total_price > (cartDiscountAmt * 0.70) && total_price <= (cartDiscountAmt * 0.75)) {
//   //             $('.ProgressBar__indicator').toggleClass('three-quarters-clicked');
//   //         }
//   //         if (total_price > (cartDiscountAmt * 0.75) && total_price <= (cartDiscountAmt * 0.80)) {
//   //             $('.ProgressBar__indicator').toggleClass('less-than-80');
//   //         }
//   //         if (total_price > (cartDiscountAmt * 0.80) && total_price <= (cartDiscountAmt * 0.90)) {
//   //             $('.ProgressBar__indicator').toggleClass('less-than-90');
//   //         }
//   //         if (total_price > (cartDiscountAmt * 0.90) && total_price < (cartDiscountAmt * 0.95)) {
//   //             $('.ProgressBar__indicator').toggleClass('less-than-95');
//   //         }
//   //         if (total_price > (cartDiscountAmt * 0.95) && total_price < (cartDiscountAmt)) {
//   //             $('.ProgressBar__indicator').toggleClass('less-than-95');
//   //         }

//   //     });
//   // }

//   // if (cart.total_price / 100 >= cartDiscountAmt) {
//   //     // console.log("Discount Applied : " + data.cartDiscountsApplied);
//   //     console.log("Cart Total : " + cart.total_price / 100);
//   //     $(".shipping-text").text("Congrats! You get free shipping.");

//   //     $('.ProgressBar__indicator').ready(function () {
//   //         $('.ProgressBar__indicator').toggleClass('clicked');
//   //     });
//   // }
//   // else {
//   //     console.log("Cart Total : " + cart.total_price / 100);
//   //     var remainingAmt = cartDiscountAmt - (cart.total_price / 100);
//   //   $(".shipping-text").text(`You're  €${(remainingAmt).toFixed(2)} away from free shipping`);
//   // }
// }

function getSectionInnerHTML(html, selector) {
  return new DOMParser()
    .parseFromString(html, "text/html")
    .querySelector(selector).innerHTML;
}

function changeItem(line, quantity) {
  $("#CartContainer").addClass("block-cursor");
  let renderedHtml;
  let formData = {
    line: parseInt(line),
    quantity: quantity,
    sections: "cart-items-template",
  };

  $.ajax({
    url: "/cart/change.js",
    method: "POST",
    dataType: "json",
    data: formData,
  })
    .done(function (data) {
      console.log(data.sections);
      data.item_count > 0 ? $("#cartLogo").attr("src", "https://cdn.shopify.com/s/files/1/0571/9641/3125/t/8/assets/fullcart-bowl-thicker-100px-01.png?v=6117101600441770735"):$("#cartLogo").attr("src","https://cdn.shopify.com/s/files/1/0571/9641/3125/t/8/assets/cart-bowl-thicker-100px-01.png?v=15354146367745521056");
      renderedHtml = getSectionInnerHTML(
        data.sections["cart-items-template"],
        "#CartContainer"
      );
      $("#CartContainer").html(renderedHtml);
      shippingCalculator(data.total_price);
      $("#CartContainer").removeClass("block-cursor");
    })
    .fail(function (error) {
      console.log(error);
      $("#CartContainer").removeClass("block-cursor");
    });
}

function updateQuantity(line, qty) {
  // Add activity classes when changing cart quantities
  var $row = $('.ajaxcart__row[data-line="' + line + '"]').addClass(
    "is-loading"
  );

  if (qty === 0) {
    $row.parent().addClass("is-removed");
  }

  // Slight delay to make sure removed animation is done
  //   setTimeout(function () {
  //     changeItem(line, qty);
  //   }, 250);
  changeItem(line, qty);
}

// Update quantity based on input on change
$("body").on("change", ".ajaxcart__qty-num", function () {
  var $el = $(this),
    line = $el.data("line"),
    qty = parseInt($el.val().replace(/\D/g, ""));

  qty = validateQty(qty);

  // If it has a data-line, update the cart
  if (line) {
    updateQuantity(line, qty);
  }
});

// Add or remove from the quantity
$("body").on("click", ".ajaxcart__qty-adjust", function () {
  var $el = $(this),
    line = $el.data("line"),
    $qtySelector = $el.siblings(".ajaxcart__qty-num"),
    qty = parseInt($qtySelector.val().replace(/\D/g, ""));

  qty = validateQty(qty);

  // Add or subtract from the current quantity
  if ($el.hasClass("ajaxcart__qty--plus")) {
    qty += 1;
  } else {
    qty -= 1;
    if (qty <= 0) qty = 0;
  }

  // If it has a data-line, update the cart.
  // Otherwise, just update the input's number
  if (line) {
    updateQuantity(line, qty);
  } else {
    $qtySelector.val(qty);
  }
});

validateQty = function (qty) {
  if (parseFloat(qty) === parseInt(qty) && !isNaN(qty)) {
    // We have a valid number!
  } else {
    // Not a number. Default to 1.
    qty = 1;
  }
  return qty;
};

// ===========================================================================================
// class CartRemoveButton extends HTMLElement {
//   constructor() {
//     super();
//     this.addEventListener('click', (event) => {
//       event.preventDefault();
//       this.closest('cart-items').updateQuantity(this.dataset.index, 0);
//     });
//   }
// }

// customElements.define('cart-remove-button', CartRemoveButton);

// class CartItems extends HTMLElement {
//   constructor() {
//     super();

//     this.lineItemStatusElement = document.getElementById('shopping-cart-line-item-status');

//     this.currentItemCount = Array.from(this.querySelectorAll('[name="updates[]"]'))
//       .reduce((total, quantityInput) => total + parseInt(quantityInput.value), 0);

//     this.debouncedOnChange = debounce((event) => {
//       this.onChange(event);
//     }, 300);

//     this.addEventListener('change', this.debouncedOnChange.bind(this));
//   }

//   onChange(event) {
//     this.updateQuantity(event.target.dataset.index, event.target.value, document.activeElement.getAttribute('name'));
//   }

//   getSectionsToRender() {
//     return [
//       {
//         id: 'main-cart-items',
//         section: document.getElementById('main-cart-items').dataset.id,
//         selector: '.js-contents',
//       },
//       {
//         id: 'cart-icon-bubble',
//         section: 'cart-icon-bubble',
//         selector: '.shopify-section'
//       },
//       {
//         id: 'cart-live-region-text',
//         section: 'cart-live-region-text',
//         selector: '.shopify-section'
//       },
//       {
//         id: 'main-cart-footer',
//         section: document.getElementById('main-cart-footer').dataset.id,
//         selector: '.js-contents',
//       }
//     ];
//   }

//   updateQuantity(line, quantity, name) {
//     this.enableLoading(line);

//     const body = JSON.stringify({
//       line,
//       quantity,
//       sections: this.getSectionsToRender().map((section) => section.section),
//       sections_url: window.location.pathname
//     });

//     fetch(`${routes.cart_change_url}`, {...fetchConfig(), ...{ body }})
//       .then((response) => {
//         return response.text();
//       })
//       .then((state) => {
//         const parsedState = JSON.parse(state);
//         this.classList.toggle('is-empty', parsedState.item_count === 0);
//         document.getElementById('main-cart-footer')?.classList.toggle('is-empty', parsedState.item_count === 0);

//         this.getSectionsToRender().forEach((section => {
//           const elementToReplace =
//             document.getElementById(section.id).querySelector(section.selector) || document.getElementById(section.id);

//           elementToReplace.innerHTML =
//             this.getSectionInnerHTML(parsedState.sections[section.section], section.selector);
//         }));

//         this.updateLiveRegions(line, parsedState.item_count);
//         document.getElementById(`CartItem-${line}`)?.querySelector(`[name="${name}"]`)?.focus();
//         this.disableLoading();
//       }).catch(() => {
//         this.querySelectorAll('.loading-overlay').forEach((overlay) => overlay.classList.add('hidden'));
//         document.getElementById('cart-errors').textContent = window.cartStrings.error;
//         this.disableLoading();
//       });
//   }

//   updateLiveRegions(line, itemCount) {
//     if (this.currentItemCount === itemCount) {
//       document.getElementById(`Line-item-error-${line}`)
//         .querySelector('.cart-item__error-text')
//         .innerHTML = window.cartStrings.quantityError.replace(
//           '[quantity]',
//           document.getElementById(`Quantity-${line}`).value
//         );
//     }

//     this.currentItemCount = itemCount;
//     this.lineItemStatusElement.setAttribute('aria-hidden', true);

//     const cartStatus = document.getElementById('cart-live-region-text');
//     cartStatus.setAttribute('aria-hidden', false);

//     setTimeout(() => {
//       cartStatus.setAttribute('aria-hidden', true);
//     }, 1000);
//   }

//   getSectionInnerHTML(html, selector) {
//     return new DOMParser()
//       .parseFromString(html, 'text/html')
//       .querySelector(selector).innerHTML;
//   }

//   enableLoading(line) {
//     document.getElementById('main-cart-items').classList.add('cart__items--disabled');
//     this.querySelectorAll('.loading-overlay')[line - 1].classList.remove('hidden');
//     document.activeElement.blur();
//     this.lineItemStatusElement.setAttribute('aria-hidden', false);
//   }

//   disableLoading() {
//     document.getElementById('main-cart-items').classList.remove('cart__items--disabled');
//   }
// }

// customElements.define('cart-items', CartItems);
