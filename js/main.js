const hamburger = document.querySelector('.hamburger');
const fullScreenMenu = document.querySelector('.fullscreen-menu');
const closeMenu = document.querySelector('.fullscreen-menu__close');
const menuLink = document.querySelectorAll('.fullscreen-menu__link');




let op = 0.2;

let increaseOpacity = function () {
  setTimeout(function () {
    if (fullScreenMenu.style.opacity < 1) {
      op = op + 0.2;
      fullScreenMenu.style.opacity = op;
      increaseOpacity();
    }
  }, 100);

}


let decreaseOpacity = function () {
  setTimeout(function () {
    if (fullScreenMenu.style.opacity > 1) {
      op = op - 0.2;
      fullScreenMenu.style.opacity = op;
      decreaseOpacity();
    }
  }, 100);

  if (op == 0 || op < 0) {
    fullScreenMenu.style.display = 'none';
  }

}


function noScroll() {
  window.scrollTo(0, 0);
}


hamburger.addEventListener('click', function () {
  fullScreenMenu.style.display = 'flex';
  increaseOpacity();
  window.addEventListener('scroll', noScroll);


})

closeMenu.addEventListener('click', function () {
  fullScreenMenu.style.display = 'none';
  window.removeEventListener('scroll', noScroll);
  decreaseOpacity();
})


fullScreenMenu.addEventListener('click', function (event) {
  if (event.target === fullScreenMenu) {
    closeMenu.click();
    window.removeEventListener('scroll', noScroll);
    decreaseOpacity();
  }
})

for (let i = 0; i < menuLink.length; i++) {
  menuLink[i].addEventListener('click', function () {
    closeMenu.click();
    decreaseOpacity();
  });
}

// Team

const teamAccordeon = document.querySelectorAll('.team-accordeon__trigger');
const activeClassTeam = 'team-accordeon__trigger--active';

teamAccordeon.forEach(function (section) {

  section.addEventListener('click', function () {
    // debugger;

    if (section.classList.contains(activeClassTeam)) {
      section.classList.remove(activeClassTeam)

    } else {

      teamAccordeon.forEach(function (section) {
        section.classList.remove(activeClassTeam)
      })

      section.classList.add(activeClassTeam)

    }

  })

})



// Menu
const closeMenuAccord = document.querySelectorAll('.menu-accordeon__close');
const menuAccordeon = document.querySelectorAll('.menu-accordeon__trigger');
const activeClassMenu = 'menu-accordeon__trigger--active';

menuAccordeon.forEach(function (section) {
  section.addEventListener('click', function () {

    if (section.classList.contains(activeClassMenu)) {
      section.classList.remove(activeClassMenu)

    } else {

      menuAccordeon.forEach(function (section) {
        section.classList.remove(activeClassMenu)
      })
      section.classList.add(activeClassMenu)

    }


    for (let i = 0; i < closeMenuAccord.length; i++) {
      closeMenuAccord[i].addEventListener('click', function (c) {
        // debugger;
        c.preventDefault();

        if (section.classList.contains(activeClassMenu)) {
          section.classList.remove(activeClassMenu)
        }

      });

    }


  })

})



// =======================================================

// Reviews=========================


const reviewLink = document.querySelectorAll(".reviews__link");

reviewLink.forEach(element =>
  element.addEventListener("click", function (e) {
    e.preventDefault();
  })
);

/* Индекс слайда по умолчанию */
var slideIndex = 1;
showSlides(slideIndex);

/* Функция увеличивает индекс на 1, показывает следующй слайд*/
function plusSlide() {
  showSlides(slideIndex += 1);
}

/* Функция уменьшяет индекс на 1, показывает предыдущий слайд*/
function minusSlide() {
  showSlides(slideIndex -= 1);
}

/* Устанавливает текущий слайд */
function currentSlide(n) {
  showSlides(slideIndex = n);
}

/* Основная функция слайдера */
function showSlides(n) {

  var i;
  var slides = document.getElementsByClassName("reviews__content");
  var dots = document.getElementsByClassName("reviews__link");
  if (n > slides.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = slides.length
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" reviews__link--active", "");
  }
  slides[slideIndex - 1].style.display = "flex";

  dots[slideIndex - 1].className += " reviews__link--active";
}






// Form

const openModal = document.querySelector('.modal');
const textModal = document.querySelector('.modal__text');

