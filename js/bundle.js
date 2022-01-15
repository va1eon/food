/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "calculator": () => (/* binding */ calculator)
/* harmony export */ });
const calculator = options => {

  const {
    resultInner,
    genderSelector,
    ratioSelector,
    heightSelector,
    weightSelector,
    ageSelector,
    activeClass,
  } = options;

  const result = document.querySelector(resultInner);

  const getLocalStorage = key => localStorage.getItem(key);
  const setLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
  }

  const getDefaultValue = (key, value) => {
    setLocalStorage(key, value);
    return value;
  }

  let sex = getLocalStorage('sex') ? getLocalStorage('sex') : getDefaultValue('sex', 'female');
  let height = null;
  let weight = null;
  let age = null;
  let ratio = getLocalStorage('ratio') ? +getLocalStorage('ratio') : getDefaultValue('ratio', 1.375);

  const initLocalSettings = (selector, activeClass) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      el.classList.remove(activeClass);
      if(el.id === getLocalStorage('sex')) {
        el.classList.add(activeClass);
      }
      if(el.dataset.ratio === getLocalStorage('ratio')) {
        el.classList.add(activeClass);
      }
    });
  }

  const calcTotal = () => {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = '_____';
      return 1;
    }

    if(sex === 'female') {
      result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio)
    } else {
      result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio)
    }
  }

  const getStaticInformation = (selector, activeClass) => {
    const elements = document.querySelectorAll(selector);

    elements.forEach(el => {
      el.addEventListener('click', e => {
        if(e.target.dataset.ratio) {
          ratio = +e.target.dataset.ratio;
          setLocalStorage('ratio', +e.target.dataset.ratio);
        } else {
          sex = e.target.id;
          setLocalStorage('sex', e.target.id);
        }

        elements.forEach(el => {
          el.classList.remove(activeClass);
        });
        e.target.classList.add(activeClass);
        calcTotal();
      });
    });
  }

  const getDynamicInformation = selector => {
    const input = document.querySelector(selector);
    input.addEventListener('input', () => {
      if (input.value.match(/\D/g)) {
        input.style.border = '1px solid tomato'
      } else {
        input.style.border = 'none'
      }
      switch (input.id) {
        case heightSelector.slice(1) :
          height = +input.value;
          break;
        case weightSelector.slice(1) :
          weight = +input.value;
          break;
        case ageSelector.slice(1) :
          age = +input.value;
          break;
      }
      calcTotal();
    });
  }

  initLocalSettings(genderSelector, activeClass);
  initLocalSettings(ratioSelector, activeClass);
  calcTotal();
  getStaticInformation(genderSelector, activeClass);
  getStaticInformation(ratioSelector, activeClass);
  getDynamicInformation(heightSelector);
  getDynamicInformation(weightSelector);
  getDynamicInformation(ageSelector);
}

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cards": () => (/* binding */ cards)
/* harmony export */ });
/* harmony import */ var _services_getResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/getResource.js */ "./js/modules/services/getResource.js");


const cards = () => {
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.parent = document.querySelector(parentSelector);
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.transfer = 75;
      this.changeToRUB();
    }

    changeToRUB() {
      this.price = +this.price * this.transfer;
    }

    render() {
      const element = document.createElement('div');
      if (this.classes.length <= 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }

      element.innerHTML = `
        <img src="${this.src}" alt="${this.alt}">
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
        </div>`;
      this.parent.append(element);
    }
  }

  // Функция для воторого сопособа
  /*const createCard = data => {
    data.forEach(({img, altimg, title, descr, price}) => {
      const element = document.createElement('div');
      element.classList.add('menu__item');

      element.innerHTML = `
      <img src="${img}" alt="${altimg}">
      <h3 class="menu__item-subtitle">${title}</h3>
      <div class="menu__item-descr">${descr}</div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
        <div class="menu__item-cost">Цена:</div>
        <div class="menu__item-total"><span>${+price * 75}</span> руб/день</div>
      </div>`;

      document.querySelector('.menu .container').append(element);
    });
  }*/
  (0,_services_getResource_js__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
    .then(data => {
      data.forEach(({img, altimg, title, descr, price}) => {
        new MenuCard(img, altimg, title, descr, price, '.menu .container').render()
      });
    });
  /*axios.get('http://localhost:3000/menu')
    .then(data => {
      data.data.forEach(({img, altimg, title, descr, price}) => {
        new MenuCard(img, altimg, title, descr, price, '.menu .container').render()
      });
    });*/

  // Воторой способ
  /*getResource('http://localhost:3000/menu')
    .then(data => {
      createCard(data);
    })*/
}

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getModal": () => (/* binding */ getModal)
/* harmony export */ });
const getModal = () => modal({
  triggers: '[data-modal]',
  selector: '.modal',
  showClass: 'show',
  closeTrigger: 'data-close',
  durationOpen: 6000
});

