/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "calculator": function() { return /* binding */ calculator; }
/* harmony export */ });
var calculator = function calculator(options) {
  var resultInner = options.resultInner,
      genderSelector = options.genderSelector,
      ratioSelector = options.ratioSelector,
      heightSelector = options.heightSelector,
      weightSelector = options.weightSelector,
      ageSelector = options.ageSelector,
      activeClass = options.activeClass;
  var result = document.querySelector(resultInner);

  var getLocalStorage = function getLocalStorage(key) {
    return localStorage.getItem(key);
  };

  var setLocalStorage = function setLocalStorage(key, value) {
    localStorage.setItem(key, value);
  };

  var getDefaultValue = function getDefaultValue(key, value) {
    setLocalStorage(key, value);
    return value;
  };

  var sex = getLocalStorage('sex') ? getLocalStorage('sex') : getDefaultValue('sex', 'female');
  var height = null;
  var weight = null;
  var age = null;
  var ratio = getLocalStorage('ratio') ? +getLocalStorage('ratio') : getDefaultValue('ratio', 1.375);

  var initLocalSettings = function initLocalSettings(selector, activeClass) {
    var elements = document.querySelectorAll(selector);
    elements.forEach(function (el) {
      el.classList.remove(activeClass);

      if (el.id === getLocalStorage('sex')) {
        el.classList.add(activeClass);
      }

      if (el.dataset.ratio === getLocalStorage('ratio')) {
        el.classList.add(activeClass);
      }
    });
  };

  var calcTotal = function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = '_____';
      return 1;
    }

    if (sex === 'female') {
      result.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio);
    } else {
      result.textContent = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio);
    }
  };

  var getStaticInformation = function getStaticInformation(selector, activeClass) {
    var elements = document.querySelectorAll(selector);
    elements.forEach(function (el) {
      el.addEventListener('click', function (e) {
        if (e.target.dataset.ratio) {
          ratio = +e.target.dataset.ratio;
          setLocalStorage('ratio', +e.target.dataset.ratio);
        } else {
          sex = e.target.id;
          setLocalStorage('sex', e.target.id);
        }

        elements.forEach(function (el) {
          el.classList.remove(activeClass);
        });
        e.target.classList.add(activeClass);
        calcTotal();
      });
    });
  };

  var getDynamicInformation = function getDynamicInformation(selector) {
    var input = document.querySelector(selector);
    input.addEventListener('input', function () {
      if (input.value.match(/\D/g)) {
        input.style.border = '1px solid tomato';
      } else {
        input.style.border = 'none';
      }

      switch (input.id) {
        case heightSelector.slice(1):
          height = +input.value;
          break;

        case weightSelector.slice(1):
          weight = +input.value;
          break;

        case ageSelector.slice(1):
          age = +input.value;
          break;
      }

      calcTotal();
    });
  };

  initLocalSettings(genderSelector, activeClass);
  initLocalSettings(ratioSelector, activeClass);
  calcTotal();
  getStaticInformation(genderSelector, activeClass);
  getStaticInformation(ratioSelector, activeClass);
  getDynamicInformation(heightSelector);
  getDynamicInformation(weightSelector);
  getDynamicInformation(ageSelector);
};

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cards": function() { return /* binding */ cards; }
/* harmony export */ });
/* harmony import */ var _services_getResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/getResource.js */ "./js/modules/services/getResource.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }


