import { initialCards } from "./scripts/cards.js";
import './pages/index.css';
const cardsList = document.querySelector('.places__list');

function addCard(cardData, cardRemover, likeToggle, popupTypeImageCb) {
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
}

function popupTypeImageCb(event){
  const cardLink = event.target.src;
  const cardName = event.target.alt;
  popupImageCreation(cardLink, cardName);
};
const popupTypeImage = document.querySelector('.popup_type_image');

function popupImageCreation(cardLink, cardName){
  const description = document.querySelector('.popup__caption');
  const ImageInModal = document.querySelector('.popup__image');
  openModal(popupTypeImage);
  ImageInModal.src = cardLink;
  ImageInModal.alt = cardName;
  description.textContent = cardName;
};

const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
});

function likeToggle (likeButton){
  likeButton.classList.toggle('card__like-button_is-active');
};

function removeCard (cardElement) {
  cardElement.remove();
}

initialCards.forEach( function(cardData) {
  cardsList.append(addCard(cardData, removeCard, likeToggle, popupTypeImageCb));
});

const profileAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCrd = document.querySelector('.popup_type_new-card');
const closeBtns = document.querySelectorAll('.popup__close');

//Перебираем кнопки закрытия и вешаем обработчик
closeBtns.forEach(button =>{
  button.addEventListener('click', function(){
    closePopup(button.closest('.popup_is-opened'));
  });
});
//закрывалка модалок
function closePopup(windowToClose){
  windowToClose.classList.remove('popup_is-opened');
};

profileAddButton.addEventListener('click', () => openModal(popupNewCrd));
profileEditButton.addEventListener('click', () => openModal(popupEdit));

 function openModal(windowToOpen){
  windowToOpen.classList.add('popup_is-opened')
};

//закрытие по клику вне модалки
popupNewCrd.addEventListener("click", closeOnBackDropClick);
popupEdit.addEventListener("click", closeOnBackDropClick);
popupTypeImage.addEventListener("click", closeOnBackDropClick);

function closeOnBackDropClick({ currentTarget, target }) {
  const dialogElement = currentTarget
  const isClickedOnBackDrop = target === dialogElement
  if (isClickedOnBackDrop) {
   closePopup(dialogElement);
  }
}

//закрытие по Esc
document.addEventListener("keydown", closeOnEsc);

function closeOnEsc(event){
  if(event.key === "Escape" ){
    const openedModal = document.querySelector('.popup_is-opened');
    if(openedModal){
      closePopup(openedModal);
    }
  }
};

const formElement = document.forms['edit-profile'];
const nameInput = formElement.elements['name'];
const jobInput = formElement.elements['description'];

// Обработчик «отправки» формы с новыми данными профиля
function handleFormSubmit(evt) {
    evt.preventDefault(); 
    let profileName = document.querySelector('.profile__title');
    profileName.textContent = nameInput.value;
    let profileDescr = document.querySelector('.profile__description');
    profileDescr.textContent = jobInput.value;

    formElement.reset();
    const openedModal = document.querySelector('.popup_is-opened');
    if(openedModal){
      closePopup(openedModal);
    }
}

formElement.addEventListener('submit', handleFormSubmit);

const newCrdForm = document.forms['new-place'];
const placeName = newCrdForm.elements['place-name'];
const pictureLink = newCrdForm.elements['link'];
//обработчик отправки формы с новой карточкой
function newCrdSubmit(evt) {
  evt.preventDefault(); 

  const newCard = {};
  newCard.name = placeName.value;
  newCard.link = pictureLink.value;

  cardsList.prepend(addCard(newCard, removeCard, likeToggle, popupTypeImageCb));

  newCrdForm.reset();
  const openedModal = document.querySelector('.popup_is-opened');
  if(openedModal){
    closePopup(openedModal);
  }
}

newCrdForm.addEventListener('submit', newCrdSubmit);