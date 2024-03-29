// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const cardsList = document.querySelector('.places__list');

function addCard(cardName, cardImgLink) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = cardName;
  cardElement.querySelector('.card__image').src = cardImgLink;
  cardElement.querySelector('.card__delete-button').addEventListener('click', removeCard);
  cardsList.append(cardElement);
}

function removeCard (event) {
  const eventTarget = event.target;
  const parentCard = eventTarget.closest('.card');
  parentCard.remove();
}

initialCards.forEach( function(item) {
  addCard(item.name, item.link);
});

