export function openModal(windowToOpen){
  windowToOpen.classList.add('popup_is-opened')
  document.addEventListener("keydown", closeOnEsc);

    if(windowToOpen.classList.contains('popup_type_edit')){
      const profileEditFormElement = document.forms['edit-profile'];
      const nameInput = profileEditFormElement.elements['name'];
      const jobInput = profileEditFormElement.elements['description'];

      let profileName = document.querySelector('.profile__title');
      nameInput.value = profileName.textContent;
      let profileDescr = document.querySelector('.profile__description');
      jobInput.value = profileDescr.textContent;
    }
};

export function closeModal(windowToClose){
  document.removeEventListener("keydown", closeOnEsc);
  windowToClose.classList.remove('popup_is-opened');
  const popupTypeImage = document.querySelector('.popup_type_image');
  if(windowToClose!==popupTypeImage){
  windowToClose.querySelector('.popup__form').reset();
}
};

//закрытие по клику вне модалки
export function closeOnBackDropClick({ currentTarget, target }) {
  const dialogElement = currentTarget
  const isClickedOnBackDrop = target === dialogElement
  if (isClickedOnBackDrop) {
   closeModal(dialogElement);
  }
}

//закрытие по Esc
export function closeOnEsc(event){
  if(event.key === "Escape" ){
    const openedModal = document.querySelector('.popup_is-opened');
    if(openedModal){
      closeModal(openedModal);
    }
  }
};