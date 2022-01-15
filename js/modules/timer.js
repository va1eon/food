export const timer = (options) => {

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