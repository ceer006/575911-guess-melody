'use strict';

(() => {
  const KeyCode = {
    LEFT_ARROW: 37,
    RIGHT_ARROW: 39
  };

  const appElement = document.querySelector(`div.app`);

  let currentScreenElement = document.querySelector(`section.main`);

  const templateElement = document.querySelector(`#templates`).content;

  const templateListElement = templateElement.cloneNode(true).querySelectorAll(`.main`);

  const templatesArrayElement = Array.from(templateListElement);

  let current = 0;

  const arrowsElements = `
    <div class="arrows__wrap">
      <style>
        .arrows__wrap {
          position: absolute;
          top: 135px;
          left: 50%;
          margin-left: -56px;
        }
        .arrows__btn {
          background: none;
          border: 2px solid black;
          padding: 5px 20px;
        }
      </style>
      <button class="arrows__btn"><-</button>
      <button class="arrows__btn">-></button>
    </div>
  `;

  const selectSlide = (element) => {
    let fragment = document.createDocumentFragment();
    let newScreenElement = fragment.appendChild(element.cloneNode(true));
    appElement.replaceChild(newScreenElement, currentScreenElement);
    currentScreenElement = newScreenElement;
  };

  const select = (index) => {
    index = index < 0 ? templatesArrayElement.length - 1 : index;
    index = index >= templatesArrayElement.length ? 0 : index;
    current = index;
    selectSlide(templatesArrayElement[current]);
  };

  document.addEventListener(`keydown`, (evt) => {
    switch (evt.keyCode) {
      case KeyCode.LEFT_ARROW:
        select(current + 1);
        break;
      case KeyCode.RIGHT_ARROW:
        select(current - 1);
        break;
    }
  });

  selectSlide(templatesArrayElement[0]);

  appElement.insertAdjacentHTML(`beforeend`, arrowsElements);

  const arrowsButtonsElement = Array.from(document.querySelectorAll(`.arrows__btn`));
  const leftArrowButton = arrowsButtonsElement[0];
  const rightArrowButton = arrowsButtonsElement[1];

  leftArrowButton.classList.add(`arrows__btn--left`);
  rightArrowButton.classList.add(`arrows__btn--right`);

  document.addEventListener(`click`, (evt) => {
    switch (evt.srcElement.className) {
      case `arrows__btn arrows__btn--right`:
        select(current + 1);
        break;
      case `arrows__btn arrows__btn--left`:
        select(current - 1);
        break;
    }
  });

})();
