let patients;
//Загрузка данных на страницу
loadDataPatients();

//Функция получения данных с сервера при загрузке страницы
//Тажке это main функция, для загрузки всех данных
async function loadDataPatients() {
    const responsePatients = await fetch("patient?operation=read", {
        method: "post",
        headers: { "Accept": "application/json", "Content-Type": "application/json" }
    });
    if (responsePatients.status == 200) {
        let patients_cards = document.getElementById("patient-cards-id");
        patients_cards.innerHTML = "";

        patients = await responsePatients.json();

        //Добавление карточек
        for (let i = 0; i < patients.length; i++) {
            patients_cards.appendChild(createPatientCardElement(patients[i]));
        }
    }
}

//Функция для создания карточек пациентов
function createPatientCardElement(patient) {
    //Создаём блок карточки
    const card = document.createElement("div");
    card.className = "patient-card";

    //Блок с инормацией о пациенте
    const cardInfo = document.createElement("div");
    cardInfo.className = "patient-card__info";
    //ФИО пациента
    const patientName = document.createElement("h3");
    patientName.className = "patient-card__name";
    patientName.textContent = `${patient.Surname} ${patient.Name} ${patient.FatherName}`;
    //Адресс пациента
    const patientAddress = document.createElement("p");
    patientAddress.className = "patient-card__detail";
    patientAddress.textContent = `Адресс: ${patient.Address}`;
    //Номер телефона пациента
    const patientPhoneNum = document.createElement("p");
    patientPhoneNum.className = "patient-card__detail";
    patientPhoneNum.textContent = `Номер телефона: ${patient.Address}`;
    //Дата рождения пациента
    const patientBirthDate = document.createElement("p");
    patientBirthDate.className = "patient-card__detail";
    patientBirthDate.textContent = `Дата рождения: ${patient.BirthDate}`;

    //Создаём блок с кнопками на карточке
    const cardPatientActions = document.createElement("div");
    cardPatientActions.className = "patient-card__actions"
    //Кнопка отображения докторов, текущего пациента
    const patientDoctorsBtn = document.createElement("button");
    patientDoctorsBtn.addEventListener("click", () => readPatientDoctors(patient));
    patientDoctorsBtn.className = "patient-card__button patient-card__button--doctors";
    patientDoctorsBtn.innerText = "Доктора";
    //Кнопка изменения данных о пациенте
    const patientChangeBtn = document.createElement("button");
    patientChangeBtn.addEventListener("click", () => changePatient(patient));
    patientChangeBtn.className = "patient-card__button patient-card__button--edit";
    patientChangeBtn.innerText = "Изменить";
    //Кнопка удаления пациента
    const patientRemovesBtn = document.createElement("button");
    patientRemovesBtn.addEventListener("click", () => removePatient(patient));
    patientRemovesBtn.className = "patient-card__button patient-card__button--delete";
    patientRemovesBtn.innerText = "Удалить";

    //Собираем карточку полностью
    card.appendChild(cardInfo);
    card.appendChild(cardPatientActions);
    //Собиравем блок с кнопками
    cardPatientActions.appendChild(patientDoctorsBtn);
    cardPatientActions.appendChild(patientChangeBtn);
    cardPatientActions.appendChild(patientRemovesBtn);
    //Собираем блок информации о пациенте
    cardInfo.appendChild(patientName);
    cardInfo.appendChild(patientAddress);
    cardInfo.appendChild(patientPhoneNum);
    cardInfo.appendChild(patientBirthDate);

    return card;
}

//Функция для изменения пациентов
function changePatient(patient) {

    //Реализовать формы для ввода
    patient.Name = patient.Name + "Amogus";

    let url = "/patient?operation=update";
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(patient),
    }).then((response) => console.log(response));
}

//Функция для удаления пациентов
function removePatient(patient) {

    let url = "/patient?operation=delete";
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(patient.Id),
    }).then((response) => console.log(response));
}

//Функция для просмотра докторов
async function readPatientDoctors(patient) {
    const url = "/patient?operation=read_doctors";

    try {
        const responsePatientDoctors = await fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(patient.Id),
        });

        if (responsePatientDoctors.ok) {
            const doctors = await responsePatientDoctors.json();

            displayDoctorsModal(patient, doctors);
        } else {
            throw new Error("Ошибка получения данных о пациентах");
        }
    } catch (error) {
        console.error(error);
        alert("Произошла ошибка при получении данных о пациентах");
    }
}

function displayDoctorsModal(patient, doctors) {
    //Создание ссылки на html элемент
    const modal = document.getElementById("doctorsModal");
    //Затирание предыдущег осодержимого окна пациентов определённого доктора
    modal.innerHTML = "";

    //Создание заголовка модального окна
    let modalContextHeader = document.createElement("h2");
    modalContextHeader.className = "modal__title";
    modalContextHeader.textContent = `Доктора лечащие: ${patient.Surname} ${patient.Name[0]}. ${patient.FatherName[0]}.`;

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
    doctorStartWorkDate.textContent = `${doctor.StartWorkDate}`;

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
    const modal = document.getElementById("doctorsModal");
    modal.style.display = "none";
}

//Реализовать добавление пациента