var cards = function cards() {
  var MenuCard = /*#__PURE__*/function () {
    function MenuCard(src, alt, title, descr, price, parentSelector) {
      _classCallCheck(this, MenuCard);

      this.parent = document.querySelector(parentSelector);
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;

      for (var _len = arguments.length, classes = new Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
        classes[_key - 6] = arguments[_key];
      }

      this.classes = classes;
      this.transfer = 75;
      this.changeToRUB();
    }

    _createClass(MenuCard, [{
      key: "changeToRUB",
      value: function changeToRUB() {
        this.price = +this.price * this.transfer;
      }
    }, {
      key: "render",
      value: function render() {
        var element = document.createElement('div');

        if (this.classes.length <= 0) {
          this.element = 'menu__item';
          element.classList.add(this.element);
        } else {
          this.classes.forEach(function (className) {
            return element.classList.add(className);
          });
        }

        element.innerHTML = "\n        <img src=\"".concat(this.src, "\" alt=\"").concat(this.alt, "\">\n        <h3 class=\"menu__item-subtitle\">").concat(this.title, "</h3>\n        <div class=\"menu__item-descr\">").concat(this.descr, "</div>\n        <div class=\"menu__item-divider\"></div>\n        <div class=\"menu__item-price\">\n          <div class=\"menu__item-cost\">\u0426\u0435\u043D\u0430:</div>\n          <div class=\"menu__item-total\"><span>").concat(this.price, "</span> \u0440\u0443\u0431/\u0434\u0435\u043D\u044C</div>\n        </div>");
        this.parent.append(element);
      }
    }]);

    return MenuCard;
  }(); // Функция для воторого сопособа

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


  (0,_services_getResource_js__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu').then(function (data) {
    data.forEach(function (_ref) {
      var img = _ref.img,
          altimg = _ref.altimg,
          title = _ref.title,
          descr = _ref.descr,
          price = _ref.price;
      new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
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
};

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getModal": function() { return /* binding */ getModal; }
/* harmony export */ });
var getModal = function getModal() {
  return modal({
    triggers: '[data-modal]',
    selector: '.modal',
    showClass: 'show',
    closeTrigger: 'data-close',
    durationOpen: 6000
  });
};

var modal = function modal(options) {
  var triggers = options.triggers,
      selector = options.selector,
      showClass = options.showClass,
      closeTrigger = options.closeTrigger,
      durationOpen = options.durationOpen;
  var modalTriggers = document.querySelectorAll(triggers);
  var modal = document.querySelector(selector);

  var openModal = function openModal() {
    if (!modal.classList.contains(showClass)) {
      modal.classList.add(showClass);
      document.body.style.overflow = 'hidden';
      clearTimeout(modalTimerId);
    }
  };

  var closeModal = function closeModal() {
    if (modal.classList.contains(showClass)) {
      modal.classList.remove(showClass);
      document.body.style.overflow = '';
    }
  };

  modalTriggers.forEach(function (trigger) {
    trigger.addEventListener('click', openModal);
  });
  modal.addEventListener('click', function (evt) {
    if (evt.target === modal || evt.target.getAttribute(closeTrigger) === '') closeModal();
  });
  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape' && modal.classList.contains(showClass)) closeModal();
  });
  var modalTimerId = setTimeout(openModal, durationOpen);

  var showModalByScroll = function showModalByScroll() {
    if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  };

  window.addEventListener('scroll', showModalByScroll);
  return {
    modal: modal,
    openModal: openModal,
    closeModal: closeModal
  };
};

/***/ }),

/***/ "./js/modules/request.js":
/*!*******************************!*\
  !*** ./js/modules/request.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "request": function() { return /* binding */ request; }
/* harmony export */ });
/* harmony import */ var _services_bindPostData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/bindPostData.js */ "./js/modules/services/bindPostData.js");

var request = function request(options) {
  var selector = options.selector,
      message = options.message;
  var forms = document.querySelectorAll(selector);
  forms.forEach(function (item) {
    (0,_services_bindPostData_js__WEBPACK_IMPORTED_MODULE_0__.bindPostData)(item, message);
  });
};

/***/ }),

/***/ "./js/modules/services/bindPostData.js":
/*!*********************************************!*\
  !*** ./js/modules/services/bindPostData.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bindPostData": function() { return /* binding */ bindPostData; }
/* harmony export */ });
/* harmony import */ var _showThanksModal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./showThanksModal.js */ "./js/modules/services/showThanksModal.js");
/* harmony import */ var _postData_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./postData.js */ "./js/modules/services/postData.js");


var bindPostData = function bindPostData(form, message) {
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var statusMessage = document.createElement('img');
    statusMessage.src = message.loading;
    statusMessage.style.cssText = "\n        display: block;\n        margin: 0 auto;\n      ";
    form.append(statusMessage);
    var formData = new FormData(form);
    var json = JSON.stringify(Object.fromEntries(formData.entries()));
    (0,_postData_js__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json).then(function (data) {
      console.log(data);
      (0,_showThanksModal_js__WEBPACK_IMPORTED_MODULE_0__.showThanksModal)(message.success);
      statusMessage.remove();
    }).catch(function () {
      (0,_showThanksModal_js__WEBPACK_IMPORTED_MODULE_0__.showThanksModal)(message.error);
    }).finally(function () {
      form.reset();
    });
  });
};

/***/ }),

/***/ "./js/modules/services/getResource.js":
/*!********************************************!*\
  !*** ./js/modules/services/getResource.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": function() { return /* binding */ getResource; }
/* harmony export */ });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getResource = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
    var res;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch(url);

          case 2:
            res = _context.sent;

            if (res.ok) {
              _context.next = 5;
              break;
            }

            throw new Error("Could not fetch ".concat(url, ", status: ").concat(res.status));

          case 5:
            _context.next = 7;
            return res.json();

          case 7:
            return _context.abrupt("return", _context.sent);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getResource(_x) {
    return _ref.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./js/modules/services/postData.js":
/*!*****************************************!*\
  !*** ./js/modules/services/postData.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": function() { return /* binding */ postData; }
