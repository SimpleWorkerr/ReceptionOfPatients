let completeAppointment;
//Загрузка данных на страницу
loadDataCompletAppoint();


//Функция получения данных с сервера при загрузке страницы
//Тажке это main функция, для загрузки всех данных
async function loadDataCompletAppoint() {
   
    const responseAppoint = await fetch("receptionResult?operation=read", {
    method: "post",
    headers: { "Accept": "application/json", "Content-Type": "application/json" }
  });
    if (responseAppoint.status == 200) {
        console.log("Загрузка завершённых приёмов");
        let completed_apointment_card = document.getElementById("service-cards-id");
        completed_apointment_card.innerHTML = "";
        completeAppointment = await responseAppoint.json();
        
        //Добавление карточки
        for (let i = 0; i < completeAppointment.length; i++) {
            completed_apointment_card.appendChild(await createCompAppointCard(completeAppointment[i]));
            //console.log(JSON.stringify(completeAppointment[i]));
        }
    }
}
async function createCompAppointCard(receptionRes) {
    //Создаём блок карточки
    const card = document.createElement("div");
    card.className = "service-card";

    //Блок с информацией о результате приёма
    const cardInfo = document.createElement("div");
    cardInfo.className = "service-card__info";
    //ФИО Пациента
    const patientFIO = document.createElement("p");
    patientFIO.className = "service-card__detail";
    patientFIO.textContent = `Пациент: ${receptionRes.Patient.Surname} ${receptionRes.Patient.Name} ${receptionRes.Patient.FatherName}`;
    //ФИО доктора
    const doctorFIO = document.createElement("p");
    doctorFIO.className = "service-card__detail";
    doctorFIO.textContent = `Доктор:${receptionRes.Doctor.Surname} ${receptionRes.Doctor.Name} ${receptionRes.Doctor.FatherName}`;
    //Создание списка услгу, которые бали оказаны на приёме
    //Создание заголовока для списка услуг
    const servicesHeader = document.createElement("h3");
    servicesHeader.textContent = "Услуги"
    const receptionServices = createListReceptionService(receptionRes);
    //Создание блок с кнопками на карточке
    const cardReceptionActions = document.createElement("div");
    cardReceptionActions.className = "service-card__actions";
    //Кнопка удаления данных из бд
    const deleteReceptionResult = document.createElement("button");
    deleteReceptionResult.className = "service-card__button service-card__button--delete";
    deleteReceptionResult.addEventListener("click", async () => {
        removeReceptionRec(receptionRes);
        await loadDataCompletAppoint();
    });    
    deleteReceptionResult.textContent = "Удалить";

    //Собираем карточку полностью
    card.appendChild(cardInfo);
    card.appendChild(cardReceptionActions);

    //Собираем блок с кнопками
    cardReceptionActions.appendChild(deleteReceptionResult);

    //Собираем блок информации о пациенте
    cardInfo.appendChild(patientFIO);
    cardInfo.appendChild(doctorFIO);
    cardInfo.appendChild(servicesHeader);
    cardInfo.appendChild(receptionServices);

    return card;
}

//Функция создания списка услуг
function createListReceptionService(receptionRes) {
    const serviceList = document.createElement("ul");

    serviceList.className = "receptionRes-card__services";

    for (let i = 0; i < receptionRes.Services.length; i++) {
        const listPart = document.createElement("li");
        listPart.className = "receptionRes-card__services"
        listPart.textContent = `${receptionRes.Services[i].ServiceName}`;
        serviceList.appendChild(listPart);
    }

    return serviceList;
}

async function removeReceptionRec(receptionRec) {
    let url = "/receptionResult?operation=delete";
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(receptionRec.Id),
    }).then((response) => console.log(response));
}