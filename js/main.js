import {tabs} from "./modules/tabs.js";
import {timer} from "./modules/timer.js";
import {cards} from "./modules/cards.js";
import {getModal} from "./modules/modal.js";
import {request} from "./modules/request.js";
import {slider} from "./modules/slider.js";
import {calculator} from "./modules/calculator";

document.addEventListener('DOMContentLoaded', () => {
  tabs({
    parent: '.tabheader__items',
    tabItem: '.tabheader__item',
    tabItemsContent: '.tabcontent',
    activeClass: 'tabheader__item_active',
    showClass: 'show',
    hideClass: 'hide',
    fadeClass: 'fade'
  });

  timer({
    timerElms: {
      selector: '.timer',
      daysId: '#days',
      hoursId: '#hours',
      minutesId: '#minutes',
      secondsId: '#seconds',
    },
    deadline: '2022-05-11',
  });

  cards();
  getModal();

  request({
    selector: 'form',
    message: {
      loading: 'img/form/spinner.svg',
      success: 'Спасибо скоро мы свами свяжемся',
      error: 'Что то пошло не так...',
    }
  });

  slider({
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

  calculator({
    resultInner: '.calculating__result span',
    genderSelector: '#gender div',
    ratioSelector: '.calculating__choose_big div',
    heightSelector: '#height',
    weightSelector:'#weight',
    ageSelector:'#age',
    activeClass: 'calculating__choose-item_active',
  });
});