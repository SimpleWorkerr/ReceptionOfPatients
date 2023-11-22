//Общая переменная
let doctors;
//Загрузка данных на страницу
loadData();

function saveData() {
    // Код для сохранения данных
    hideModal();
}

//Функция получения данных с сервера при загрузке страницы
//Тажке это main функция, для загрузки всех данных
async function loadData() {
    responseDoctors = await fetch("doctor?operation=read", {
        method: "post",
        headers: { "Accept": "application/json", "Content-Type": "application/json" }
    });

    if (responseDoctors.status == 200) {
        let doctors_cards = document.getElementById("doctor-cards-id");
        doctors_cards.innerHTML = "";
        doctors = await responseDoctors.json();

        //Добавление карточек
        for (let i = 0; i < doctors.length; i++) {

            let serviceList = '<ul class="doctor-card__services">'
            for (let j = 0; j < doctors[i].Services.length; j++) {
                serviceList += `<li class="doctor-card__service">${doctors[i].Services[j].ServiceName}</li>`
            }
            serviceList += '</ul>'
            //Хардкод
            doctors_cards.innerHTML += `<div class="doctor-card">
                                            <div class="doctor-card__info">
                                                <h3 class="doctor-card__name">${doctors[i].Surname} ${doctors[i].Name} ${doctors[i].FatherName}</h3>
                                                <p class="doctor-card__detail">Кабинет: ${doctors[i].OfficeNumber}</p>
                                                <p class="doctor-card__detail">Начало работы: ${doctors[i].StartWorkDate}</p>
                                                <p class="doctor-card__detail">Специализация: ${doctors[i].Specialization}</p>
                                                <h4 class="doctor-card__services-title">Услуги:</h4>
                                                ${serviceList}
                                            </div>
                                            <div class="doctor-card__actions">

                                                <button onclick="readDoctorPatient(${i});" class="doctor-card__button doctor-card__button--patients">Пациенты</button>
                                                <button onclick="changeDoctor(${i});" class="doctor-card__button doctor-card__button--edit">Изменить</button>
                                                <button onclick="deleteDoctor(${i});" class="doctor-card__button doctor-card__button--delete">Удалить</button>

                                            </div>
                                        </div>`
        }
    }
}
//Функция изменения доктора
function changeDoctor(index) {
    doctor = doctors[index]
    console.log(JSON.stringify(doctor));

    //Тут реализовать работу с изменением
    doctor.Name = doctor.Name + "Amogus";

    let url = '/doctor?operation=update';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(doctor)
    })
        .then(response => console.log(response));
}

//Функция удаления доктора
function deleteDoctor(index) {
    doctor = doctors[index]
    let url = '/doctor?operation=delete';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(doctor.Id)
    })
        .then(response => console.log(response));
}

//Функция добавления доктора
function addDoctor() {
    //Копирование первого доктора
    //Сделать формочку для ввода доктора
    doctor = doctors[0]
    let url = '/doctor?operation=create';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(doctor)
    })
        .then(response => console.log(response));
}

//Функция получения пациентов
function readDoctorPatient(index) {
    doctor = doctors[index]
    // let url = '/doctor?operation=read_patients';

    // let responsePatients = fetch(url, {
    //     method: 'POST',
    //     headers: { "Accept": "application/json", "Content-Type": "application/json" },
    //     body: JSON.stringify(doctor.Id)
    // });
    // let patients = responsePatients.json()

    console.log(JSON.stringify(doctor.Patients));
}