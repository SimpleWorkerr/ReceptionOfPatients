//Общая переменная
let doctors;
//Загрузка данных на страницу
loadDataDoctors();

function saveData() {
    // Код для сохранения данных
    hideModal();
}

//Функция получения данных с сервера при загрузке страницы
//Тажке это main функция, для загрузки всех данных
async function loadDataDoctors() {
    responseDoctors = await fetch("doctor?operation=read", {
        method: "post",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
    });

    if (responseDoctors.status == 200) {
        let doctors_cards = document.getElementById("doctor-cards-id");
        doctors_cards.innerHTML = "";
        doctors = await responseDoctors.json();

        //Добавление карточек
        for (let i = 0; i < doctors.length; i++) {
            doctors_cards.appendChild(createDoctorCardElement(doctors[i]));
        }
    }
}
//Функция для создания карточек докторов
function createDoctorCardElement(doctor) {
    //Создаём блок карточки
    const card = document.createElement("div");
    card.className = "doctor-card";

    //Блок с информацией о докторе
    const cardInfo = document.createElement("div");
    cardInfo.className = "doctor-card__info";
    //ФИО доктора
    const doctorName = document.createElement("h3");
    doctorName.className = "doctor-card__name";
    doctorName.textContent = `${doctor.Surname} ${doctor.Name} ${doctor.FatherName}`;
    //Кабинет доктора
    const doctorOffice = document.createElement("p");
    doctorOffice.className = "doctor-card__detail";
    doctorOffice.textContent = `${doctor.OfficeNumber}`;
    //Дата начала работы доктора
    //const formattedDate = moment(doctor.StartWorkDate).format("MMM Do YY");
    const doctorStartWorkDate = document.createElement("p");
    doctorStartWorkDate.className = "doctor-card__detail";
    doctorStartWorkDate.textContent = `${doctor.StartWorkDate}`;
    //Специализация доктора
    const doctorSpecialization = document.createElement("p");
    doctorSpecialization.className = "doctor-card__detail";
    doctorSpecialization.textContent = `${doctor.Specialization}`;
    //Список услуг доктора
    const doctorServices = createListDoctorServices(doctor);

    //Создаём блок с кнопками на карточке
    const cardDoctorsActions = document.createElement("div");
    cardDoctorsActions.className = "doctor-card__actions"
    //Кнопка отображения докторов, текущего пациента
    const doctorPatientsBtn = document.createElement("button");
    doctorPatientsBtn.addEventListener("click", () => readDoctorPatients(doctor));
    doctorPatientsBtn.className = "doctor-card__button doctor-card__button--patients";
    doctorPatientsBtn.innerText = "Пациенты";
    //Кнопка изменения данных о докторе
    const doctorChangeBtn = document.createElement("button");
    doctorChangeBtn.addEventListener("click", () => changeDoctor(doctor));
    doctorChangeBtn.className = "doctor-card__button doctor-card__button--edit";
    doctorChangeBtn.innerText = "Изменить";
    //Кнопка удаления доктора
    const doctorRemovesBtn = document.createElement("button");
    doctorRemovesBtn.addEventListener("click", () => deleteDoctor(doctor));
    doctorRemovesBtn.className = "doctor-card__button doctor-card__button--delete";
    doctorRemovesBtn.innerText = "Удалить";

    //Собираем карточку полностью
    card.appendChild(cardInfo);
    card.appendChild(cardDoctorsActions);

    //Собиравем блок с кнопками
    cardDoctorsActions.appendChild(doctorPatientsBtn);
    cardDoctorsActions.appendChild(doctorChangeBtn);
    cardDoctorsActions.appendChild(doctorRemovesBtn);

    //Собираем блок информации о пациенте
    cardInfo.appendChild(doctorName);
    cardInfo.appendChild(doctorOffice);
    cardInfo.appendChild(doctorStartWorkDate);
    cardInfo.appendChild(doctorSpecialization);
    cardInfo.appendChild(doctorServices);

    return card;
}
//Функция создания списка услуг
function createListDoctorServices(doctor) {
    const servicesList = document.createElement("ul");

    servicesList.className = "doctor-card__services";

    for (let i = 0; i < doctor.Services.length; i++) {
        const listPart = document.createElement("li");

        listPart.className = "doctor-card__service";
        listPart.textContent = `${doctor.Services[i].ServiceName}`
        servicesList.appendChild(listPart);
    }

    return servicesList;
}

