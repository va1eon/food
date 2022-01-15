export const slider = options => {
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