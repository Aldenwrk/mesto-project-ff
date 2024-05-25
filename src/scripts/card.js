import { addLike, deleteLike, removeCardRequest} from "./api.js";

export function createCard(cardData, cardRemover, likeToggle, collectImageData, userId, checkIdInLikes) {
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
  cardImage.addEventListener('click', () => collectImageData(event));

  if(userId==cardData.owner._id){
    deleteButton.addEventListener('click',() => cardRemover(cardElement, cardId));
  }else{
    deleteButton.style.display = "none";
  }
  
  return cardElement;
};
//блок с функциями для лайка
export function likeToggle (likeButton, cardData, userId, cardId, likeCounter){
  if(likeButton.classList.contains('card__like-button_is-active')){
    deleteLike(cardId).then((res)=>{
      likeCounter.textContent = res.likes.length;
    }).catch((err) => {
      console.log(err);
    }); 
    likeButton.classList.remove('card__like-button_is-active');   
  }else{
    addLike(cardId).then((res)=>{
      likeCounter.textContent = res.likes.length;
    }).catch((err) => {
      console.log(err);
    }); 
    likeButton.classList.add('card__like-button_is-active');
  }  
};

export const checkIdInLikes = (cardData, userId)=>{
 return cardData.likes.some((like)=>{
    return like._id==userId;
  });
};

export const removeCard=(cardElement, cardId)=>{
  removeCardRequest(cardId).then((res)=>{
    cardElement.remove();
  })
}