/* harmony export */ });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var postData = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url, data) {
    var res;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch(url, {
              method: 'POST',
              headers: {
                'Content-type': 'application/json'
              },
              body: data
            });

          case 2:
            res = _context.sent;
            _context.next = 5;
            return res.json();

          case 5:
            return _context.abrupt("return", _context.sent);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function postData(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./js/modules/services/showThanksModal.js":
/*!************************************************!*\
  !*** ./js/modules/services/showThanksModal.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "showThanksModal": function() { return /* binding */ showThanksModal; }
/* harmony export */ });
/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modal.js */ "./js/modules/modal.js");

var showThanksModal = function showThanksModal(message) {
  var prevModalDialog = document.querySelector('.modal__dialog');
  prevModalDialog.classList.add('hide');
  (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.getModal)().openModal();
  var thanksModal = document.createElement('div');
  thanksModal.classList.add('modal__dialog');
  thanksModal.innerHTML = "\n    <div class=\"modal__content\">\n      <div class=\"modal__close\" data-close=\"\">&times;</div>\n      <div class=\"modal__title\">".concat(message, "</div>\n    </div>");
  (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.getModal)().modal.append(thanksModal);
  setTimeout(function () {
    thanksModal.remove();
    prevModalDialog.classList.remove('hide');
    (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.getModal)().closeModal();
  }, 4000);
};

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "slider": function() { return /* binding */ slider; }
/* harmony export */ });
var slider = function slider(options) {
  var container = options.container,
      wrapper = options.wrapper,
      inner = options.inner,
      slidesSelector = options.slidesSelector,
      controllers = options.controllers,
      counterCurrent = options.counterCurrent,
      counterTotal = options.counterTotal;
  var slider = document.querySelector(container);
  var slidesWrapper = slider.querySelector(wrapper);
  var slidesField = slidesWrapper.querySelector(inner);
  var slides = slidesField.querySelectorAll(slidesSelector);
  var prev = slider.querySelector(controllers.prev);
  var next = slider.querySelector(controllers.next);
  var currentSlide = slider.querySelector(counterCurrent);
  var totalSlides = slider.querySelector(counterTotal);
  var width = window.getComputedStyle(slidesWrapper).width;
  var slideIndex = 1;
  var offset = 0;
  slidesField.style.width = "".concat(100 * slides.length, "%");
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s ease-in-out all';
  slidesWrapper.style.overflow = 'hidden';
  slides.forEach(function (slide) {
    slide.style.width = width;
  });
  slider.style.position = 'relative';
  var pagination = document.createElement('ol');
  var dots = [];
  pagination.classList.add('slider-pagination');
  slider.append(pagination);

  for (var i = 0; i < slides.length; i++) {
    var dot = document.createElement('li');
    dot.classList.add('dot');
    dot.dataset.slideTo = i + 1;

    if (i === 0) {
      dot.style.opacity = '1';
    }

    pagination.append(dot);
    dots.push(dot);
  }

  var renderCounter = function renderCounter(index) {
    return index >= 10 ? index : "0".concat(index);
  };

  totalSlides.textContent = renderCounter(slides.length);
  currentSlide.textContent = renderCounter(slideIndex);

  var changeDots = function changeDots(index) {
    dots.forEach(function (dot) {
      dot.style.opacity = '0.5';
    });
    dots[index - 1].style.opacity = '1';
  };

  var delNotDigits = function delNotDigits(string) {
    return +string.replace(/\D/g, '');
  };

  next.addEventListener('click', function () {
    if (offset === delNotDigits(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += delNotDigits(width);
    }

    slidesField.style.transform = "translateX(-".concat(offset, "px)");

    if (slideIndex === slides.length) {
      slideIndex = 1;
    } else {
      slideIndex += 1;
    }

    currentSlide.textContent = renderCounter(slideIndex);
    changeDots(slideIndex);
  });
  prev.addEventListener('click', function () {
    if (offset === 0) {
      offset = delNotDigits(width) * (slides.length - 1);
    } else {
      offset -= delNotDigits(width);
    }

    slidesField.style.transform = "translateX(-".concat(offset, "px)");

    if (slideIndex === 1) {
      slideIndex = slides.length;
    } else {
      slideIndex -= 1;
    }

    currentSlide.textContent = renderCounter(slideIndex);
    changeDots(slideIndex);
  });
  dots.forEach(function (dot) {
    dot.addEventListener('click', function (e) {
      slideIndex = +e.target.dataset.slideTo;
      offset = delNotDigits(width) * (slideIndex - 1);
      slidesField.style.transform = "translateX(-".concat(offset, "px)");
      currentSlide.textContent = renderCounter(slideIndex);
      changeDots(slideIndex);
    });
  });
};

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tabs": function() { return /* binding */ tabs; }
/* harmony export */ });
var tabs = function tabs(options) {
  var parent = options.parent,
      tabItem = options.tabItem,
      tabItemsContent = options.tabItemsContent,
      activeClass = options.activeClass,
      showClass = options.showClass,
      hideClass = options.hideClass,
      fadeClass = options.fadeClass;
  var tabsParent = document.querySelector(parent);
  var tabs = tabsParent.querySelectorAll(tabItem);
  var tabsContent = document.querySelectorAll(tabItemsContent);

  var hideTabContent = function hideTabContent() {
    tabsContent.forEach(function (content) {
      content.classList.add(hideClass);
      content.classList.remove(showClass, fadeClass);
    });
    tabs.forEach(function (tab) {
      tab.classList.remove(activeClass);
    });
  };

  var showTabContent = function showTabContent() {
    var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    tabsContent[index].classList.add(showClass, fadeClass);
    tabsContent[index].classList.remove(hideClass);
    tabs[index].classList.add(activeClass);
  };

  hideTabContent();
  showTabContent();
  tabsParent.addEventListener('click', function (evt) {
    var target = evt.target;

    if (target && target.classList.contains(tabItem.slice(1))) {
      tabs.forEach(function (tab, index) {
        if (target === tab) {
          hideTabContent();
          showTabContent(index);
        }
      });
    }
  });
};

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "timer": function() { return /* binding */ timer; }
/* harmony export */ });
var timer = function timer(options) {
  var timerElms = options.timerElms,
      deadline = options.deadline;

  var getTimeRemaining = function getTimeRemaining(endTime) {
    var t = new Date(endTime) - new Date();
    if (t < 0) return {
      total: t,
      days: '-',
      hours: '-',
      minutes: '-',
      seconds: '-'
    };
    var days = Math.floor(t / (1000 * Math.pow(60, 2) * 24));
    var hours = Math.floor(t / (1000 * Math.pow(60, 2)) % 24);
    var minutes = Math.floor(t / 1000 / 60 % 60);
    var seconds = Math.floor(t / 1000 % 60);
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  };

  var setTimer = function setTimer(timerElms, endTime) {
    var selector = timerElms.selector,
        daysId = timerElms.daysId,
        hoursId = timerElms.hoursId,
        minutesId = timerElms.minutesId,
        secondsId = timerElms.secondsId;
    var timer = document.querySelector(selector);
    var days = timer.querySelector(daysId);
    var hours = timer.querySelector(hoursId);
    var minutes = timer.querySelector(minutesId);
    var seconds = timer.querySelector(secondsId);

    var updateTimer = function updateTimer() {
      var t = getTimeRemaining(endTime);
      days.textContent = t.days >= 10 || t.days === '-' ? t.days : "0".concat(t.days);
      hours.textContent = t.hours >= 10 || t.hours === '-' ? t.hours : "0".concat(t.hours);
      minutes.textContent = t.minutes >= 10 || t.minutes === '-' ? t.minutes : "0".concat(t.minutes);
      seconds.textContent = t.seconds >= 10 || t.seconds === '-' ? t.seconds : "0".concat(t.seconds);
      if (t.total <= 0) clearInterval(timeInterval);
    };

    updateTimer();
    var timeInterval = setInterval(updateTimer, 1000);
  };

  setTimer(timerElms, deadline);
};

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
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
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







