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

            displayPatientsModal(service, patients);

        } else {
            throw new Error("Ошибка получения данных о пациентах");
        }
    } catch (error) {
        console.error(error);
        alert("Произошла ошибка при получении данных о пациентах");
    }
}


//Функция отображающая пациентов, которым оказывают текущую услугу.
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

            displayDoctorsModal(service, doctors);

        } else {
            throw new Error("Ошибка получения данных о пациентах");
        }
    } catch (error) {
        console.error(error);
        alert("Произошла ошибка при получении данных о пациентах");
    }
}
function displayPatientsModal(service, patients) {
    //Создание ссылки на html элемент
    const modal = document.getElementById("servicePatientsModal");
    //Затирание предыдущего содержимого окна пациентов определённого доктора
    modal.innerHTML = "";

    //Создание заголовка модального окна
    let modalContextHeader = document.createElement("h2");
    modalContextHeader.className = "modal__title";
    modalContextHeader.textContent = `Пациенты, которым оказывают: ${service.ServiceName}`;

    // Создание таблицы модального окна
    let modalContentTable = document.createElement("table");

    //Создание заголовков таблицы
    let rowOfContextTableHeaders = document.createElement("tr");

    let patientNameHeader = document.createElement("th");
    patientNameHeader.textContent = `Имя`;

    let patientSurnameHeader = document.createElement("th");
    patientSurnameHeader.textContent = `Фамилия`;

    let patientFatherNameHeader = document.createElement("th");
    patientFatherNameHeader.textContent = `Отчество`;

    let patientBirthDateHeader = document.createElement("th");
    patientBirthDateHeader.textContent = `Дата рождения`;

    let patientAddressHeader = document.createElement("th");
    patientAddressHeader.textContent = `Адрес`;

    let patientPhoneNumberHeader = document.createElement("th");
    patientPhoneNumberHeader.textContent = `Телефон`;

    rowOfContextTableHeaders.appendChild(patientNameHeader);
    rowOfContextTableHeaders.appendChild(patientSurnameHeader);
    rowOfContextTableHeaders.appendChild(patientFatherNameHeader);
    rowOfContextTableHeaders.appendChild(patientBirthDateHeader);
    rowOfContextTableHeaders.appendChild(patientAddressHeader);
    rowOfContextTableHeaders.appendChild(patientPhoneNumberHeader);

    //Собираем таблицу
    modal.appendChild(modalContextHeader);
    modal.appendChild(rowOfContextTableHeaders);

    //Создание данных внутри таблицы
    patients.forEach((patient) => {
        modalContentTable.appendChild(createTableRowPatient(patient));
    });
    //Добавляем созданное выше содержимое таблицы
    modal.appendChild(modalContentTable);


    //Создаём область с кнопкой сокрытия
    let servicesModalEvents = document.createElement("div");
    servicesModalEvents.className = "modal__buttons";
    let hideServicePatientsBtn = document.createElement("button");
    hideServicePatientsBtn.className = "modal__buttons--hideModal";
    hideServicePatientsBtn.innerText = "Закрыть";
    hideServicePatientsBtn.addEventListener("click", () => hidePatientsModal())

    servicesModalEvents.appendChild(hideServicePatientsBtn);

    modal.appendChild(servicesModalEvents);

    modal.style.display = "block";
    modal.style.opacity = "100";
}
//Функция создания строки для таблицы
function createTableRowPatient(patient) {
    let rowOfPatientData = document.createElement("tr");

    let patientName = document.createElement("td");
    patientName.textContent = `${patient.Name}`;

    let patientSurname = document.createElement("td");
    patientSurname.textContent = `${patient.Surname}`;

    let patientFatherName = document.createElement("td");
    patientFatherName.textContent = `${patient.FatherName}`;

    let patientBirthDate = document.createElement("td");
    patientBirthDate.textContent = `${patient.BirthDate.slice(0, 10)}`;

    let patientAddress = document.createElement("td");
    patientAddress.textContent = `${patient.Address}`;

    let patientPhoneNumber = document.createElement("td");
    patientPhoneNumber.textContent = `${patient.PhoneNumber}`;

    rowOfPatientData.appendChild(patientName);
    rowOfPatientData.appendChild(patientSurname);
    rowOfPatientData.appendChild(patientFatherName);
    rowOfPatientData.appendChild(patientBirthDate);
    rowOfPatientData.appendChild(patientAddress);
    rowOfPatientData.appendChild(patientPhoneNumber);

    return rowOfPatientData;
}

