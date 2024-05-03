export function createCard(cardData, cardRemover, likeToggle, popupTypeImageCb) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');

  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  deleteButton.addEventListener('click',() => cardRemover(cardElement));
  likeButton.addEventListener('click', () => likeToggle(likeButton));
  cardImage.addEventListener('click', () => popupTypeImageCb(event));

  return cardElement;
};

export function likeToggle (likeButton){
  likeButton.classList.toggle('card__like-button_is-active');
};

export function removeCard (cardElement) {
  cardElement.remove();
}