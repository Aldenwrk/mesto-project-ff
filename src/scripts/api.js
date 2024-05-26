

const config = {
  baseUrl: `https://nomoreparties.co/v1/wff-cohort-13`,
  authorization: 'b3000371-daae-4193-a69c-238bf82131cf',
  ContentType: 'application/json'
}

const checkResponse = (res) => {
    if(res.ok){
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`);
  
};


//отправляем запрос с лайком
export const addLike =(cardId)=>{
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
   method: 'PUT',
   headers: {
     authorization: `${config.authorization}`
   }
 })
   .then(res => checkResponse(res))
  .catch((err) => {
    console.log(err);
  })
 };
 //запрос с удалением лайка
 export const deleteLike =(cardId)=>{
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
   method: 'DELETE',
   headers: {
     authorization: `${config.authorization}`
   }
 })
 .then(res => checkResponse(res))
.catch((err) => {
  console.log(err);
})
 };

 export const removeCardRequest =(cardId) =>{
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
     method: 'DELETE',
   headers: {
     authorization: `${config.authorization}`
   }
 })
 .then(res => checkResponse(res))
 }
//запрос с информацией профиля
export const requestProfileEditData=(nameInput, jobInput)=>{
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: `${config.authorization}`,
      'Content-Type': `${config.ContentType}`
    },
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value
    })
  })
  .then(res => checkResponse(res))
};
//запрос с новой карточкой
export const requestNewCard =(placeName, pictureLink)=>{
  /*const newCrdForm = document.forms['new-place'];
  const placeName = newCrdForm.querySelector('.popup__input_type_card-name').value;
  const pictureLink = newCrdForm.querySelector('.popup__input_type_url').value;*/

  return  fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: `${config.authorization}`,
      'Content-Type': `${config.ContentType}`
    },
    body: JSON.stringify({
      name: placeName,
      link: pictureLink
    })
  })
  .then(res => checkResponse(res))

};

//Получаем данные профиля
export const loadProfileData =() =>{
  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
  authorization: `${config.authorization}`
}
})
.then(res => checkResponse(res))
} 

//получаем карточки
export const loadCardsFromServer = () =>{
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
  authorization: `${config.authorization}`
}
})
.then(res => checkResponse(res))
} 
//запрашиваем и обновляем аватар
export const requestNewAvatar =(newAvatar)=>{
 /* const avatarChangePopup = document.querySelector('.popup_type_avatar_edit');
  const avatarChangeForm = avatarChangePopup.querySelector('.popup__form');*/

 return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: `${config.authorization}`,
      'Content-Type': `${config.ContentType}`
    },
    body: JSON.stringify({
      avatar: newAvatar
    })
  })
  .then(res => checkResponse(res))
};