//Функция отображающая докторов, которые оказывают текующую услугу.
function displayDoctorsModal(service, doctors) {
    //Создание ссылки на html элемент
    const modal = document.getElementById("serviceDoctorsModal");
    //Затирание предыдущег осодержимого окна пациентов определённого доктора
    modal.innerHTML = "";

    //Создание заголовка модального окна
    let modalContextHeader = document.createElement("h2");
    modalContextHeader.className = "modal__title";
    modalContextHeader.textContent = `Доктора оказывающие: ${service.ServiceName}`;

    //Создание таблицы модального окна
    let modalContentTable = document.createElement("table");

    //Создание заголовков таблицы
    let rowOfContextTableHeaders = document.createElement("tr");

    let doctorNameHeader = document.createElement("th");
    doctorNameHeader.textContent = "Имя";

    let doctorSurnameHeader = document.createElement("th");
    doctorSurnameHeader.textContent = `Фамилия`;

    let doctorFatherNameHeader = document.createElement("th");
    doctorFatherNameHeader.textContent = `Отчество`;

    let doctorStartWorkDateHeader = document.createElement("th");
    doctorStartWorkDateHeader.textContent = "Начало работы";

    let doctorOfficeNumberHeader = document.createElement("th");
    doctorOfficeNumberHeader.textContent = "Номер кабинета"

    let doctorSpecializationHeader = document.createElement("th");
    doctorSpecializationHeader.textContent = "Специализация"

    rowOfContextTableHeaders.appendChild(doctorNameHeader);
    rowOfContextTableHeaders.appendChild(doctorSurnameHeader);
    rowOfContextTableHeaders.appendChild(doctorFatherNameHeader);
    rowOfContextTableHeaders.appendChild(doctorStartWorkDateHeader);
    rowOfContextTableHeaders.appendChild(doctorOfficeNumberHeader);
    rowOfContextTableHeaders.appendChild(doctorSpecializationHeader);

    //Собираем таблицу
    modal.appendChild(modalContextHeader);
    modal.appendChild(rowOfContextTableHeaders);

    //Создание данных внутри таблицы
    doctors.forEach((doctor) => {
        modalContentTable.appendChild(createTableRow(doctor));
    });

    //Добавлем созданное выше содержимое таблицы
    modal.appendChild(modalContentTable);

    //Создаём область с кнопкой сокрытия
    let doctorsModalEvents = document.createElement("div");
    doctorsModalEvents.className = "modal__buttons";
    let hidePatientDoctorsBtn = document.createElement("button");
    hidePatientDoctorsBtn.className = "modal__buttons--hideModal";
    hidePatientDoctorsBtn.innerText = "Закрыть";
    hidePatientDoctorsBtn.addEventListener("click", () => hideDoctorsModal())

    doctorsModalEvents.appendChild(hidePatientDoctorsBtn);

    modal.appendChild(doctorsModalEvents);

    modal.style.display = "block";
    modal.style.opacity = "100";
}

function createTableRow(doctor) {
    let rowOfDoctorsData = document.createElement("tr");

    let doctorName = document.createElement("td");
    doctorName.textContent = `${doctor.Name}`;

    let doctorSurname = document.createElement("td");
    doctorSurname.textContent = `${doctor.Surname}`;

    let doctorFatherName = document.createElement("td");
    doctorFatherName.textContent = `${doctor.FatherName}`;

    let doctorStartWorkDate = document.createElement("td");
    doctorStartWorkDate.textContent = `${doctor.StartWorkDate.slice(0, 10)}`;

    let doctorOfficeNumber = document.createElement("td");
    doctorOfficeNumber.textContent = `${doctor.OfficeNumber}`;

    let doctorSpecialization = document.createElement("td");
    doctorSpecialization.textContent = `${doctor.Specialization}`;

    rowOfDoctorsData.appendChild(doctorName);
    rowOfDoctorsData.appendChild(doctorSurname);
    rowOfDoctorsData.appendChild(doctorFatherName);
    rowOfDoctorsData.appendChild(doctorStartWorkDate);
    rowOfDoctorsData.appendChild(doctorOfficeNumber);
    rowOfDoctorsData.appendChild(doctorSpecialization);

    return rowOfDoctorsData;
}

function hideDoctorsModal() {
    const modal = document.getElementById("serviceDoctorsModal");
    modal.style.display = "none";
}

function hidePatientsModal() {
    const modal = document.getElementById("servicePatientsModal");
    modal.style.display = "none";
}

//Реализовать добавление услуги