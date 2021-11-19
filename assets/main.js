$(document).ready(function () {
  $(".color-option .color-div input").each(function () {
    console.log(this.checked);
    if (this.checked) {
      soldOut(document.querySelector("label[for='" + this.getAttribute("id") + "']"));
      console.log(document.querySelector("label[for='" + this.getAttribute("id") + "']"));
    }
  });

  $(".colors-swatch").click(function () {
    soldOut(this);
  });

  function soldOut(ele) {
    var colorSelected = ele.getAttribute("data-option-id");
    console.log(ele);
    $(ele).addClass("selected-color");
    var inputColor = colorSelected.substring(0, colorSelected.lastIndexOf('-')).replaceAll(" ", "");
    console.log("Input Color: " + inputColor);

    var color = inputColor.substring(inputColor.lastIndexOf('-') + 1);
    console.log("Color: " + color);
    $(".size-circle").removeClass("selected-size");
    $(".size-circle").removeClass("not-available");
    $("#ProductSelect--product-custom-template option").each(function () {
      var variantName = $(this).attr("variant-name").replaceAll(" ", "");
      var sizeVariant = variantName.replaceAll(" ", "").substring(variantName.lastIndexOf("/") + 1);
      variantName = variantName.substring(0, variantName.lastIndexOf("/"));
      // console.log(variantName);
      if (variantName == color) {
        if ($(this).data("avaliable") == "no") {
          // console.log("Not Available Size : " + sizeVariant);
          $(".size-circle." + sizeVariant).addClass("not-available");
        }
        else {
          // console.log("Available Size : " + sizeVariant);
          $(".size-circle." + sizeVariant).removeClass("not-available");
        }
      }
    });
  }
});

/*=================== MOBILE MENU FUNCTION ===================*/
// function toggleMobileMenu(){
//   let aria_expanded = $('.menu-btn').attr('aria-expanded');
//   console.log(aria_expanded);
//   $('.menu-btn').toggleClass('active');
//   $("#NavDrawer").toggleClass('js-drawer-open');
//   $("body").toggleClass('js-drawer-open js-drawer-open-left');
//   $("html").toggleClass('js-drawer-open js-drawer-open-left');

// }


$('.menu-btn').click(function () {
  var aria_expanded = $('#menu-btn').attr('aria-expanded');
  if (aria_expanded === "true") {
    console.log(aria_expanded);
    $(this).attr("aria-expanded", "false");
    $(this).removeClass('active');
    $("#NavDrawer").removeClass('js-drawer-open');
    $("body").removeClass('js-drawer-open js-drawer-open-left');
    $("html").removeClass('js-drawer-open js-drawer-open-left');
  }
  else {
    console.log(aria_expanded);
    $(this).attr("aria-expanded", "true");
    $(this).addClass('active');
    $("#NavDrawer").addClass('js-drawer-open');
    $("body").addClass('js-drawer-open js-drawer-open-left');
    $("html").addClass('js-drawer-open js-drawer-open-left');
  }
});


// let target = document.querySelector('#NavDrawer');

// document.addEventListener('click', (event) => {
//   let menu_btn = document.getElementById("menu-btn");
//   let withinBoundaries = event.composedPath().includes(target)
//   let aria_expanded = $('#menu-btn').attr('aria-expanded');
//   console.log(aria_expanded);
//   if (withinBoundaries !== "true" && aria_expanded && event.target.id !== 'menu_btn') {
//     console.log(aria_expanded);
//     menu_btn.setAttribute("aria-expanded", "false");
//     menu_btn.classList.remove("active");
//     $("#NavDrawer").removeClass('js-drawer-open');
//     $("body").removeClass('js-drawer-open js-drawer-open-left');
//     $("html").removeClass('js-drawer-open js-drawer-open-left');
//   } 

// })


/*=================== CART TOGGLE FUNCTION ===================*/
function toggleCart() {
  $("#CartDrawer").toggleClass('js-drawer-open');
  $("body").toggleClass('js-drawer-open js-drawer-open-right');
  $("html").toggleClass('js-drawer-open js-drawer-open-right');
}

