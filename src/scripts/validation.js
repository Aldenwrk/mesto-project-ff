export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input-error',
  errorClass: 'span__input-error_active'
};

export function showErrorSpan(formElement, inputElement, errorMessage, validationConfig){
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
};

export const hasInvalidInput = (inputList) =>{
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

export function toggleButtonState(inputList, buttonElement, validationConfig){
  if(hasInvalidInput(inputList)){
    buttonElement.classList.add(validationConfig.inactiveButtonClass)
  }else{
    buttonElement.classList.remove(validationConfig.inactiveButtonClass)
  }
};

export function hideErrorSpan(formElement, inputElement, validationConfig){
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
};

export function checkInputValidity(formElement, inputElement){
  if(inputElement.validity.patternMismatch){
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  }else{
    inputElement.setCustomValidity("");
  }
  if(!inputElement.validity.valid){
    showErrorSpan(formElement, inputElement, inputElement.validationMessage, validationConfig)
  }else{
    hideErrorSpan(formElement, inputElement, validationConfig)
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

    toggleButtonState(inputList, buttonElement, validationConfig);
    inputList.forEach((inputElement)=> {
      inputElement.addEventListener('input', ()=>{
        checkInputValidity(formElement, inputElement)
        toggleButtonState(inputList, buttonElement, validationConfig);
    })
  })
});
};

export function clearValidation(formElement, validationConfig){
  const inputErrors = Array.from(formElement.querySelectorAll(`.${validationConfig.inputErrorClass}`));
  inputErrors.forEach((inputElement) =>{
   hideErrorSpan(formElement, inputElement, validationConfig);
  });
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  toggleButtonState(inputList, buttonElement, validationConfig);
 }