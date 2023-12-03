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
            doctors_cards.appendChild(await createDoctorCardElement(doctors[i]));
        }
    }
}
//Функция для создания карточек докторов
async function createDoctorCardElement(doctor) {
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
    //Заголовок списка услуги
    const doctorServicesHeader = document.createElement("h4");
    doctorServicesHeader.textContent = "Услуги"
    //Список услуг доктора
    const doctorServices = createListDoctorServices(doctor);



    //Создаём блок с кнопками на карточке
    const cardDoctorsActions = document.createElement("div");
    cardDoctorsActions.className = "doctor-card__actions"
    //Кнопка отображения докторов, текущего пациента
    const doctorPatientsBtn = document.createElement("button");
    doctorPatientsBtn.addEventListener("click", async () => { await readDoctorPatients(doctor); });
    doctorPatientsBtn.className = "doctor-card__button doctor-card__button--patients";
    doctorPatientsBtn.innerText = "Пациенты";
    //Кнопка изменения данных о докторе
    const doctorChangeBtn = document.createElement("button");
    doctorChangeBtn.addEventListener("click", async () => { await displayChangeDoctor(doctor); });
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
    cardInfo.appendChild(doctorServicesHeader);
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
        listPart.textContent = `${doctor.Services[i].ServiceName}`;
        servicesList.appendChild(listPart);
    }

    return servicesList;
}

