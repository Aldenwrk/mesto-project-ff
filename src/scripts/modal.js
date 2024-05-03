export function openModal(windowToOpen){
  windowToOpen.classList.add('popup_is-opened')
};

export function closeModal(windowToClose){
  windowToClose.classList.remove('popup_is-opened');
};