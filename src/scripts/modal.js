export function openModal(windowToOpen){
  windowToOpen.classList.add('popup_is-opened')
  document.addEventListener("keydown", closeOnEsc);
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