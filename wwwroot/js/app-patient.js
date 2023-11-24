let patients;
//Загрузка данных на страницу
loadDataPatients();

//Функция получения данных с сервера при загрузке страницы
//Тажке это main функция, для загрузки всех данных
async function loadDataPatients(){
  const responsePatients = await fetch("patient?operation=read", {
    method: "post",
    headers: { "Accept": "application/json", "Content-Type": "application/json" }
  });
  if (responsePatients.status == 200) {
    let patients_cards = document.getElementById("patient-cards-id");
    patients_cards.innerHTML = "";
    patients = await responsePatients.json();
    console.log(patients);
    //Добавление карточек
    for(let i = 0; i < patients.length; i++){
      patients_cards.appendChild(createPatientCardElement(patients[i]));
    }
  }
}

//Функция для создания карточек пациентов
function createPatientCardElement(patient){
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

      console.log(doctors);

      
    } else {//displayPatientsModal(patients);
      throw new Error("Ошибка получения данных о пациентах");
    }
  } catch (error) {
    console.error(error);
    alert("Произошла ошибка при получении данных о пациентах");
  }
}

//Реализовать добавление пациента