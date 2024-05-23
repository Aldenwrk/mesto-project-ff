import { initialCards} from "./scripts/cards.js";
import { createCard, likeToggle, removeCard } from "./scripts/card.js";
import './pages/index.css';
import {closeModal, openModal, closeOnBackDropClick, closeOnEsc} from "./scripts/modal.js";
import {validationConfig, showErrorSpan, hasInvalidInput, toggleButtonState, hideErrorSpan, checkInputValidity, enableValidation, clearValidation} from "./scripts/validation.js";

const cardsList = document.querySelector('.places__list');
//берём данные из картинки при клике
function popupTypeImageCb(event){
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

// Обработчик «отправки» формы с новыми данными профиля
function profileEditFormSubmit(evt) {
    evt.preventDefault(); 
    let profileName = document.querySelector('.profile__title');
    let profileDescr = document.querySelector('.profile__description');

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

    profileEditFormElement.reset();
    const openedModal = document.querySelector('.popup_is-opened');
    if(openedModal){
      closeModal(openedModal);
    }
}

profileEditFormElement.addEventListener('submit', profileEditFormSubmit);

const newCrdForm = document.forms['new-place'];
const placeName = newCrdForm.elements['place-name'];
const pictureLink = newCrdForm.elements['link'];
//обработчик отправки формы с новой карточкой
function newCrdSubmit(evt) {
  evt.preventDefault(); 

  const newCard = {
    name:placeName.value,
    link:pictureLink.value
  };


  cardsList.prepend(createCard(newCard, removeCard, likeToggle, popupTypeImageCb));

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
let userId;

const loadProfileData = fetch('https://nomoreparties.co/v1/wff-cohort-13/users/me', {
      headers: {
    authorization: 'b3000371-daae-4193-a69c-238bf82131cf'
  }
  })
    .then(res => res.json())
  .then((result) => {
    //console.log(result);
    return result
  })
  .then((result) => {
    document.querySelector('.profile__title').textContent = result.name;
    document.querySelector('.profile__description').textContent = result.about;
    document.querySelector('.profile__image').style.backgroundImage = "url('"+result.avatar+"')";
    userId = result._id;
   // console.log(userId);
    return result
  });


const loadCardsFromServer = fetch('https://nomoreparties.co/v1/wff-cohort-13/cards', {
    headers: {
  authorization: 'b3000371-daae-4193-a69c-238bf82131cf'
}
})
  .then(res => res.json())
.then((result) => {
  //console.log(result);
  return result
});

Promise.all([loadProfileData, loadCardsFromServer])
loadCardsFromServer.then((cardsArray) =>{
  console.log(cardsArray);
  cardsArray.forEach( function(cardData) {
    cardsList.append(createCard(cardData, removeCard, likeToggle, popupTypeImageCb, userId));
  })
});

