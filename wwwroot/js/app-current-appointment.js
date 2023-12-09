let receptions;
//Загрузка данных на страницу
loadDataCurrAppoint();


//Функция получения данных с сервера при загрузке страницы
//Тажке это main функция, для загрузки всех данных
async function loadDataCurrAppoint() {
    const responseReceptions = await fetch("reception?operation=read", {
        method: "post",
        headers: { "Accept": "application/json", "Content-Type": "application/json" }
    });
    if (responseReceptions.status == 200) {
        let reception_cards = document.getElementById("service-cards-id");
        reception_cards.innerHTML = "";
        receptions = await responseReceptions.json();
        //Добавление карточек
        for (let i = 0; i < receptions.length; i++) {
            reception_cards.appendChild(await createReceptionCardElement(receptions[i]));
        }
    }

}

//Функция для создания карточек текущих приёмов
async function createReceptionCardElement(reception) {
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
    finishReceptionBtn.addEventListener("click", async () => {
        await displayFinishReception(reception);
        //await finishReception(reception);
    });
    finishReceptionBtn.className = "service-card__button service-card__button--edit";
    finishReceptionBtn.innerText = "Завершить";
    //Кнопка удаления приёма
    const deleteReceptionBtn = document.createElement("button");
    deleteReceptionBtn.addEventListener("click", async () => await removeReception(reception));
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
async function removeReception(reception) {
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
async function finishReception(reception) {
    //Нужно сконфигурировать объект ReceptionResult

    const description = "";
    const recomendation = "";

    const doctorId = reception.DoctorId;
    const patientId = reception.PatientId;
    const receptionId = reception.Id;

    const diagnoz = "";
    //Также как и с сервисами, только выборака уже из запроса


    const services = new Array();
    const servicesCheckboxes = document.getElementsByClassName("receptionServiceCheckbox");

    for (let i = 0; i < servicesCheckboxes.length; i++) {
        if (servicesCheckboxes[i].checked) {
            let Service = {
                Id: servicesCheckboxes[i].value
            };
            services.push(Service);
        }
    }

    const newReceptionRes = {
        Decsription: description,
        Recomendation: recomendation,
        DoctorId: doctorId,
        patientId: patientId,
        ReceptionId: receptionId,
        //Диагноз
        Services: services
    }

    let url = "/reception?operation=finish";
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newReceptionRes),
        });
        if (response.ok) {
            await loadDataCurrAppoint();
            hideModal();
        }
        else {
            throw new Error("Ошибка заверешения приёма")
        }
    }
    catch (error) {
        console.error(error);
        alert("Произошла ошибка при завершении приёма");
    }
}
//Функция создания модального окна для завершения текущего приёма
async function displayFinishReception(reception) {
    //Создание ссылки на корневой элемент модального окна
    const modal = document.getElementById("modal");

    modal.innerHTML = "";

    let modalHeader = document.createElement("h2");
    modalHeader.className = "modal__title";
    modalHeader.textContent = "Завершение приёма";

    let doctorFIO = document.createElement("input");
    doctorFIO.type = "text";
    doctorFIO.value = `Доктор: ${reception.Doctor.Surname} ${reception.Doctor.Name} ${reception.Doctor.FatherName}`;
    doctorFIO.setAttribute("readonly", "readonly");

    let patientFIO = document.createElement("input");
    patientFIO.type = "text";
    patientFIO.value = `Пациент: ${reception.Patient.Surname} ${reception.Patient.Name} ${reception.Patient.FatherName}`;
    patientFIO.setAttribute("readonly", "readonly");

    let receptionServicesBtn = document.createElement("button");
    receptionServicesBtn.textContent = "Оказанные услуги"
    receptionServicesBtn.addEventListener(
        "click",
        async () => {
            await createServiceReceptionResModal(reception);
        }
    );

    let receptionModalEvents = document.createElement("div");
    receptionModalEvents.className = "modal__buttons";

    let recpetionFinishBtn = document.createElement("button");
    recpetionFinishBtn.className = "modal__buttons--saveData";
    recpetionFinishBtn.textContent = "Завершить";
    recpetionFinishBtn.addEventListener("click", () => {
        finishReception(reception);
    });

    let receptionCancelBtn = document.createElement("button");
    receptionCancelBtn.className = "modal__buttons--hideModal";
    receptionCancelBtn.textContent = "Отменить"
    receptionCancelBtn.addEventListener("click", () => {
        const modalServices = document.getElementById("receptionResServices");
        modalServices.innerHTML = "";
        modalServices.style.display = "none";

        hideModal();
    });

    receptionModalEvents.appendChild(recpetionFinishBtn);
    receptionModalEvents.appendChild(receptionCancelBtn);

    modal.appendChild(modalHeader);
    modal.appendChild(doctorFIO);
    modal.appendChild(patientFIO);
    modal.appendChild(receptionServicesBtn);
    modal.appendChild(receptionModalEvents);

    //Отображение модального окна
    showModal();
}
//Кнопка отображения модального окна
async function createServiceReceptionResModal(reception) {
    const modal = document.getElementById("receptionResServices");

    let prevCheckboxesContainerClone = document.getElementById("receptionResServices").cloneNode(true);

    modal.innerHTML = "";

    const services = reception.Doctor.Services;

    for (let i = 0; i < services.length; i++) {
        let checkboxId = `receptionService: ${i}`;

        let receptionServiceCheckbox = document.createElement("input");
        receptionServiceCheckbox.id = checkboxId;
        receptionServiceCheckbox.value = services[i].Id;
        receptionServiceCheckbox.className = "receptionServiceCheckbox"
        receptionServiceCheckbox.type = "checkbox"
        receptionServiceCheckbox.checked = true;

        let receptionServiceCheckboxLabel = document.createElement("label");
        receptionServiceCheckboxLabel.textContent = `${services[i].ServiceName}`;
        receptionServiceCheckboxLabel.for = checkboxId;

        modal.appendChild(receptionServiceCheckbox);
        modal.appendChild(receptionServiceCheckboxLabel);
    }

    //Если у предыдущего модального окна были потомки, то востановить их
    if (prevCheckboxesContainerClone.hasChildNodes()) {
        for (let i = 0; i < prevCheckboxesContainerClone.childNodes.length - 1; i++) {
            if (prevCheckboxesContainerClone.childNodes[i].nodeName == "LABEL") {
                continue;
            }

            let tempCheckBox = document.getElementById(
                prevCheckboxesContainerClone.childNodes[i].id
            );

            tempCheckBox.checked =
                prevCheckboxesContainerClone.childNodes[i].checked;
        }
    }

    //Создаём область с кнопкой сокрытия
    let receptionServicesEvents = document.createElement("div");
    receptionServicesEvents.className = "modal__buttons";
    let hideServicesButton = document.createElement("button");
    hideServicesButton.className = "modal__buttons--hideModal";
    hideServicesButton.innerHTML = "Закрыть";
    hideServicesButton.addEventListener("click", () => {
        hiderviceReceptionResModal();
    })

    receptionServicesEvents.appendChild(hideServicesButton);

    modal.appendChild(receptionServicesEvents);

    modal.style.display = "block";
    modal.style.opacity = "100";
}

async function hiderviceReceptionResModal() {
    const modal = document.getElementById("receptionResServices");
    modal.style.display = "none";
}
//Фукнция заверешния приёма

//Реализовать добавление текущих приёмов. Нужно дать пользователю следующий выбор.
//1) Окно с данными о пациентах, мы там можем взять, выбрать много пацинтов или создать нового пациента и добавить его к ним же, либо вообще выбрать только одного
// Дальше новое окно, в котором мы должны выбрать докторов, которые будут "лечить" выбранных пациентов.
//2) В окне с докторами, мы также можем выбрать любое кол-во докторов, либо опять же создать нового доктора. Но создавая нового доктора, мы должны будем добавить ему некоторые услуги, которые он оказывает.
// Всё это должно отправиться на сервак одним JSON а дальше я всё сделаю