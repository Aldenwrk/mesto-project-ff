export let userId;

const config = {
  baseUrl: `https://nomoreparties.co/v1/wff-cohort-13`,
  authorization: 'b3000371-daae-4193-a69c-238bf82131cf',
  ContentType: 'application/json'
}

//отправляем запрос с лайком
export const addLike =(cardId)=>{
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
   method: 'PUT',
   headers: {
     authorization: `${config.authorization}`
   }
 })
   .then((res) => {
    if(res.ok){
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`);
  })
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
 .then((res) => {
  if(res.ok){
  return res.json()
}
return Promise.reject(`Ошибка: ${res.status}`);
})
.catch((err) => {
  console.log(err);
})
 };
//функцию удаления карточки переписал в запрос, так что теперь она тут
 export const removeCard =(cardElement, cardId) =>{
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
     method: 'DELETE',
   headers: {
     authorization: `${config.authorization}`
   }
 })
   .then((res)=>{
    if(res.ok){
     cardElement.remove();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
   });
 }
//запрос с информацией профиля
export const profileEditDataRequest=()=>{
  const profileName = document.querySelector('.profile__title');
  const profileDescr = document.querySelector('.profile__description');
  const profileEditFormElement = document.forms['edit-profile'];
  const nameInput = profileEditFormElement.elements['name'];
  const jobInput = profileEditFormElement.elements['description'];

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
  .then((res)=>{
    if(res.ok){
    return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((res)=>{
    console.log(res);
  profileName.textContent = res.name;
  profileDescr.textContent = res.about;
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(function(){
    profileEditFormElement.querySelector('.button').textContent = "Сохранить"
  });
};
//запрос с новой карточкой
export const newCardRequest =()=>{
  const newCrdForm = document.forms['new-place'];
  const placeName = newCrdForm.querySelector('.popup__input_type_card-name').value;
  const pictureLink = newCrdForm.querySelector('.popup__input_type_url').value;

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
  .then((res)=>{
    if(res.ok){
    return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })

};

//Получаем данные профиля
export const loadProfileData =() =>{
  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
  authorization: `${config.authorization}`
}
})
.then((res)=>{
  if(res.ok){
  return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
})
.then((result) => {
  document.querySelector('.profile__title').textContent = result.name;
  document.querySelector('.profile__description').textContent = result.about;
  document.querySelector('.profile__image').style.backgroundImage = "url('"+result.avatar+"')";
  userId = result._id;
  console.log(userId);
  return result
});
} 

//получаем карточки
export const loadCardsFromServer = () =>{
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
  authorization: `${config.authorization}`
}
})
.then((res)=>{
  if(res.ok){
  return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
})
} 
//запрашиваем и обновляем аватар
export const newAvatarRequest =()=>{
  const avatarChangePopup = document.querySelector('.popup_type_avatar_edit');
  const avatarChangeForm = avatarChangePopup.querySelector('.popup__form');
  const newAvatar = avatarChangeForm.elements.avatarLink.value;
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
  .then((res)=>{
    if(res.ok){
    return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((res)=>{
    document.querySelector('.profile__image').style.backgroundImage = "url('"+res.avatar+"')";
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(function(){
    avatarChangeForm.querySelector('.button').textContent = "Сохранить"
  });
};