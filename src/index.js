//import { initialCards} from "./scripts/cards.js";
import {userId, removeCard, profileEditDataRequest, newCardRequest, loadProfileData, loadCardsFromServer, newAvatarRequest} from "./scripts/api.js";
import { createCard, likeToggle, checkIdInLikes, addLike, deleteLike } from "./scripts/card.js";
import './pages/index.css';
import {closeModal, openModal, closeOnBackDropClick, closeOnEsc} from "./scripts/modal.js";
import {validationConfig, showErrorSpan, hasInvalidInput, toggleButtonState, hideErrorSpan, checkInputValidity, enableValidation, clearValidation} from "./scripts/validation.js";

const cardsList = document.querySelector('.places__list');
//берём данные из картинки при клике
export function popupTypeImageCb(event){
  const cardLink = event.target.src;
  const cardName = event.target.alt;
  popupImageCreation(cardLink, cardName);
};
const popupTypeImage = document.querySelector('.popup_type_image');
//передаём данные картинки в попап и открываем его
function popupImageCreation(cardLink, cardName){
  const description = document.querySelector('.popup__caption');
  const imageInModal = document.querySelector('.popup__image');
  openModal(popupTypeImage);
  imageInModal.src = cardLink;
  imageInModal.alt = cardName;
  description.textContent = cardName;
};

const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
});

const profileAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCrd = document.querySelector('.popup_type_new-card');
const closeBtns = document.querySelectorAll('.popup__close');

//Перебираем кнопки закрытия и вешаем обработчик
closeBtns.forEach(button =>{
  button.addEventListener('click', function(){
    closeModal(button.closest('.popup_is-opened'));
  });
});

profileAddButton.addEventListener('click', () => {
  openModal(popupNewCrd);
  clearValidation(popupNewCrd.querySelector('.popup__form'), validationConfig);
});
profileEditButton.addEventListener('click', () => {
  openModal(popupEdit);
  clearValidation(popupEdit.querySelector('.popup__form'), validationConfig);
});

popupNewCrd.addEventListener("click", closeOnBackDropClick);
popupEdit.addEventListener("click", closeOnBackDropClick);
popupTypeImage.addEventListener("click", closeOnBackDropClick);

const profileEditFormElement = document.forms['edit-profile'];
const nameInput = profileEditFormElement.elements['name'];
const jobInput = profileEditFormElement.elements['description'];

// Обработчик отправки формы с новыми данными профиля
function profileEditFormSubmit(evt) {
    evt.preventDefault(); 
    profileEditFormElement.querySelector('.button').textContent = "Сохранение..."
//апдейт
  profileEditDataRequest();

    profileEditFormElement.reset();
    const openedModal = document.querySelector('.popup_is-opened');
    if(openedModal){
      closeModal(openedModal);
    }
}

profileEditFormElement.addEventListener('submit', profileEditFormSubmit);

const newCrdForm = document.forms['new-place'];

//обработчик отправки формы с новой карточкой
function newCrdSubmit(evt) {
  evt.preventDefault(); 

  newCrdForm.querySelector('.button').textContent = "Сохранение..."
 
  newCardRequest().then((res)=>{
    cardsList.prepend(createCard(res, removeCard, likeToggle, popupTypeImageCb, userId, checkIdInLikes));
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(function(){
    newCrdForm.querySelector('.button').textContent = "Сохранить"
  });;

  newCrdForm.reset();
  const openedModal = document.querySelector('.popup_is-opened');
  if(openedModal){
    closeModal(openedModal);
  }
}

newCrdForm.addEventListener('submit', newCrdSubmit);

enableValidation(validationConfig);

//когда есть оба запроса собираем карточки
Promise.all([loadProfileData(), loadCardsFromServer()])
loadCardsFromServer().then((cardsArray) =>{
  console.log(cardsArray);
  cardsArray.forEach( function(cardData) {
    cardsList.append(createCard(cardData, removeCard, likeToggle, popupTypeImageCb, userId, checkIdInLikes));
  })
})
.catch((err) => {
  console.log(err);
}); 

//обвешиваем новый попап обработчиками
const avatarElement = document.querySelector('.profile__image');
const avatarChangePopup = document.querySelector('.popup_type_avatar_edit');
const avatarChangeForm = avatarChangePopup.querySelector('.popup__form');

avatarElement.addEventListener('click', ()=>{
  openModal(avatarChangePopup);
  clearValidation(avatarChangeForm, validationConfig);
});
avatarChangePopup.addEventListener("click", closeOnBackDropClick);

const avatarSubmit = (evt) =>{
  evt.preventDefault();

  avatarChangeForm.querySelector('.button').textContent = "Сохранение..."

    newAvatarRequest();

  profileEditFormElement.reset();
    const openedModal = document.querySelector('.popup_is-opened');
    if(openedModal){
      closeModal(openedModal);
    }
};

avatarChangeForm.addEventListener("submit", avatarSubmit);