//Функция изменения доктора
async function changeDoctor(doctor) {
    // Получение данных из формы
    const doctorFIO = document.getElementById("doctorFIO").value;
    const doctorRoom = document.getElementById("doctorRoom").value;
    const doctorWorkStart = document.getElementById("doctorWorkStart").value;
    const doctorSpecialization = document.getElementById("doctorSpecialization").value;

    let fioArray = doctorFIO.split(" ");

    let services = new Array();
    const servicesCheckbox = document.getElementsByClassName("servicesCheckbox");

    for (let i = 0; i < servicesCheckbox.length; i++) {

        if (servicesCheckbox[i].checked) {
            let Service = {
                Id: servicesCheckbox[i].value
            }
            services.push(Service);
        }
    }

    let patients = new Array();
    const patientsCheckbox = document.getElementsByClassName("patientsChekbox");

    for (let i = 0; i < patientsCheckbox.length; i++) {

        if (patientsCheckbox[i].checked) {
            let Patient = {
                Id: patientsCheckbox[i].value
            }
            patients.push(Patient);
        }
    }

    // Создание объекта доктора
    const newDoctor = {
        Id: doctor.Id,
        Surname: fioArray[0],
        Name: fioArray[1],
        FatherName: fioArray[2],
        OfficeNumber: doctorRoom,
        StartWorkDate: new Date(doctorWorkStart).toISOString(),
        Specialization: doctorSpecialization,
        Services: services,
        Patients: patients
    };

    // Отправка данных на сервер
    try {
        const response = await fetch("/doctor?operation=update", {
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
async function displayChangeDoctor(doctor) {
    //Создание ссылки на корневой элемент модельного окна
    const modal = document.getElementById("modal");

    modal.innerHTML = "";

    let modalHeader = document.createElement("h2");
    modalHeader.className = "modal__title";
    modalHeader.textContent = "Измените информацию о докторе";

    let doctorFIO = document.createElement("input");
    doctorFIO.id = "doctorFIO";
    doctorFIO.type = "text";
    doctorFIO.value = `${doctor.Surname} ${doctor.Name} ${doctor.FatherName}`;

    let doctorRoom = document.createElement("input");
    doctorRoom.id = "doctorRoom";
    doctorRoom.type = "text";
    doctorRoom.value = `${doctor.OfficeNumber}`;

    let doctorWorkStart = document.createElement("input");
    doctorWorkStart.id = "doctorWorkStart";
    doctorWorkStart.type = "text";
    doctorWorkStart.value = `${doctor.StartWorkDate}`;

    let doctorSpecialization = document.createElement("input");
    doctorSpecialization.id = "doctorSpecialization";
    doctorSpecialization.type = "text";
    doctorSpecialization.value = `${doctor.Specialization}`;

    let doctorServicesSelectBtn = document.createElement("button");
    doctorServicesSelectBtn.id = "doctorServices";
    doctorServicesSelectBtn.addEventListener("click", async () => await createServicesModal(doctor));
    doctorServicesSelectBtn.textContent = "Выбрать услуги";

    let doctorPatientsSelectBtn = document.createElement("button");
    doctorPatientsSelectBtn.id = "doctorPatients";
    doctorPatientsSelectBtn.addEventListener("click", async () => await createPatientsModal(doctor));
    doctorPatientsSelectBtn.textContent = "Выбрать пациентов";

    let doctorEvents = document.createElement("div");
    doctorEvents.className = "modal__buttons";

    let doctorSaveData = document.createElement("button");
    doctorSaveData.className = "modal__buttons--saveData";
    doctorSaveData.textContent = "Изменить";
    doctorSaveData.addEventListener("click", () => {
        changeDoctor(doctor);
    });

    let doctorCancel = document.createElement("button");
    doctorCancel.className = "modal__buttons--hideModal";
    doctorCancel.textContent = "Отменить";
    doctorCancel.addEventListener("click", () => {
        const modalPatient = document.getElementById("doctorPatientsModal")
        modalPatient.innerHTML = "";
        modalPatient.style.display = "none";

        const modalService = document.getElementById("doctorServicesModal")
        modalService.innerHTML = "";
        modalService.style.display = "none";

        hideModal();
    });

    doctorEvents.appendChild(doctorSaveData);
    doctorEvents.appendChild(doctorCancel);

    //Собираем карточку
    modal.appendChild(modalHeader);
    modal.appendChild(doctorFIO);
    modal.appendChild(doctorRoom);
    modal.appendChild(doctorWorkStart);
    modal.appendChild(doctorSpecialization);
    modal.appendChild(doctorServicesSelectBtn);
    modal.appendChild(doctorPatientsSelectBtn);
    modal.appendChild(doctorEvents);

    //Отображаем окно
    showModal();
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
            await loadDataDoctors();
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
    const doctorFIO = document.getElementById("doctorFIO").value;
    const doctorRoom = document.getElementById("doctorRoom").value;
    const doctorWorkStart = document.getElementById("doctorWorkStart").value;
    const doctorSpecialization = document.getElementById("doctorSpecialization").value;

    let fioArray = doctorFIO.split(" ");

    let services = new Array();
    const servicesCheckbox = document.getElementsByClassName("servicesCheckbox");

    for (let i = 0; i < servicesCheckbox.length; i++) {

        if (servicesCheckbox[i].checked) {
            let Service = {
                Id: servicesCheckbox[i].value
            }
            services.push(Service);
        }
    }

    let patients = new Array();
    const patientsCheckbox = document.getElementsByClassName("patientsChekbox");

    for (let i = 0; i < patientsCheckbox.length; i++) {

        if (patientsCheckbox[i].checked) {
            let Patient = {
                Id: patientsCheckbox[i].value
            }
            patients.push(Patient);
        }
    }

    // Создание объекта доктора
    const newDoctor = {
        Surname: fioArray[0],
        Name: fioArray[1],
        FatherName: fioArray[2],
        OfficeNumber: doctorRoom,
        StartWorkDate: new Date(doctorWorkStart).toISOString(),
        Specialization: doctorSpecialization,
        Services: services,
        Patients: patients
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

//Отображение модального окна для добавление доктора
async function displayAddDoctorModal() {
    //Создание ссылки на корневой элемент модельного окна
    const modal = document.getElementById("modal");

    modal.innerHTML = "";

    let modalHeader = document.createElement("h2");
    modalHeader.className = "modal__title";
    modalHeader.textContent = "Внесите информацию о докторе";

    let doctorFIO = document.createElement("input");
    doctorFIO.id = "doctorFIO";
    doctorFIO.type = "text";
    doctorFIO.placeholder = "ФИО"

    let doctorRoom = document.createElement("input");
    doctorRoom.id = "doctorRoom";
    doctorRoom.type = "text";
    doctorRoom.placeholder = "Номер кабинета"

    let doctorWorkStart = document.createElement("input");
    doctorWorkStart.id = "doctorWorkStart";
    doctorWorkStart.type = "text";
    doctorWorkStart.placeholder = "Начало работы"

    let doctorSpecialization = document.createElement("input");
    doctorSpecialization.id = "doctorSpecialization";
    doctorSpecialization.type = "text";
    doctorSpecialization.placeholder = "Специализация";

    let doctorServicesSelectBtn = document.createElement("button");
    doctorServicesSelectBtn.id = "doctorServices";
    doctorServicesSelectBtn.addEventListener("click", async () => await createServicesModal());
    doctorServicesSelectBtn.textContent = "Выбрать услуги";

    let doctorPatientsSelectBtn = document.createElement("button");
    doctorPatientsSelectBtn.id = "doctorPatients";
    doctorPatientsSelectBtn.addEventListener("click", async () => await createPatientsModal());
    doctorPatientsSelectBtn.textContent = "Выбрать пациентов";

    let doctorEvents = document.createElement("div");
    doctorEvents.className = "modal__buttons";

    let doctorSaveData = document.createElement("button");
    doctorSaveData.className = "modal__buttons--saveData";
    doctorSaveData.textContent = "Сохранить";
    doctorSaveData.addEventListener("click", () => {
        addDoctor();
    });

    let doctorCancel = document.createElement("button");
    doctorCancel.className = "modal__buttons--hideModal";
    doctorCancel.textContent = "Отменить";
    doctorCancel.addEventListener("click", () => {
        const modalPatient = document.getElementById("doctorPatientsModal")
        modalPatient.innerHTML = "";
        modalPatient.style.display = "none";

        const modalService = document.getElementById("doctorServicesModal")
        modalService.innerHTML = "";
        modalService.style.display = "none";

        hideModal();
    });

    doctorEvents.appendChild(doctorSaveData);
    doctorEvents.appendChild(doctorCancel);

    //Собираем карточку
    modal.appendChild(modalHeader);
    modal.appendChild(doctorFIO);
    modal.appendChild(doctorRoom);
    modal.appendChild(doctorWorkStart);
    modal.appendChild(doctorSpecialization);
    modal.appendChild(doctorServicesSelectBtn);
    modal.appendChild(doctorPatientsSelectBtn);
    modal.appendChild(doctorEvents);

    //Отображаем окно
    showModal();
}

//Создание модального окна для отображения пациентов
async function createPatientsModal(doctor = null) {

    const modal = document.getElementById("doctorPatientsModal");

    let prevCheckboxesContainerClone = document.getElementById("doctorPatientsModal").cloneNode(true);

    modal.innerHTML = "";

    const responsePatients = await fetch("patient?operation=read", {
        method: "post",
        headers: { "Accept": "application/json", "Content-Type": "application/json" }
    });
    if (responsePatients.status == 200) {
        //Получаем ссылку на див в котором будут checkbox

        patients = await responsePatients.json();

        if (doctor != null) {
            for (let i = 0; i < patients.length; i++) {
                let checkboxId = `patientChekbox: ${patients[i].Id}`;

                let checkBoxPatient = document.createElement("input");
                checkBoxPatient.id = checkboxId;
                checkBoxPatient.value = patients[i].Id;
                checkBoxPatient.className = "patientsChekbox";
                checkBoxPatient.type = "checkbox"

                let checkBoxPatientLabel = document.createElement("label");
                checkBoxPatientLabel.textContent = `${patients[i].Surname} ${patients[i].Name[0]}. ${patients[i].FatherName[0]}.`
                checkBoxPatientLabel.for = checkboxId;

                if (doctor != null) {
                    for (let j = 0; j < doctor.Patients.length; j++) {
                        if (patients[i].Id == doctor.Patients[j].Id) {
                            checkBoxPatient.checked = true;
                        }
                    }
                }

                modal.appendChild(checkBoxPatient);
                modal.appendChild(checkBoxPatientLabel);
            }
        }
        else {
            //Добавление содержимого в модальное окно пациентов, при добавлении доктора
            for (let i = 0; i < patients.length; i++) {
                let checkboxId = `patientChekbox: ${patients[i].Id}`;

                let checkBoxPatient = document.createElement("input");
                checkBoxPatient.id = checkboxId;
                checkBoxPatient.value = patients[i].Id;
                checkBoxPatient.className = "patientsChekbox";
                checkBoxPatient.type = "checkbox"

                let checkBoxPatientLabel = document.createElement("label");
                checkBoxPatientLabel.textContent = `${patients[i].Surname} ${patients[i].Name[0]}. ${patients[i].FatherName[0]}.`
                checkBoxPatientLabel.for = checkboxId;

                modal.appendChild(checkBoxPatient);
                modal.appendChild(checkBoxPatientLabel);
            }

            //Есть ли у предыдущего контейнера дочерние элементы, и выставляем значения checkbox
            if (prevCheckboxesContainerClone.hasChildNodes()) {
                for (let i = 0; i < prevCheckboxesContainerClone.childNodes.length - 1; i++) {
                    if (prevCheckboxesContainerClone.childNodes[i].nodeName == "LABEL") {
                        continue;
                    }

                    let tempCheckBox = document.getElementById(prevCheckboxesContainerClone.childNodes[i].id);

                    tempCheckBox.checked = prevCheckboxesContainerClone.childNodes[i].checked;
                }
            }
        }
    }

    //Создаём область с кнопкой сокрытия
    let patientsModalEvents = document.createElement("div");
    patientsModalEvents.className = "modal__buttons";
    let hidePatientsBtn = document.createElement("button");
    hidePatientsBtn.className = "modal__buttons--hideModal";
    hidePatientsBtn.innerText = "Закрыть";
    hidePatientsBtn.addEventListener("click", () => hideCreatePatientsModal())

    patientsModalEvents.appendChild(hidePatientsBtn);

    modal.appendChild(patientsModalEvents);

    modal.style.display = "block";
    modal.style.opacity = "100";
}

//Создание модального окна для отображения сервисов
async function createServicesModal(doctor = null) {
    const modal = document.getElementById("doctorServicesModal");

    let prevCheckboxesContainerClone = document.getElementById("doctorServicesModal").cloneNode(true);

    modal.innerHTML = "";

    const responseServices = await fetch("service?operation=read", {
        method: "post",
        headers: { "Accept": "application/json", "Content-Type": "application/json" }
    });
    if (responseServices.status == 200) {
        //Получаем ссылку на див в котором будут checkbox

        services = await responseServices.json();

        if (doctor != null) {
            for (let i = 0; i < services.length; i++) {
                let checkboxId = `serviceCheckbox: ${services[i].Id}`;

                let checkBoxService = document.createElement("input");
                checkBoxService.id = checkboxId;
                checkBoxService.value = services[i].Id;
                checkBoxService.className = "servicesCheckbox"
                checkBoxService.type = "checkbox"

                let checkBoxServiceLabel = document.createElement("label");
                checkBoxServiceLabel.textContent = `${services[i].ServiceName} ${services[i].Price}.`
                checkBoxServiceLabel.for = checkboxId;

                for (let j = 0; j < doctor.Services.length; j++) {
                    if (services[i].Id == doctor.Services[j].Id) {
                        checkBoxService.checked = true;
                    }
                }

                modal.appendChild(checkBoxService);
                modal.appendChild(checkBoxServiceLabel);
            }
        }
        else {
            //Добавление содержимого в модальное окно пациентов, при добавлении доктора
            for (let i = 0; i < services.length; i++) {
                let checkboxId = `serviceCheckbox: ${services[i].Id}`;

                let checkBoxService = document.createElement("input");
                checkBoxService.id = checkboxId;
                checkBoxService.value = services[i].Id;
                checkBoxService.className = "servicesCheckbox"
                checkBoxService.type = "checkbox"

                let checkBoxServiceLabel = document.createElement("label");
                checkBoxServiceLabel.textContent = `${services[i].ServiceName} ${services[i].Price}.`
                checkBoxServiceLabel.for = checkboxId;

                modal.appendChild(checkBoxService);
                modal.appendChild(checkBoxServiceLabel);
            }

            //Есть ли у предыдущего контейнера дочерние элементы, и выставляем значения checkbox
            if (prevCheckboxesContainerClone.hasChildNodes()) {
                for (let i = 0; i < prevCheckboxesContainerClone.childNodes.length - 1; i++) {
                    if (prevCheckboxesContainerClone.childNodes[i].nodeName == "LABEL") {
                        continue;
                    }
                    let tempCheckBox = document.getElementById(prevCheckboxesContainerClone.childNodes[i].id);

                    tempCheckBox.checked = prevCheckboxesContainerClone.childNodes[i].checked;
                }
            }
        }
    }

    //Создаём область с кнопкой сокрытия
    let servicesModalEvents = document.createElement("div");
    servicesModalEvents.className = "modal__buttons";
    let hideServicesBtn = document.createElement("button");
    hideServicesBtn.className = "modal__buttons--hideModal";
    hideServicesBtn.innerText = "Закрыть";
    hideServicesBtn.addEventListener("click", () => hideCreateServicesModal())

    servicesModalEvents.appendChild(hideServicesBtn);

    modal.appendChild(servicesModalEvents);

    modal.style.display = "block";
    modal.style.opacity = "100";

}
function hideCreateServicesModal() {
    const modal = document.getElementById("doctorServicesModal")
    modal.style.display = "none";
}
function hideCreatePatientsModal() {
    const modal = document.getElementById("doctorPatientsModal")
    modal.style.display = "none";
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