function openCart() {
  $("#CartDrawer").addClass('js-drawer-open');
  $("body").addClass('js-drawer-open js-drawer-open-right');
  $("html").addClass('js-drawer-open js-drawer-open-right');
}

function closeCart() {
  $("#CartDrawer").removeClass('js-drawer-open');
  $("body").removeClass('js-drawer-open js-drawer-open-right');
  $("html").removeClass('js-drawer-open js-drawer-open-right');
}




$(document).mouseup(function (e) {
  let menu = $('#CartDrawer');
  let aria_expanded = $('#cartBtn').attr('aria-expanded');
  if (e.target.id === "cartLogo") {
    toggleCart();
  }

  else if ((!menu.is(e.target) // The target of the click isn't the container.
    && menu.has(e.target).length === 0) || e.target.id === "icon-x" || e.target.id === "closeCart") // Nor a child element of the container
  {
    closeCart();
  }

});




// function toggleCart(){

//  $("#CartDrawer").toggleClass('js-drawer-open');
//   $("body").toggleClass('js-drawer-open js-drawer-open-right');
//   $("html").toggleClass('js-drawer-open js-drawer-open-right');
// }

// $('#cartBtn').click(toggleCart);
// $('.drawer__close-button').click(toggleCart);



// --------------------------- MOBILE SUBLIST MENU---------------------------------------

var coll = document.getElementsByClassName("mobile-shop-btn");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    var btn = $(this);
    btn.find('.toggle').toggleClass('open');

    this.classList.toggle("active");
    var x = $(this).data('list-id');
    var ele = document.getElementById(x);
    //     console.log(ele);
    if (ele.style.maxHeight) {
      ele.style.maxHeight = null;
    } else {
      ele.style.maxHeight = "50vh";
    }
  });
}





// --------------------------- MOBILE SUBLIST MENU---------------------------------------

// $(".mobile-nav__item.dropdown").click(function() {
//   $expanded = $(".mobile-nav__item.dropdown .mobile-nav__toggle-btn").attr('aria-expanded');
//   console.log($expanded);
//   if ($expanded) {
//     $(".mobile-nav__item.dropdown .mobile-nav__sublist").css({"display": "block", "max-height": "999px"});
//   }
//   else {
//     console.log("Inside else");
//     $(".mobile-nav__item.dropdown .mobile-nav__sublist").css({"display": "none", "max-height": "0px"});
//   }
// });


/*=================== DROPDOWN MENU FUNCTION ===================*/


$(".display-menu, .dropdown-menu").hover(function () {
  $(".dropdown-menu").css("top", "77%");
  $("#dropdownMenuHover svg").css("transform", "rotate(180deg)");
  $(".header-desktop__backdrop").css("display", "block");
  $(".header_grandchild_dropdown").delay("slow").css("opacity", "1");
  $(".dropdown-menu").delay("slow").css("opacity", "1");
}, function () {
  setTimeout(function () {
    if (!$('.display-menu').is(':hover') && !$('.dropdown-menu').is(':hover')) {
      $(".dropdown-menu").delay("slow").css("top", "-87%");
      $("#dropdownMenuHover svg").delay("slow").css("transform", "rotate(0deg)");
      $(".header-desktop__backdrop").delay("slow").css("display", "none");
      $(".header_grandchild_dropdown").delay("slow").css("opacity", "0");
      $(".dropdown-menu").delay("slow").css("opacity", "0");
    }
  }, 250);
});
var vw = $(window).width();
if (vw > 768 && vw <= 1024) {
  $(".display-menu").click(function () {

    if ($(this).hasClass("open")) {
      $(".dropdown-menu").delay("slow").css("top", "-77%");
      $("#dropdownMenuHover svg").delay("slow").css("transform", "rotate(0deg)");
      $(".header-desktop__backdrop").delay("slow").css("display", "none");
      $(this).removeClass("open");
      console.log("Dropdown collapsed");
    } else {
      $(".dropdown-menu").css("top", "77%");
      $("#dropdownMenuHover svg").css("transform", "rotate(180deg)");
      $(".header-desktop__backdrop").css("display", "block");
      $(this).addClass("open");
    }


  });
}


