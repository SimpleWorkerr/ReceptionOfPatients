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
            patients_cards.appendChild(await createPatientCardElement(patients[i]));
        }
    }
}

//Функция для создания карточек пациентов
async function createPatientCardElement(patient) {
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
    patientChangeBtn.addEventListener("click", async () => await displayChangePatient(patient));
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
async function changePatient(patient) {
    //Получение данных из формы
    const patientFIO = document.getElementById("patientFIO").value;
    const patientAddress = document.getElementById("patientAddress").value;
    const patientPhone = document.getElementById("patientPhoneNumber").value;
    const patientBirthDate = document.getElementById("patientBirthdate").value;

    let fioArray = patientFIO.split(" ");

    let doctors = new Array();
    const doctorsCheckbox = document.getElementsByClassName("doctorsCheckbox");

    for (let i = 0; i < doctorsCheckbox.length; i++) {
        if (doctorsCheckbox[i].checked) {
            let Doctor = {
                Id: doctorsCheckbox[i].value,
            };
            doctors.push(Doctor);
        }
    }

    const newPatient = {
        Id: patient.Id,
        Surname: fioArray[0],
        Name: fioArray[1],
        FatherName: fioArray[2],
        BirthDate: new Date(patientBirthDate).toISOString(),
        Address: patientAddress,
        PhoneNumber: patientPhone,
        Doctors: doctors
    }
    //Отправка данных на сервер
    let url = "/patient?operation=update";
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPatient),
        });
        if (response.ok) {
            // Обновление данных на странице
            await loadDataPatients();
            hideModal();
        } else {
            throw new Error("Ошибка изменения пациента");
        }
    } catch (error) {
        console.error(error);
        alert("Произошла ошибка при обновлении пациента");
    }
}
//Отображение модального окна для измения пациента
async function displayChangePatient(patient) {
    const modal = document.getElementById("modal");

    modal.innerHTML = "";

    let modalHeader = document.createElement("h2");
    modalHeader.className = "modal__title";
    modalHeader.textContent = "Измените информацию о пациенте";

    let patientFIO = document.createElement("input");
    patientFIO.id = "patientFIO";
    patientFIO.type = "text";
    patientFIO.value = `${patient.Surname} ${patient.Name} ${patient.FatherName}`;

    let patientAddress = document.createElement("input");
    patientAddress.id = "patientAddress";
    patientAddress.type = "text";
    patientAddress.value = `${patient.Address}`;

    let patientPhoneNumber = document.createElement("input");
    patientPhoneNumber.id = "patientPhoneNumber";
    patientPhoneNumber.type = "text";
    patientPhoneNumber.value = `${patient.PhoneNumber}`;

    let patientBirthDate = document.createElement("input");
    patientBirthDate.id = "patientBirthdate";
    patientBirthDate.type = "text";
    patientBirthDate.value = `${patient.BirthDate}`;

    let patientDoctorsSelectButton = document.createElement("button");
    patientDoctorsSelectButton.id = "patientDoctors";
    patientDoctorsSelectButton.textContent = "Доктора";
    patientDoctorsSelectButton.addEventListener(
        "click",
        () => createDoctorModal(patient));

    let patientEvents = document.createElement("div");
    patientEvents.className = "modal__buttons";

    let patientSaveData = document.createElement("button");
    patientSaveData.className = "modal__buttons--saveData";
    patientSaveData.textContent = "Изменить";
    patientSaveData.addEventListener("click", async () => {
        await changePatient(patient);
    });

    let patientCancel = document.createElement("button");
    patientCancel.className = "modal__buttons--hideModal";
    patientCancel.textContent = "Отменить";
    patientCancel.addEventListener("click", () => {
        //Убрать отметки с чекбокосов

        hideModal();
    })

    patientEvents.appendChild(patientSaveData);
    patientEvents.appendChild(patientCancel);

    modal.appendChild(modalHeader);
    modal.appendChild(patientFIO);
    modal.appendChild(patientAddress);
    modal.appendChild(patientPhoneNumber);
    modal.appendChild(patientBirthDate);
    modal.appendChild(patientDoctorsSelectButton);
    modal.appendChild(patientEvents);

    //Отображаем окно
    showModal();
}
//Создание модального окна для отображения докторов
async function createDoctorModal(patient = null) {
    const modal = document.getElementById("patientDoctorsModal");

    let prevCheckboxesContainerClone = document
        .getElementById("patientDoctorsModal")
        .cloneNode(true);

    modal.innerHTML = "";

    const responseDoctors = await fetch("doctor?operation=read", {
        method: "post",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
    });
    if (responseDoctors.status == 200) {
        //Получаем ссылку на див, в котором будут checkbox

        doctors = await responseDoctors.json();

        if (patient != null) {
            for (let i = 0; i < doctors.length; i++) {
                let checkBoxId = `doctorCheckbox: ${doctors[i].Id}`;

                let checkBoxDoctor = document.createElement("input");
                checkBoxDoctor.id = checkBoxId;
                checkBoxDoctor.value = doctors[i].Id;
                checkBoxDoctor.className = "doctorsCheckbox";
                checkBoxDoctor.type = "checkbox"

                let checkBoxDoctorLabel = document.createElement("label");
                checkBoxDoctorLabel.textContent = `${patient.Surname} ${patient.Name[0]}. ${patient.FatherName[0]}.`;
                checkBoxDoctorLabel.for = checkBoxId;

                for (let j = 0; j < patient.Doctors.length; j++) {
                    if (doctors[i].Id == patient.Doctors[i].Id) {
                        checkBoxDoctor.checked = true;
                    }
                }

                modal.appendChild(checkBoxDoctor);
                modal.appendChild(checkBoxDoctorLabel);
            }
        }
        else {
            //Добавление содержимого в модальное окно докторов, при добавлении пациента
            for (let i = 0; i < doctors.length; i++) {
                let checkBoxId = `doctorCheckbox: ${doctors[i].Id}`;

                let checkBoxDoctor = document.createElement("input");
                checkBoxDoctor.id = checkBoxId;
                checkBoxDoctor.value = doctors[i].Id;
                checkBoxDoctor.className = "doctorsCheckbox";
                checkBoxDoctor.type = "checkbox"

                let checkBoxDoctorLabel = document.createElement("label");
                checkBoxDoctorLabel.textContent = `${patient.Surname} ${patient.Name[0]}. ${patient.FatherName[0]}.`;
                checkBoxDoctorLabel.for = checkBoxId;

                modal.appendChild(checkBoxDoctor);
                modal.appendChild(checkBoxDoctorLabel);
            }

            //Есть ли у предыдущего контейнера дочерние элементы, и выставляем значение checkbox
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
    let doctorsModalEvents = document.createElement("div");
    doctorsModalEvents.className = "modal__buttons";

    let hideDoctorsBtn = document.createElement("button");
    hideDoctorsBtn.className = "modal__buttons--hideModal";
    hideDoctorsBtn.innerText = "Закрыть";
    hideDoctorsBtn.addEventListener("click", () => hideCreateDoctorsModal());

    doctorsModalEvents.appendChild(hideDoctorsBtn);

    modal.appendChild(doctorsModalEvents);

    modal.style.display = "block";
    modal.style.opacity = "100";
}

function hideCreateDoctorsModal() {
    const modal = document.getElementById("patientDoctorsModal");
    modal.style.display = "none"
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