const modal = options => {
  const {triggers, selector, showClass, closeTrigger, durationOpen} = options;
  const modalTriggers = document.querySelectorAll(triggers);
  const modal = document.querySelector(selector);

  const openModal = () => {
    if (!modal.classList.contains(showClass)) {
      modal.classList.add(showClass);
      document.body.style.overflow = 'hidden';
      clearTimeout(modalTimerId);
    }
  }

  const closeModal = () => {
    if (modal.classList.contains(showClass)) {
      modal.classList.remove(showClass);
      document.body.style.overflow = '';
    }
  }

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', openModal);
  });

  modal.addEventListener('click', evt => {
    if (evt.target === modal || evt.target.getAttribute(closeTrigger) === '') closeModal();
  });
  document.addEventListener('keydown', evt => {
    if (evt.key === 'Escape' && modal.classList.contains(showClass)) closeModal();
  });
  const modalTimerId = setTimeout(openModal, durationOpen);
  const showModalByScroll = () => {
    if (window.scrollY + document.documentElement.clientHeight
      >=
      document.documentElement.scrollHeight - 1) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);

  return {
    modal,
    openModal,
    closeModal
  }
}

/***/ }),

/***/ "./js/modules/request.js":
/*!*******************************!*\
  !*** ./js/modules/request.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "request": () => (/* binding */ request)
/* harmony export */ });
/* harmony import */ var _services_bindPostData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/bindPostData.js */ "./js/modules/services/bindPostData.js");


const request = (options) => {
  const {selector, message} = options
  const forms = document.querySelectorAll(selector);
  forms.forEach(item => {
    (0,_services_bindPostData_js__WEBPACK_IMPORTED_MODULE_0__.bindPostData)(item, message);
  });
}

/***/ }),

/***/ "./js/modules/services/bindPostData.js":
/*!*********************************************!*\
  !*** ./js/modules/services/bindPostData.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bindPostData": () => (/* binding */ bindPostData)
/* harmony export */ });
/* harmony import */ var _showThanksModal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./showThanksModal.js */ "./js/modules/services/showThanksModal.js");
/* harmony import */ var _postData_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./postData.js */ "./js/modules/services/postData.js");



const bindPostData = (form, message) => {
  form.addEventListener('submit', evt => {
    evt.preventDefault();

    const statusMessage = document.createElement('img');
    statusMessage.src = message.loading;
    statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
    form.append(statusMessage);

    const formData = new FormData(form);

    const json = JSON.stringify(Object.fromEntries(formData.entries()));

    (0,_postData_js__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
      .then(data => {
        console.log(data);
        (0,_showThanksModal_js__WEBPACK_IMPORTED_MODULE_0__.showThanksModal)(message.success);
        statusMessage.remove();
      })
      .catch(() => {
        (0,_showThanksModal_js__WEBPACK_IMPORTED_MODULE_0__.showThanksModal)(message.error);
      })
      .finally(() => {
        form.reset();
      })
  });
}

/***/ }),

/***/ "./js/modules/services/getResource.js":
/*!********************************************!*\
  !*** ./js/modules/services/getResource.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource)
/* harmony export */ });
const getResource = async url => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }
  return await res.json();
}

/***/ }),

/***/ "./js/modules/services/postData.js":
/*!*****************************************!*\
  !*** ./js/modules/services/postData.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: data
  });

  return await res.json();
}

/***/ }),

/***/ "./js/modules/services/showThanksModal.js":
/*!************************************************!*\
  !*** ./js/modules/services/showThanksModal.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "showThanksModal": () => (/* binding */ showThanksModal)
/* harmony export */ });
/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modal.js */ "./js/modules/modal.js");


