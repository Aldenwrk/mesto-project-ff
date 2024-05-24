import { popupTypeImageCb, userId } from "../index.js";
export function createCard(cardData, cardRemover, likeToggle, popupTypeImageCb, userId, checkIdInLikes) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-button_counter')
  const cardImage = cardElement.querySelector('.card__image');
  const cardId = cardData._id;

  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  likeCounter.textContent = cardData.likes.length;

  if(checkIdInLikes(cardData, userId)==true){
    likeButton.classList.add('card__like-button_is-active');
  };
  
  likeButton.addEventListener('click', () => likeToggle(likeButton, cardData, userId, cardId, likeCounter));
  cardImage.addEventListener('click', () => popupTypeImageCb(event));

  if(userId==cardData.owner._id){
    deleteButton.addEventListener('click',() => cardRemover(cardElement, cardId));
  }else{
    deleteButton.style.display = "none";
  }
  

  return cardElement;
};
//блок с функциями для лайка
export function likeToggle (likeButton, cardData, userId, cardId, likeCounter){
  //likeButton.classList.toggle('card__like-button_is-active');
  if(likeButton.classList.contains('card__like-button_is-active')){
    deleteLike(cardId).then((res)=>{
      likeCounter.textContent = res.likes.length;
    //  console.log(res)
    })
    likeButton.classList.remove('card__like-button_is-active');
    
  }else{
    addLike(cardId).then((res)=>{
      likeCounter.textContent = res.likes.length;
    //  console.log(res)
    })
    likeButton.classList.add('card__like-button_is-active');
  }


  
/*  if(!checkIdInLikes(cardData, userId)){
    addLike(cardId);
    likeButton.classList.add('card__like-button_is-active');
  }else{
    deleteLike(cardId);
    likeButton.classList.remove('card__like-button_is-active');
  }
*/
  
};

export const checkIdInLikes = (cardData, userId)=>{
  //console.log(cardData.likes);
 return cardData.likes.some((like)=>{
   // console.log(like._id==userId)
    return like._id==userId;
  });
};

//отправляем запрос с лайком
export const addLike =(cardId)=>{
 return fetch(`https://nomoreparties.co/v1/wff-cohort-13/cards/likes/${cardId}`, {
  method: 'PUT',
  headers: {
    authorization: 'b3000371-daae-4193-a69c-238bf82131cf'
  }
})
  .then(res => res.json())
 /* .then((result) => {
    console.log(result);
  })*/;
}
//запрос с удалением лайка
export const deleteLike =(cardId)=>{
 return fetch(`https://nomoreparties.co/v1/wff-cohort-13/cards/likes/${cardId}`, {
  method: 'DELETE',
  headers: {
    authorization: 'b3000371-daae-4193-a69c-238bf82131cf'
  }
})
  .then(res => res.json())
 /* .then((result) => {
    console.log(result);
  }*/;
}

//
export function removeCard (cardElement, cardId, loadCardsFromServer) {

  console.log(cardId);
  fetch(`https://nomoreparties.co/v1/wff-cohort-13/cards/${cardId}`, {
    method: 'DELETE',
  headers: {
    authorization: 'b3000371-daae-4193-a69c-238bf82131cf'
  }
});
//loadCardsFromServer(); решить вопрос с обновлением списка
fetch('https://nomoreparties.co/v1/wff-cohort-13/cards', {
    headers: {
  authorization: 'b3000371-daae-4193-a69c-238bf82131cf'
}
})
  .then((res)=>{
    cardElement.remove();
  });
}