export const calculator = options => {

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