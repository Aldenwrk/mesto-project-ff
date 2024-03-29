// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const cardsList = document.querySelector('.places__list');


function addCard(cardData, removeCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  deleteButton.addEventListener('click',() => removeCard(cardElement));
  return cardElement;
}

function removeCard (cardElement) {
  cardElement.remove();
}

initialCards.forEach( function(cardData) {
  cardsList.append(addCard(cardData, removeCard));
});

