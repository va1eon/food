export const tabs = (options) => {
  const {
    parent,
    tabItem,
    tabItemsContent,
    activeClass,
    showClass,
    hideClass,
    fadeClass
  } = options;

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