/*=================== TYPEWRITER FUNCTION ===================*/

var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};


TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};




/*=================== REVIEW SECTION SCRIPT ===================*/
$(document).ready(function () {
  var TxtTyper = function (elr, toRotater, periodr) {
    this.toRotater = toRotater;
    this.elr = elr;
    this.loopNumr = 0;
    this.periodr = parseInt(periodr, 10) || 2000;
    this.txtr = '';
    this.tickr();
    this.isDeletingr = false;
  };

  var toggler = true;

  TxtTyper.prototype.tickr = function () {
    var i = this.loopNumr % this.toRotater.length;
    var fullTxtr = this.toRotater[i];

    if (this.isDeletingr) {
      this.txtr = fullTxtr.substring(0, this.txtr.length - 1);
      if (toggler) {


        if ($('.faders .act').next().length == 0) {
          $('.faders .act').css('display', 'none');
          $('.faders .v-center').first().fadeIn(1000);
          $('.faders .act').removeClass('act');
          $('.faders .v-center').first().addClass('act');
        } else {
          $('.faders .act').css('display', 'none');
          $('.faders .act').next().fadeIn(1000);
          $('.faders .act').removeClass('act').next().addClass('act');
        }
      }
      toggler = false;
    } else {
      this.txtr = fullTxtr.substring(0, this.txtr.length + 1);
      toggler = true;
    }

    this.elr.innerHTML = '<span class="wrap">' + this.txtr + '</span>';

    var thatr = this;
    var deltar = 200 - Math.random() * 100;

    if (this.isDeletingr) { deltar /= 2; }

    if (!this.isDeletingr && this.txtr === fullTxtr) {
      deltar = this.periodr;
      this.isDeletingr = true;
    } else if (this.isDeletingr && this.txtr === '') {
      this.isDeletingr = false;
      this.loopNumr++;
      deltar = 500;
    }

    setTimeout(function () {
      thatr.tickr();
    }, deltar);
  };


  /*=================== REVIEW TYPEWRITER ===================*/

  window.onload = function () {


    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-type').replace(/'/g, "\"");
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);


    var elementsr = document.getElementsByClassName('typewriter');
    for (var i = 0; i < elementsr.length; i++) {
      var toRotater = elementsr[i].getAttribute('data-type').replace(/'/g, "\"");
      var periodr = elementsr[i].getAttribute('data-period');
      if (toRotater) {
        new TxtTyper(elementsr[i], JSON.parse(toRotater), periodr);
      }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewriter > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
  };

});
/*=================== ANNOUNCEMENT SECTION SCRIPT ===================*/

if (
  $(window).width() < 768 &&
  window.location.href.indexOf("/products/") > -1
) {
  $(".topbar-usp-list").each(function () {
    var t = $(this),
      e = t.find(".topbar-usp-item"),
      n = e.length;
    e.first().next().addClass("is-visible");
  });
} else {
  $(".topbar-usp-list").each(function () {
    var t = $(this),
      e = t.find(".topbar-usp-item"),
      n = e.length,
      i = t.data("slide-speed");
    e.first().addClass("is-visible"),
      setInterval(function () {
        var i = t.find(".is-visible").index();
        t
          .find(".is-visible")
          .removeClass("is-visible")
          .addClass("is-finished")
          .next()
          .addClass("is-visible"),
          setTimeout(function () {
            t.find(".is-finished")
              .removeClass("is-finished")
              .addClass("is-hidden");
          }, 600),
          setTimeout(function () {
            t.find(".is-hidden").removeClass("is-hidden");
          }, 1200),
          i === n - 1 && e.first().addClass("is-visible");
      }, i);
  });
}


/*=================== PRODUCT UPLOAD IMAGE SECTION SCRIPT ===================*/
function readURL(input) {
  console.log(input.files);
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('.box').css(
        {
          "background-color": "transparent",
          "background-repeat": "no-repeat",
          "background-size": "contain",
          "background-position": "center center",
          "background-image": `url(${e.target.result})`
        }
      );
      // .attr('src', e.target.result);
      $('.box__input label').css({ "visibility": "hidden" });

      if ($(window).width() < 768) {
        addToCartVariant();
        setTimeout(function () {
          input.value = "";
        }, 250);
      }
    };

    reader.readAsDataURL(input.files[0]);
    // $(".box__input label").css("visibility", "visible");
  }
}

