import { initialCards} from "./scripts/cards.js";
import { createCard, likeToggle, removeCard } from "./scripts/card.js";
import './pages/index.css';
import {closeModal, openModal, closeOnBackDropClick, closeOnEsc} from "./scripts/modal.js";
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
initialCards.forEach( function(cardData) {
  cardsList.append(createCard(cardData, removeCard, likeToggle, popupTypeImageCb));
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


profileAddButton.addEventListener('click', () => openModal(popupNewCrd));
profileEditButton.addEventListener('click', () => openModal(popupEdit));


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
    profileName.textContent = nameInput.value;
    let profileDescr = document.querySelector('.profile__description');
    profileDescr.textContent = jobInput.value;

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

const form = document.querySelector('.popup__form');
const inputList = Array.from(form.querySelectorAll('.popup__input'));
const buttonElement = form.querySelector('.popup__button');

startValidation();

function startValidation(){
  toggleButton();

  form.addEventListener('submit', (event) =>{
    event.preventDefault()
  })

  inputList.forEach((inputElement)=> {
    inputElement.addEventListener('input', ()=>{
      checkInputValidity(inputElement)
      toggleButton()
    })
  })
};

function checkInputValidity(inputElement){
  if(inputElement.validity.patternMismatch){
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  }else{
    inputElement.setCustomValidity("");
  }
  if(!inputElement.validity.valid){
    showErrorSpan(inputElement, inputElement.validationMessage)
  }else{
    hideErrorSpan(inputElement)
  }
};

function toggleButton(){
  if(hasInvalidInput()){
    buttonElement.classList.add('popup__button_inactive')
  }else{
    buttonElement.classList.remove('popup__button_inactive')
  }
}

function hasInvalidInput(){
  return inputList.some((inputElement)=>{
    return !inputElement.validity.valid
  })
}

function showErrorSpan(inputElement, errorMessage){
  const errorElement = document.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add('popup__input-error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('span__input-error_active');
}

function hideErrorSpan(inputElement){
  const errorElement = document.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove('popup__input-error');
    errorElement.textContent = '';
    errorElement.classList.remove('span__input-error_active');
}

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: '.popup__button_inactive',
  inputErrorClass: '.popup__input-error',
  errorClass: '.span__input-error_active'
};

function clearValidation(form, validationConfig){
 const inputErrors = Array.from(form.querySelectorAll(validationConfig.inputErrorClass));
 inputErrors.forEach((input) =>{
  hideErrorSpan(input);
 });

 
}
