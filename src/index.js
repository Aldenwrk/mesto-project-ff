//import { initialCards} from "./scripts/cards.js";
import { requestProfileEditData, requestNewCard, loadProfileData, loadCardsFromServer, requestNewAvatar} from "./scripts/api.js";
import { createCard, likeToggle, checkIdInLikes, removeCard} from "./scripts/card.js";
import './pages/index.css';
import {closeModal, openModal, closeOnBackDropClick, closeOnEsc} from "./scripts/modal.js";
import {validationConfig, enableValidation, clearValidation} from "./scripts/validation.js";

export let userId;

const cardsList = document.querySelector('.places__list');
//берём данные из картинки при клике
export function collectImageData(event){
  const cardLink = event.target.src;
  const cardName = event.target.alt;
  createPopupTypeImage(cardLink, cardName);
};
const popupTypeImage = document.querySelector('.popup_type_image');
//передаём данные картинки в попап и открываем его
function createPopupTypeImage(cardLink, cardName){
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
  let profileName = document.querySelector('.profile__title');
  nameInput.value = profileName.textContent;
  let profileDescr = document.querySelector('.profile__description');
  jobInput.value = profileDescr.textContent;
});

popupNewCrd.addEventListener("click", closeOnBackDropClick);
popupEdit.addEventListener("click", closeOnBackDropClick);
popupTypeImage.addEventListener("click", closeOnBackDropClick);

const profileEditFormElement = document.forms['edit-profile'];
const nameInput = profileEditFormElement.elements['name'];
const jobInput = profileEditFormElement.elements['description'];

const profileName = document.querySelector('.profile__title');
const profileDescr = document.querySelector('.profile__description');
const profileEditSubmit = profileEditFormElement.querySelector('.button');

// Обработчик отправки формы с новыми данными профиля
function handleProfileEditFormSubmit(evt) {
    evt.preventDefault(); 

    profileEditSubmit.textContent = "Сохранение..."
//апдейт
requestProfileEditData().then((res)=>{
    profileName.textContent = res.name;
    profileDescr.textContent = res.about;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(function(){
      profileEditSubmit.textContent = "Сохранить"
      profileEditFormElement.reset();   
      closeModal(popupEdit);
    });   
}

profileEditFormElement.addEventListener('submit', handleProfileEditFormSubmit);

const newCrdForm = document.forms['new-place'];

const newCrdFormSubmit =  newCrdForm.querySelector('.button');
//обработчик отправки формы с новой карточкой
function sendNewCrd(evt) {
  evt.preventDefault(); 
const placeName = newCrdForm.querySelector('.popup__input_type_card-name').value;
const pictureLink = newCrdForm.querySelector('.popup__input_type_url').value;

newCrdFormSubmit.textContent = "Сохранение..."
 
  requestNewCard(placeName, pictureLink).then((res)=>{
    cardsList.prepend(createCard(res, removeCard, likeToggle, collectImageData, userId, checkIdInLikes));
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(function(){
    newCrdFormSubmit.textContent = "Сохранить"
    newCrdForm.reset();
    closeModal(popupNewCrd);
  });


  
}

newCrdForm.addEventListener('submit', sendNewCrd);

enableValidation(validationConfig);

//когда есть оба запроса собираем карточки
Promise.all([loadProfileData(), loadCardsFromServer()])
loadProfileData().then((result) => {
  document.querySelector('.profile__title').textContent = result.name;
  document.querySelector('.profile__description').textContent = result.about;
  document.querySelector('.profile__image').style.backgroundImage = "url('"+result.avatar+"')";
  userId = result._id;
  return result
})
loadCardsFromServer().then((cardsArray) =>{
  cardsArray.forEach( function(cardData) {
    cardsList.append(createCard(cardData, removeCard, likeToggle, collectImageData, userId, checkIdInLikes));
  })
})
.catch((err) => {
  console.log(err);
}); 

//обвешиваем новый попап обработчиками
const avatarElement = document.querySelector('.profile__image');
const avatarChangePopup = document.querySelector('.popup_type_avatar_edit');
const avatarChangeForm = avatarChangePopup.querySelector('.popup__form');
const avatarChangeFormSubmit = avatarChangeForm.querySelector('.button');

avatarElement.addEventListener('click', ()=>{
  openModal(avatarChangePopup);
  clearValidation(avatarChangeForm, validationConfig);
});
avatarChangePopup.addEventListener("click", closeOnBackDropClick);

const avatarSubmit = (evt) =>{
  evt.preventDefault();
  const newAvatar = avatarChangeForm.elements.avatarLink.value;

  avatarChangeFormSubmit.textContent = "Сохранение..."

  requestNewAvatar(newAvatar)  .then((res)=>{
      document.querySelector('.profile__image').style.backgroundImage = "url('"+res.avatar+"')";
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(function(){
      avatarChangeFormSubmit.textContent = "Сохранить"
      profileEditFormElement.reset();
      closeModal(avatarChangePopup);
    });


    
};

avatarChangeForm.addEventListener("submit", avatarSubmit);










