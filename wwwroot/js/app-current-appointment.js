let receptions;
//Загрузка данных на страницу
loadDataCurrAppoint();


//Функция получения данных с сервера при загрузке страницы
//Тажке это main функция, для загрузки всех данных
async function loadDataCurrAppoint(){
  const responseReceptions = await fetch("reception?operation=read", {
    method: "post",
    headers: { "Accept": "application/json", "Content-Type": "application/json" }
  });
  if(responseReceptions.status == 200){
    let reception_cards = document.getElementById("service-cards-id");
    reception_cards.innerHTML = "";
    receptions = await responseReceptions.json();
    console.log(receptions);
    //Добавление карточек
    for(let i = 0; i < receptions.length; i++){
      reception_cards.appendChild(createReceptionCardElement(receptions[i]));
    }
  }
  
}

//Функция для создания карточек текущих приёмов
function createReceptionCardElement(reception){
  //Создаём блок карточки
  const card = document.createElement("div");
  card.className = "service-card";

  //Блок с инормацией о приёме
  const cardInfo = document.createElement("div");
  cardInfo.className = "service-card__info";
  //Название приёма в данном случае приём + №id
  const receptionName = document.createElement("h3");
  receptionName.className = "service-card__name";
  receptionName.textContent = `Приём №${reception.Id}`;
  //Пациент
  const patientTitle = document.createElement("h4");
  patientTitle.className = "doctor-card__services-title";
  patientTitle.textContent = "Пациент"
  //ФИО пациента
  const patientName = document.createElement("p");
  patientName.className = "service-card__services";
  patientName.textContent = `${reception.Patient.Surname} ${reception.Patient.Name} ${reception.Patient.FatherName}`;
  //Доктор
  const doctorTitle = document.createElement("h4");
  doctorTitle.className = "doctor-card__services-title";
  doctorTitle.textContent = "Доктор";
  //ФИО доктора
  const doctorName = document.createElement("p");
  doctorName.className = "service-card__services";
  doctorName.textContent = `${reception.Doctor.Surname} ${reception.Doctor.Name} ${reception.Doctor.FatherName}`;

  //Создаём блок с кнопками на карточке
  const cardReceptionActions = document.createElement("div");
  cardReceptionActions.className = "service-card__actions"
  //Кнопка завершения приёма
  const finishReceptionBtn = document.createElement("button");
  finishReceptionBtn.addEventListener("click", () => finishReception(reception));
  finishReceptionBtn.className = "service-card__button service-card__button--edit";
  finishReceptionBtn.innerText = "Завершить";
  //Кнопка удаления приёма
  const deleteReceptionBtn = document.createElement("button");
  deleteReceptionBtn.addEventListener("click", () => removeReception(reception));
  deleteReceptionBtn.className = "service-card__button service-card__button--delete";
  deleteReceptionBtn.innerText = "Удалить";

  //Собираем карточку полностью
  card.appendChild(cardInfo);
  card.appendChild(cardReceptionActions);
  //Собиравем блок с кнопками
  cardReceptionActions.appendChild(finishReceptionBtn);
  cardReceptionActions.appendChild(deleteReceptionBtn);
  //Собираем блок информации о пациенте
  cardInfo.appendChild(receptionName);
  cardInfo.appendChild(patientTitle);
  cardInfo.appendChild(patientName);
  cardInfo.appendChild(doctorTitle);
  cardInfo.appendChild(doctorName);
  
  return card;
}

//Функция удаления приёма
function removeReception(reception){
  let url = "/reception?operation=delete";
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reception.Id),
  }).then((response) => console.log(response));
}
//Фукния завершения приёма
function finishReception(reception) {
    //Нужно сконфигурировать объект ReceptionResult
  let url = "/reception?operation=finish";
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reception.Id),
  }).then((response) => console.log(response));
}


//Фукнция заверешния приёма

//Реализовать добавление текущих приёмов. Нужно дать пользователю следующий выбор.
//1) Окно с данными о пациентах, мы там можем взять, выбрать много пацинтов или создать нового пациента и добавить его к ним же, либо вообще выбрать только одного
// Дальше новое окно, в котором мы должны выбрать докторов, которые будут "лечить" выбранных пациентов.
//2) В окне с докторами, мы также можем выбрать любое кол-во докторов, либо опять же создать нового доктора. Но создавая нового доктора, мы должны будем добавить ему некоторые услуги, которые он оказывает.
// Всё это должно отправиться на сервак одним JSON а дальше я всё сделаю