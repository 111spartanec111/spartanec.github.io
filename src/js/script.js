// $(document).ready(function(){
//     $('.carousel__inner').slick({
//         speed: 1200,
//         prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
//         nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
//         responsive: [
//             {
//                 breakpoint: 992,
//                 settings: {
//                 dots: true,
//                 arrows: false
//                 }
//             }
//         ]
//       });
//   });

// const { name } = require("browser-sync");


var slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: false,
    mouseDrag: true
    });

  document.querySelector('.prev').addEventListener ('click', function () {
    slider.goTo('prev'); 
  });
  
  document.querySelector('.next').addEventListener ('click', function () {
    slider.goTo('next'); 
  });


 
  
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });
 

  // $('.catalog-item__link').each(function(i) {
  //   $(this).on('click', function(e) {
  //     e.preventDefault();
  //     $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
  //     $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
  //   })
  // })


  // $('.catalog-item__back').each(function(i) {
  //   $(this).on('click', function(e) {
  //     e.preventDefault();
  //     $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
  //     $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
  //   })
  // })        ИЛИ ТО ЧТО НИЖЕ !!!

  function toggleSlide(item) {
    $(item).each(function(i) {
      $(this).on('click', function(e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      });
    });
  };

  toggleSlide ('.catalog-item__link');
  toggleSlide ('.catalog-item__back');

// Modal

$('[data-modal=consultation]').on('click', function(){
  $('.overlay, #consultation').fadeIn('slow');
});
// Крестик
$('.modal__close').on('click', function() {
  $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
});

// Купить

$('.button_mini').each(function(i) {
  $(this).on('click', function() {
    $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
    $('.overlay, #order').fadeIn('slow');
  });
});



function validateForms(form){
  $(form).validate({
    rules: {
      name: {
        required: true,
        minlength: 2
      },
      phone: "required",
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      name:  {
        required: "Введите своё имя",
        minlength: jQuery.validator.format("Введите минимум {0} символа")
      },
      phone: "Введите ваш номер телефона",
      email: {
        required: "Пожалуйста, введите почту",
        email: "Неправильно введена почта!"
      }
    }
  
  });
};

validateForms('#consultation-form');
validateForms('#consultation form');
validateForms('#order form');


// маска
$('input[name=phone]').mask("+7 (999) 999-99-99");



//  Mailer PHP
$('form').submit(function(e) {
  e.preventDefault();

  if(!$(this).valid()){
    return;
  }

  $.ajax({
    type: "POST",
    url: "mailer/smart.php",
    data: $(this).serialize()
  }).done(function(){
    $(this).find("input").val("");
    $('#consultation, #order').fadeOut();
    $('.overlay, #thanks').fadeIn('slow');

    $('form').trigger('reset');
  });
  return false;
});

// Scroll and page Up

$(window).scroll(function (){
  if ($(this).scrollTop () > 1500) {
    $('.pageup').fadeIn();
  } else {   
    $('.pageup').fadeOut();
  }
});

$("a[href^='#']").click(function(){
  const _href = $(this).attr("href");
  $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
  return false;
});

new WOW().init();