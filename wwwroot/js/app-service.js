let services;
//Загрузка данных на страницу
loadDataServices();


//Функция получения данных с сервера при загрузке страницы
//Тажке это main функция, для загрузки всех данных
async function loadDataServices() {
  const responseServices = await fetch("service?operation=read", {
    method: "post",
    headers: { "Accept": "application/json", "Content-Type": "application/json" }
  });

  if (responseServices.status == 200) {
    let services_cards = document.getElementById("service-cards-id");
    services_cards.innerHTML = "";
    services = await responseServices.json();

    //Добавление карточек
    for (let i = 0; i < services.length; i++) {
      services_cards.appendChild(createServiceCardElement(services[i]));
    }
  }

}
//Функция для создания карточек докторов
function createServiceCardElement(service) {
  //Создаём блок карточки
  const card = document.createElement("div");
  card.className = "service-card";

  //Блок с информацией о докторе
  const cardInfo = document.createElement("div");
  cardInfo.className = "service-card__info";
  //Название услуги
  const serviceName = document.createElement("h3");
  serviceName.className = "service-card__name";
  serviceName.textContent = `${service.ServiceName}`;
  //Цена услуги
  const servicePrice = document.createElement("p");
  servicePrice.className = "service-card__detail";
  servicePrice.textContent = `Цена: ${service.Price}₽`;

  //Создаём блок с кнопками на карточке
  const cardServiceActions = document.createElement("div");
  cardServiceActions.className = "service-card__actions"
  //Кнопка отображения докторов, предоставляющих текущую услугу
  const serviceDoctorsBtn = document.createElement("button");
  serviceDoctorsBtn.addEventListener("click", () => readServiceDoctors(service));
  serviceDoctorsBtn.className = "service-card__button service-card__button--doctors";
  serviceDoctorsBtn.innerText = "Доктора";
  //Кнопка отображения пациентов, которым оказывают текущую услугу
  const servicePatientsBtn = document.createElement("button");
  servicePatientsBtn.addEventListener("click", () => readServicePatients(service));
  servicePatientsBtn.className = "service-card__button service-card__button--patients";
  servicePatientsBtn.innerText = "Пациенты";
  //Кнопка изменения доктора
  const changeServiceBtn = document.createElement("button");
  changeServiceBtn.addEventListener("click", () => changeService(service));
  changeServiceBtn.className = "service-card__button service-card__button--edit";
  changeServiceBtn.innerText = "Изменить";
  //Кнопка удаления доктора
  const deleteServiceBtn = document.createElement("button");
  deleteServiceBtn.addEventListener("click", () => deleteService(service));
  deleteServiceBtn.className = "service-card__button service-card__button--delete";
  deleteServiceBtn.innerText = "Удалить";

  //Собираем карточку полностью
  card.appendChild(cardInfo);
  card.appendChild(cardServiceActions);

  //Собиравем блок с кнопками
  cardServiceActions.appendChild(serviceDoctorsBtn);
  cardServiceActions.appendChild(servicePatientsBtn);
  cardServiceActions.appendChild(changeServiceBtn);
  cardServiceActions.appendChild(deleteServiceBtn);

  //Собираем блок информации об услуге
  cardInfo.appendChild(serviceName);
  cardInfo.appendChild(servicePrice);

  return card;
}

//Функция изменения услуги
function changeService(service) {
  service.ServiceName = service.ServiceName + "1";

  let url = "/service?operation=update";
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(service),
  }).then((response) => console.log(response));
}
//Функция удаления услуги
function deleteService(service) {
  let url = "/service?operation=delete";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(service.Id),
  }).then((response) => console.log(response));
}
//Функция отображения пациентов, которым оказывается текущая услуга.
async function readServicePatients(service) {
  const url = "/service?operation=read_patients";

  try {
    const responseServicePatients = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(service.Id),
    });

    if (responseServicePatients.ok) {
      const patients = await responseServicePatients.json();

      console.log(patients);

    } else {
      throw new Error("Ошибка получения данных о пациентах");
    }
  } catch (error) {
    console.error(error);
    alert("Произошла ошибка при получении данных о пациентах");
  }
}
//Функция отображающая докторов, которые оказывают текущую услугу.
async function readServiceDoctors(service) {
  const url = "/service?operation=read_doctors";

  try {
    const responseServiceDoctors = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(service.Id),
    });

    if (responseServiceDoctors.ok) {
      const doctors = await responseServiceDoctors.json();

      console.log(doctors);

    } else {
      throw new Error("Ошибка получения данных о пациентах");
    }
  } catch (error) {
    console.error(error);
    alert("Произошла ошибка при получении данных о пациентах");
  }
}
//Реализовать добавление услуги