document.addEventListener('DOMContentLoaded', function () {
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
      secondsId: '#seconds'
    },
    deadline: '2022-05-11'
  });
  (0,_modules_cards_js__WEBPACK_IMPORTED_MODULE_2__.cards)();
  (0,_modules_modal_js__WEBPACK_IMPORTED_MODULE_3__.getModal)();
  (0,_modules_request_js__WEBPACK_IMPORTED_MODULE_4__.request)({
    selector: 'form',
    message: {
      loading: 'img/form/spinner.svg',
      success: 'Спасибо скоро мы свами свяжемся',
      error: 'Что то пошло не так...'
    }
  });
  (0,_modules_slider_js__WEBPACK_IMPORTED_MODULE_5__.slider)({
    container: '.offer__slider',
    wrapper: '.offer__slider-wrapper',
    inner: '.offer__slider-inner',
    slidesSelector: '.offer__slide',
    controllers: {
      prev: '.offer__slider-prev',
      next: '.offer__slider-next'
    },
    counterCurrent: '#current',
    counterTotal: '#total'
  });
  (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_6__.calculator)({
    resultInner: '.calculating__result span',
    genderSelector: '#gender div',
    ratioSelector: '.calculating__choose_big div',
    heightSelector: '#height',
    weightSelector: '#weight',
    ageSelector: '#age',
    activeClass: 'calculating__choose-item_active'
  });
});
}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map