const closeModal = document.querySelector('.btn__link--modal');



closeModal.addEventListener('click', function (e) {
  // debugger;
  e.preventDefault();
  openModal.style.display = 'none';
});


const myForm = document.querySelector('.form__tag');
const sendButton = document.querySelector('.form__btn');

sendButton.addEventListener('click', event => {
  event.preventDefault();


  if (validateForm(myForm)) {

    var formData = new FormData();
    formData.append("name", myForm.elements.name.value);
    formData.append("phone", myForm.elements.phone.value);
    formData.append("comment", myForm.elements.comment.value);
    formData.append("to", "mail@mail.com");


    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
    // xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail/fail');

    xhr.send(formData);
    xhr.addEventListener('load', () => {
      if (xhr.response.status) {
        console.log("Все ок!");
        // debugger;
        openModal.style.display = 'flex';

        // window.addEventListener('scroll', noScroll); 
      } else {
        console.log("Не отправлено!");
        openModal.style.display = 'flex';
        textModal.textContent = "Сообщение не отправлено";

      }

    });

  }

});


function validateForm(form) {
  let valid = true;

  if (!validateField(form.elements.name)) {
    valid = false;
  }

  if (!validateField(form.elements.phone)) {
    valid = false;
  }

  if (!validateField(form.elements.comment)) {
    valid = false;
  }

  return valid;
}


function validateField(field) {
  if (!field.checkValidity()) {
    field.nextElementSibling.textContent = field.validationMessage;
    return false;

  } else {

    field.nextElementSibling.textContent = " ";
    return true;
  }
}


//=============================

// One Page Scroll ================

const sections = $('.section');
const display = $('.wrapper__content');
let inScroll = false;

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

const performTransition = sectionEq => {

  if (inScroll == false) {
    inScroll = true;

    const position = sectionEq * -100;

    if (isNaN(position)){
      console.error("передано не верное значение в performTransition")
    }

  
    sections
    .eq(sectionEq)
    .addClass('active')
    .siblings()
    .removeClass('active');
  
    display.css({
      transform: `translateY(${position}%)`
    })

    setTimeout(() => {
      inScroll = false;

      $('.fixed-menu__item')
      .eq(sectionEq)
      .addClass('active')
      .siblings()
      .removeClass('active');

    }, 1300);

  }

}


const scrollToSection = direction => {
  const activeSection = sections.filter('.active');
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();
  
  if (direction == 'next' && nextSection.length) {
    performTransition(nextSection.index())
  }
  
  if (direction == 'prev' && prevSection.length) {
    performTransition(prevSection.index())
  }

}




$(window).on('wheel', e => {
  const deltaY = e.originalEvent.deltaY;


  if (deltaY > 0) {
    scrollToSection('next');
    console.log('next');
  }

  if (deltaY < 0) {
    scrollToSection('prev');
    console.log('prev');
  }


});

$(window).on('keydown', e => {
  const tagName = e.target.tagName.toLowerCase();

  if (tagName !== 'input' && tagName !== 'textarea') {

    switch(e.keyCode) {
      case 38:
        scrollToSection('prev');
        break;
  
      case 40:
        scrollToSection('next');
        break;
    }

  }


});


$("[data-scroll-to]").on("click", e => {
  e.preventDefault();
  const $this = $(e.currentTarget);
  const target = $this.attr('data-scroll-to');

  performTransition(target);
  
});

if (isMobile) {

  $("body").swipe( {
    //Generic swipe handler for all directions
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
      const scrollDirections = direction == 'up' ? 'next' : 'prev';
  
      scrollToSection(scrollDirections);
  
    }
  });

}







































// // Reviews========================= только иконки меняет (не рабочий)


// const reviewsAccordeon = document.querySelectorAll('.reviews__content');
// const activeClassReviews = 'reviews__content--active';

// const reviewsAvatarAcc = document.querySelectorAll('.reviews__link')
// const activeClassAvatar = 'reviews__link--active';

// reviewsAvatarAcc.forEach(function (section) {

//   section.addEventListener('click', function (e) {
//     // debugger;
//     e.preventDefault();

//     reviewsAvatarAcc.forEach(function (section) {
//       section.classList.remove(activeClassAvatar)
//     })

//     section.classList.add(activeClassAvatar)

//   })

// })

