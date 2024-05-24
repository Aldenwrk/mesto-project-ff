//import { initialCards} from "./scripts/cards.js";
import { createCard, likeToggle, removeCard, checkIdInLikes, addLike, deleteLike } from "./scripts/card.js";
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
//создаём карточки из массива
/*initialCards.forEach( function(cardData) {
  cardsList.append(createCard(cardData, removeCard, likeToggle, popupTypeImageCb));
});*/

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
    let profileName = document.querySelector('.profile__title');
    let profileDescr = document.querySelector('.profile__description');
    profileEditFormElement.querySelector('.button').textContent = "Сохранение..."

//апдейт
fetch('https://nomoreparties.co/v1/wff-cohort-13/users/me', {
      method: 'PATCH',
      headers: {
        authorization: 'b3000371-daae-4193-a69c-238bf82131cf',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nameInput.value,
        about: jobInput.value
      })
    })
    .then((res)=>{
      return res.json();
    })
    .then((res)=>{
      console.log(res);
    profileName.textContent = res.name;
    profileDescr.textContent = res.about;
    })
    .finally(function(){
      profileEditFormElement.querySelector('.button').textContent = "Сохранить"
    });

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
  
  const placeName = newCrdForm.querySelector('.popup__input_type_card-name').value;
  const pictureLink = newCrdForm.querySelector('.popup__input_type_url').value;
  newCrdForm.querySelector('.button').textContent = "Сохранение..."

  console.log(placeName, pictureLink);

  fetch('https://nomoreparties.co/v1/wff-cohort-13/cards', {
      method: 'POST',
      headers: {
        authorization: 'b3000371-daae-4193-a69c-238bf82131cf',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: placeName,
        link: pictureLink
      })
    })
    .then((res)=>{
      return res.json();
    })
    .then((res)=>{
      cardsList.prepend(createCard(res, removeCard, likeToggle, popupTypeImageCb, userId, checkIdInLikes));
    })
    .finally(function(){
      newCrdForm.querySelector('.button').textContent = "Сохранить"
    });

  

  newCrdForm.reset();
  const openedModal = document.querySelector('.popup_is-opened');
  if(openedModal){
    closeModal(openedModal);
  }
}

newCrdForm.addEventListener('submit', newCrdSubmit);

//7пр

enableValidation(validationConfig);

/*fetch('https://nomoreparties.co/v1/wff-cohort-13/cards', {
  headers: {
    authorization: 'b3000371-daae-4193-a69c-238bf82131cf'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  }); */
export let userId;
//Получаем данные профиля
const loadProfileData =() =>{
  return fetch('https://nomoreparties.co/v1/wff-cohort-13/users/me', {
    headers: {
  authorization: 'b3000371-daae-4193-a69c-238bf82131cf'
}
})
  .then(res => res.json())
.then((result) => {
  document.querySelector('.profile__title').textContent = result.name;
  document.querySelector('.profile__description').textContent = result.about;
  document.querySelector('.profile__image').style.backgroundImage = "url('"+result.avatar+"')";
  userId = result._id;
  console.log(userId);
  return result
});
} 

//получаем карточки
 const loadCardsFromServer = () =>{
  return fetch('https://nomoreparties.co/v1/wff-cohort-13/cards', {
    headers: {
  authorization: 'b3000371-daae-4193-a69c-238bf82131cf'
}
})
  .then(res => res.json());
} 
//когда есть оба запроса собираем карточки
Promise.all([loadProfileData(), loadCardsFromServer()])
loadCardsFromServer().then((cardsArray) =>{
  console.log(cardsArray);
  cardsArray.forEach( function(cardData) {
    cardsList.append(createCard(cardData, removeCard, likeToggle, popupTypeImageCb, userId, checkIdInLikes));
  })
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
  const newAvatar = avatarChangeForm.elements.avatarLink.value;
  avatarChangeForm.querySelector('.button').textContent = "Сохранение..."

  fetch('https://nomoreparties.co/v1/wff-cohort-13/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: 'b3000371-daae-4193-a69c-238bf82131cf',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: newAvatar
      })
    })
    .then(res=>res.json())
    .then((res)=>{
      document.querySelector('.profile__image').style.backgroundImage = "url('"+res.avatar+"')";
    })
    .finally(function(){
      avatarChangeForm.querySelector('.button').textContent = "Сохранить"
    });
  profileEditFormElement.reset();
    const openedModal = document.querySelector('.popup_is-opened');
    if(openedModal){
      closeModal(openedModal);
    }

};

avatarChangeForm.addEventListener("submit", avatarSubmit);