//Функция изменения доктора
function changeDoctor(doctor) {
    console.log(JSON.stringify(doctor));

    //Тут реализовать работу с изменением
    doctor.Name = doctor.Name + "Amogus";

    let url = "/doctor?operation=update";
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(doctor),
    }).then((response) => console.log(response));
}

// Функция удаления доктора
async function deleteDoctor(doctor) {
    const url = "/doctor?operation=delete";
    const confirmation = confirm("Вы уверены, что хотите удалить доктора?");
    if (!confirmation) {
        return;
    }

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(doctor.Id),
        });

        if (response.ok) {
            loadDataDoctors();
        } else {
            throw new Error("Ошибка удаления доктора");
        }
    } catch (error) {
        console.error(error);
        alert("Произошла ошибка при удалении доктора");
    }
}

// Функция добавления доктора
async function addDoctor() {
    // Получение данных из формы
    const name = document.getElementById("name").value;
    const room = document.getElementById("room").value;
    const workStart = document.getElementById("workStart").value;
    const specialization = document.getElementById("specialization").value;
    const services = document.getElementById("services").value; // Предполагается, что это строка

    // Создание объекта доктора
    const newDoctor = {
        Name: name,
        OfficeNumber: room,
        StartWorkDate: workStart,
        Specialization: specialization,
        Services: services
            .split(",")
            .map((service) => ({ ServiceName: service.trim() })), // Разбиваем строку услуг на массив
    };

    // Отправка данных на сервер
    try {
        const response = await fetch("/doctor?operation=create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newDoctor),
        });

        if (response.ok) {
            // Обновление данных на странице
            await loadDataDoctors();
            hideModal();
        } else {
            throw new Error("Ошибка добавления доктора");
        }
    } catch (error) {
        console.error(error);
        alert("Произошла ошибка при добавлении доктора");
    }
}


// Функция получения пациентов и отображения их в модальном окне
async function readDoctorPatients(doctor) {
    const url = "/doctor?operation=read_patients";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(doctor.Id),
        });

        if (response.ok) {
            const patients = await response.json();

            displayPatientsModal(doctor, patients);
        } else {
            throw new Error("Ошибка получения данных о пациентах");
        }
    } catch (error) {
        console.error(error);
        alert("Произошла ошибка при получении данных о пациентах");
    }
}
// Функция для отображения модального окна с пациентами
function displayPatientsModal(doctor, patients) {
    //Создание ссылки на html элемент
    const modal = document.getElementById("patientsModal");
    //Затирание предыдущего содержимого окна пациентов определённого доктора
    modal.innerHTML = "";

    //Создание заголовка модального окна
    let modalContextHeader = document.createElement("h2");
    modalContextHeader.className = "modal__title";
    modalContextHeader.textContent = `Пациенты доктора: ${doctor.Surname} ${doctor.Name[0]}. ${doctor.FatherName[0]}.`;


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
        modalContentTable.appendChild(createTableRow(patient));
    });
    //Добавляем созданное выше содержимое таблицы
    modal.appendChild(modalContentTable);


    //Создаём область с кнопкой сокрытия
    let patientsModalEvents = document.createElement("div");
    patientsModalEvents.className = "modal__buttons";
    let hideDoctorPatientsBtn = document.createElement("button");
    hideDoctorPatientsBtn.className = "modal__buttons--hideModal";
    hideDoctorPatientsBtn.innerText = "Закрыть";
    hideDoctorPatientsBtn.addEventListener("click", () => hidePatientsModal())

    patientsModalEvents.appendChild(hideDoctorPatientsBtn);

    modal.appendChild(patientsModalEvents);

    modal.style.display = "block";
    modal.style.opacity = "100";
}
//Функция создания строки для таблицы
function createTableRow(patient) {
    let rowOfPatientData = document.createElement("tr");

    let patientName = document.createElement("td");
    patientName.textContent = `${patient.Name}`;

    let patientSurname = document.createElement("td");
    patientSurname.textContent = `${patient.Surname}`;

    let patientFatherName = document.createElement("td");
    patientFatherName.textContent = `${patient.FatherName}`;

    let patientBirthDate = document.createElement("td");
    patientBirthDate.textContent = `${patient.BirthDate}`;

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

function hidePatientsModal() {
    const modal = document.getElementById("patientsModal");
    modal.style.display = "none";
}