const showThanksModal = message => {
  const prevModalDialog = document.querySelector('.modal__dialog');
  prevModalDialog.classList.add('hide');
  (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.getModal)().openModal();

  const thanksModal = document.createElement('div');
  thanksModal.classList.add('modal__dialog');
  thanksModal.innerHTML = `
    <div class="modal__content">
      <div class="modal__close" data-close="">&times;</div>
      <div class="modal__title">${message}</div>
    </div>`;

  (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.getModal)().modal.append(thanksModal);
  setTimeout(() => {
    thanksModal.remove();
    prevModalDialog.classList.remove('hide');
    (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.getModal)().closeModal();
  }, 4000);
}



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "slider": () => (/* binding */ slider)
/* harmony export */ });
const slider = options => {
  const {
    container,
    wrapper,
    inner,
    slidesSelector,
    controllers,
    counterCurrent,
    counterTotal
  } = options;

  const slider = document.querySelector(container);
  const slidesWrapper = slider.querySelector(wrapper);
  const slidesField = slidesWrapper.querySelector(inner);
  const slides = slidesField.querySelectorAll(slidesSelector);
  const prev = slider.querySelector(controllers.prev);
  const next = slider.querySelector(controllers.next);
  const currentSlide = slider.querySelector(counterCurrent);
  const totalSlides = slider.querySelector(counterTotal);

  const width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1;
  let offset = 0;

  slidesField.style.width = `${100 * slides.length}%`;
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s ease-in-out all';

  slidesWrapper.style.overflow = 'hidden';

  slides.forEach(slide => {
    slide.style.width = width;
  });

  slider.style.position = 'relative';

  const pagination = document.createElement('ol');
  const dots = [];
  pagination.classList.add('slider-pagination');
  slider.append(pagination);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.classList.add('dot');
    dot.dataset.slideTo = i + 1;
    if (i === 0) {
      dot.style.opacity = '1';
    }
    pagination.append(dot);
    dots.push(dot);
  }

  const renderCounter = index => index >= 10 ? index : `0${index}`;

  totalSlides.textContent = renderCounter(slides.length);
  currentSlide.textContent = renderCounter(slideIndex);

  const changeDots = index => {
    dots.forEach(dot => {
      dot.style.opacity = '0.5';
    });
    dots[index - 1].style.opacity = '1';
  }

  const delNotDigits = string => +string.replace(/\D/g, '');

  next.addEventListener('click', () => {
    if (offset === delNotDigits(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += delNotDigits(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`

    if (slideIndex === slides.length) {
      slideIndex = 1;
    } else {
      slideIndex += 1;
    }
    currentSlide.textContent = renderCounter(slideIndex);

    changeDots(slideIndex);
  });

  prev.addEventListener('click', () => {
    if (offset === 0) {
      offset = delNotDigits(width) * (slides.length - 1);
    } else {
      offset -= delNotDigits(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex === 1) {
      slideIndex = slides.length;
    } else {
      slideIndex -= 1;
    }
    currentSlide.textContent = renderCounter(slideIndex);
    changeDots(slideIndex);
  });

  dots.forEach(dot => {
    dot.addEventListener('click', e => {
      slideIndex = +e.target.dataset.slideTo;
      offset = delNotDigits(width) * (slideIndex - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;
      currentSlide.textContent = renderCounter(slideIndex);
      changeDots(slideIndex);
    });
  });
}

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tabs": () => (/* binding */ tabs)
/* harmony export */ });
const tabs = (options) => {
  const {
    parent,
    tabItem,
    tabItemsContent,
    activeClass,
    showClass,
    hideClass,
    fadeClass
  } = options;
  /* === TABS === */
  const tabsParent = document.querySelector(parent);
  const tabs = tabsParent.querySelectorAll(tabItem);
  const tabsContent = document.querySelectorAll(tabItemsContent);

  const hideTabContent = () => {
    tabsContent.forEach(content => {
      content.classList.add(hideClass);
      content.classList.remove(showClass, fadeClass);
    });

    tabs.forEach(tab => {
      tab.classList.remove(activeClass);
    });
  }

  const showTabContent = (index = 0) => {
    tabsContent[index].classList.add(showClass, fadeClass);
    tabsContent[index].classList.remove(hideClass);
    tabs[index].classList.add(activeClass);
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', evt => {
    const target = evt.target;

    if (target && target.classList.contains(tabItem.slice(1))) {
      tabs.forEach((tab, index) => {
        if (target === tab) {
          hideTabContent();
          showTabContent(index);
        }
      });
    }
  });
}

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "timer": () => (/* binding */ timer)
/* harmony export */ });
const timer = (options) => {

  const {timerElms, deadline} = options;
  const getTimeRemaining = endTime => {
    const t = new Date(endTime) - new Date();
    if (t < 0) return {
      total: t,
      days: '-',
      hours: '-',
      minutes: '-',
      seconds: '-'
    }

    const days = Math.floor(t / (1000 * 60 ** 2 * 24));
    const hours = Math.floor((t / (1000 * 60 ** 2) % 24));
    const minutes = Math.floor((t / 1000 / 60) % 60);
    const seconds = Math.floor((t / 1000) % 60);

    return {
      total: t,
      days,
      hours,
      minutes,
      seconds
    }
  }

  const setTimer = (timerElms, endTime) => {
    const {selector, daysId, hoursId, minutesId, secondsId} = timerElms;
    const timer = document.querySelector(selector);
    const days = timer.querySelector(daysId);
    const hours = timer.querySelector(hoursId);
    const minutes = timer.querySelector(minutesId);
    const seconds = timer.querySelector(secondsId);

    const updateTimer = () => {
      const t = getTimeRemaining(endTime);

      days.textContent = t.days >= 10 || t.days === '-' ? t.days : `0${t.days}`;
      hours.textContent = t.hours >= 10 || t.hours === '-' ? t.hours : `0${t.hours}`;
      minutes.textContent = t.minutes >= 10 || t.minutes === '-' ? t.minutes : `0${t.minutes}`;
      seconds.textContent = t.seconds >= 10 || t.seconds === '-' ? t.seconds : `0${t.seconds}`;

      if (t.total <= 0) clearInterval(timeInterval);
    }
    updateTimer();

    const timeInterval = setInterval(updateTimer, 1000);
  }

  setTimer(timerElms, deadline);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs.js */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer.js */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cards.js */ "./js/modules/cards.js");
/* harmony import */ var _modules_modal_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal.js */ "./js/modules/modal.js");
/* harmony import */ var _modules_request_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/request.js */ "./js/modules/request.js");
/* harmony import */ var _modules_slider_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider.js */ "./js/modules/slider.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");








document.addEventListener('DOMContentLoaded', () => {
  (0,_modules_tabs_js__WEBPACK_IMPORTED_MODULE_0__.tabs)({
    parent: '.tabheader__items',
    tabItem: '.tabheader__item',
    tabItemsContent: '.tabcontent',
    activeClass: 'tabheader__item_active',
    showClass: 'show',
    hideClass: 'hide',
    fadeClass: 'fade'
  });

  (0,_modules_timer_js__WEBPACK_IMPORTED_MODULE_1__.timer)({
    timerElms: {
      selector: '.timer',
      daysId: '#days',
      hoursId: '#hours',
      minutesId: '#minutes',
      secondsId: '#seconds',
    },
    deadline: '2022-05-11',
  });

  (0,_modules_cards_js__WEBPACK_IMPORTED_MODULE_2__.cards)();
  (0,_modules_modal_js__WEBPACK_IMPORTED_MODULE_3__.getModal)();

  (0,_modules_request_js__WEBPACK_IMPORTED_MODULE_4__.request)({
    selector: 'form',
    message: {
      loading: 'img/form/spinner.svg',
      success: 'Спасибо скоро мы свами свяжемся',
      error: 'Что то пошло не так...',
    }
  });

  (0,_modules_slider_js__WEBPACK_IMPORTED_MODULE_5__.slider)({
    container: '.offer__slider',
    wrapper: '.offer__slider-wrapper',
    inner: '.offer__slider-inner',
    slidesSelector: '.offer__slide',
    controllers: {
      prev: '.offer__slider-prev',
      next: '.offer__slider-next',
    },
    counterCurrent: '#current',
    counterTotal: '#total',
  });

  (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_6__.calculator)({
    resultInner: '.calculating__result span',
    genderSelector: '#gender div',
    ratioSelector: '.calculating__choose_big div',
    heightSelector: '#height',
    weightSelector:'#weight',
    ageSelector:'#age',
    activeClass: 'calculating__choose-item_active',
  });
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map