'use strict';

; (function (document, window, index) {
  // feature detection for drag&drop upload
  var isAdvancedUpload = function () {
    var div = document.createElement('div');
    return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
  }();


  // applying the effect for every form
  var forms = document.querySelectorAll('.box');
  Array.prototype.forEach.call(forms, function (form) {
    var input = form.querySelector('input[type="file"]'),
      label = $('label[for="image"]'),
      errorMsg = form.querySelector('.box__error span'),
      restart = form.querySelectorAll('.box__restart'),
      droppedFiles = false,
      showFiles = function (files) {
        console.log(label);
        label.css({ "visibility": "hidden" });
        // label.style.visibility = "hidden"; //files.length > 1 ? ( input.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', files.length ) : files[ 0 ].name;
      }



    // drag&drop files if the feature is available
    if (isAdvancedUpload) {
      form.classList.add('has-advanced-upload'); // letting the CSS part to know drag&drop is supported by the browser

      ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach(function (event) {
        form.addEventListener(event, function (e) {
          // preventing the unwanted behaviours
          e.preventDefault();
          e.stopPropagation();
        });
      });
      ['dragover', 'dragenter'].forEach(function (event) {
        form.addEventListener(event, function () {
          form.classList.add('is-dragover');
        });
      });
      ['dragleave', 'dragend', 'drop'].forEach(function (event) {
        form.addEventListener(event, function () {
          form.classList.remove('is-dragover');
        });
      });
      form.addEventListener('drop', function (e) {
        droppedFiles = e.dataTransfer.files[0]; // the files that were dropped
        var fileTypeX = e.dataTransfer.files[0].type;
        var validImageTypesX = ["image/jpeg", "image/png"];
        if ($.inArray(fileTypeX, validImageTypesX) < 0) {
          console.log('invalid file');
        } else {
          input.files = e.dataTransfer.files;
          showFiles(e.dataTransfer.files);
          var reader = new FileReader();

          reader.onload = function (e) {
            //$('#blah').attr('src', e.target.result);                                        
            $(".box").css("background-color", "transparent");
            $(".box").css("background-repeat", "no-repeat");
            $(".box").css("background-size", "contain");
            $(".box").css("background-position", "center");
            $(".box").css("background-image", "url(" + e.target.result + ")");
            // $(".box__icon").css("visibility", "hidden");
            if ($(window).width() < 767) {
              $('#AddToCartForm--product-template').submit();
              $('.mobile-cart-submit').addClass('special-loader');
              $('.mobile-cart-submit').html('Loading<span class="bounce1"></span><span class="bounce2"></span><span class="bounce3"></span>');

            }
          }

          reader.readAsDataURL(e.dataTransfer.files[0]);
        }



      });
    }
    $("#image").change(function () {
      var fileTypeX = this.files[0].type;
      var validImageTypesX = ["image/jpeg", "image/png"];
      if ($.inArray(fileTypeX, validImageTypesX) < 0) {
        console.log('invalid file');
      } else {
        //input.files = this.files;
        showFiles(this.files);
        var reader = new FileReader();

        reader.onload = function (e) {
          //$('#blah').attr('src', e.target.result);                                        
          $(".box").css("background-color", "transparent");
          $(".box").css("background-repeat", "no-repeat");
          $(".box").css("background-size", "contain");
          $(".box").css("background-position", "center");
          $(".box").css("background-image", "url(" + e.target.result + ")");
          // $(".box__icon").css("visibility", "hidden");

          if ($(window).width() < 767) {
            if (!(window.location.href.indexOf("custom-t-shirt") > -1)) {
              $('#AddToCartForm--product-template').submit();
              $('.mobile-cart-submit').addClass('special-loader');
              $('.mobile-cart-submit').html('Loading<span class="bounce1"></span><span class="bounce2"></span><span class="bounce3"></span>');
              addgiftbox();
              console.log('asdas');
            }
          }
        }

        reader.readAsDataURL(this.files[0]);
        // $(".box__icon").css("visibility", "visible");
      }
    });
    // Firefox focus bug fix for file input
    input.addEventListener('focus', function () { input.classList.add('has-focus'); });
    input.addEventListener('blur', function () { input.classList.remove('has-focus'); });

  });
}(document, window, 0));





