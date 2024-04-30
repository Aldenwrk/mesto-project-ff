import { initialCards } from "./scripts/cards.js";
import './pages/index.css';
const cardsList = document.querySelector('.places__list');


function addCard(cardData, cardRemover) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  deleteButton.addEventListener('click',() => cardRemover(cardElement));
  return cardElement;
}

function removeCard (cardElement) {
  cardElement.remove();
}

initialCards.forEach( function(cardData) {
  cardsList.append(addCard(cardData, removeCard));
});
// 6 спринт

const profileAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const cardImage = document.querySelector('card__image');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCrd = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const closeBtns = document.querySelectorAll('.popup__close');

//Перебираем кнопки закрытия и вешаем обработчик
closeBtns.forEach(button =>{
  button.addEventListener('click', function(){
    button.closest('.popup_is-opened').classList.remove('popup_is-opened');
  });
});


//вешаем обработчики для открытия попапов
profileAddButton.addEventListener('click', popupToggler);
profileEditButton.addEventListener('click', popupEditToggler);
cardImage.addEventListener('click', popupImageToggler);

function popupToggler(){
  popupNewCrd.classList.add('popup_is-opened');
};

function popupEditToggler(){
  popupEdit.classList.add('popup_is-opened');
};

function popupImageToggler(){
  popupImage.classList.add('popup_is-opened');
};










