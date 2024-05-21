export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: '.popup__button_inactive',
  inputErrorClass: '.popup__input-error',
  errorClass: '.span__input-error_active'
};

export function showErrorSpan(formElement, inputElement, errorMessage){
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add('popup__input-error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('span__input-error_active');
};

export const hasInvalidInput = (inputList) =>{
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

export function toggleButtonState(inputList, buttonElement){
  if(hasInvalidInput(inputList)){
    buttonElement.classList.add('popup__button_inactive')
  }else{
    buttonElement.classList.remove('popup__button_inactive')
  }
};

export function hideErrorSpan(formElement, inputElement){
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove('popup__input-error');
    errorElement.classList.remove('span__input-error_active');
    errorElement.textContent = '';
};

export function checkInputValidity(formElement, inputElement){
  if(inputElement.validity.patternMismatch){
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  }else{
    inputElement.setCustomValidity("");
  }
  if(!inputElement.validity.valid){
    showErrorSpan(formElement, inputElement, inputElement.validationMessage)
  }else{
    hideErrorSpan(formElement, inputElement)
  }
};

export function enableValidation(validationConfig){
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement)=>{
  formElement.addEventListener('submit', (event) =>{
    event.preventDefault()
  })
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement)=> {
      inputElement.addEventListener('input', ()=>{
        checkInputValidity(formElement, inputElement)
        toggleButtonState(inputList, buttonElement);
    })
  })
});
};

export function clearValidation(formElement, validationConfig){
  const inputErrors = Array.from(formElement.querySelectorAll(validationConfig.inputErrorClass));
  console.log(inputErrors);
  inputErrors.forEach((inputElement) =>{
   hideErrorSpan(formElement, inputElement);
  });
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  toggleButtonState(inputList, buttonElement);
 }