/*=================== PRODUCT SLIDER SCRIPT ===================*/

$('.slider-single').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  adaptiveHeight: true,
  infinite: false,
  useTransform: true,
  asNavFor: '.slider-nav',
  speed: 400,
  cssEase: 'cubic-bezier(0.77, 0, 0.18, 1)',
  responsive: [

    {
      breakpoint: 769,
      settings: {
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    }
  ]
});

$('.slider-nav')
  .on('init', function (event, slick) {
    $('.slider-nav .slick-slide.slick-current').addClass('is-active');
  })
  .slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    asNavFor: '.slider-single',
    dots: false,
    focusOnSelect: false,
    centerMode: false,
    infinite: false,
    responsive: [

      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      }
    ]
  });

$('.slider-single').on('afterChange', function (event, slick, currentSlide) {
  $('.slider-nav').slick('slickGoTo', currentSlide);
  var currrentNavSlideElem = '.slider-nav .slick-slide[data-slick-index="' + currentSlide + '"]';
  $('.slider-nav .slick-slide.is-active').removeClass('is-active');
  $(currrentNavSlideElem).addClass('is-active');
});

$('.slider-nav').on('click', '.slick-slide', function (event) {
  event.preventDefault();
  var goToSingleSlide = $(this).data('slick-index');

  $('.slider-single').slick('slickGoTo', goToSingleSlide);
});




// =============  FAQ SCRIPT  ====================

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}



// IMAGE HOVER EFFECTS
$(".img-div").hover(function () {
  $(this).find(".original-img").toggleClass("no-disp")
  $(this).find(".cutout-img").toggleClass("no-disp");
},

  function () {
    $(this).find(".original-img").toggleClass("no-disp")
    $(this).find(".cutout-img").toggleClass("no-disp");
  }
);

$(".img-container").click(function () {
  if ($(this).find(".original-img").hasClass("no-disp")) {
    $(this).find(".original-img").removeClass("no-disp")
    $(this).find(".cutout-img").addClass("no-disp");
  }
  else {
    $(this).find(".original-img").addClass("no-disp")
    $(this).find(".cutout-img").removeClass("no-disp");
  }
});

setInterval(function () {
  if (window.outerWidth < 768) {
    $(".change-text").text("Click");
  }
  else {
    $(".change-text").text("Hover over");
  }
}, 300);


//CHANGE IMAGE ON INPUT CHANGE ON PRODUCT IMAGES
$(document).ready(function () {
  $('.product-form__input input[type=radio]').change(function () {
    changeImage();
  });

  function changeImage() {
    if ($('#product-json').length > 0) {
      var string = "";
      var hardcode_img = "";
      $(".product-form__input").each(function (index) {
        if (index == 0) {
          hardcode_img = $(this).find("input:checked").data("img");
          // console.log(hardcode_img);
          string += $(this).find("input:checked").val();
        } else {
          string += " / " + $(this).find("input:checked").val();
        }

      });
      var x = JSON.parse($('#product-json').html());
      // console.log(x);
      var w = x.find(item => {
        return item.public_title === string;
      });
      // console.log(w);
      $(".slider-nav img").each(function (index) {
        // console.log($(this).attr('src') + hardcode_img );
        if (w.featured_image == null && hardcode_img != "" && hardcode_img != null) {
          if (hardcode_img.indexOf($(this).attr('src')) > -1) {
            // console.log("got it");
            $('.slider-nav').slick('slickGoTo', index);
          }
        }
        if ($(this).attr('src') != null && w.featured_image != null) {
          if (w.featured_image.src.indexOf($(this).attr('src')) > -1) {

            // console.log($(this).attr('src') + w.featured_image.src );
            // console.log(index);
            $('.slider-nav').slick('slickGoTo', index);
          }
        }
      });
    }
  }
  changeImage();
});
