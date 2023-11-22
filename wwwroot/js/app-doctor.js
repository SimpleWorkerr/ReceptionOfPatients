//Общая переменная
let responseDoctors;
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
        const data = await responseDoctors.json();

        //Добавление карточек
        for (let i = 0; i < data.length; i++) {

            let serviceList = '<ul class="doctor-card__services">'
            for (let j = 0; j < data[i].Services.length; j++) {
                serviceList += `<li class="doctor-card__service">${data[i].Services[j].ServiceName}</li>`
            }
            serviceList += '</ul>'
            //Хардкод
            doctors_cards.innerHTML += `<div class="doctor-card">
                                            <div class="doctor-card__info">
                                                <h3 class="doctor-card__name">${data[i].Surname} ${data[i].Name} ${data[i].FatherName}</h3>
                                                <p class="doctor-card__detail">Кабинет: ${data[i].OfficeNumber}</p>
                                                <p class="doctor-card__detail">Начало работы: ${data[i].StartWorkDate}</p>
                                                <p class="doctor-card__detail">Специализация: ${data[i].Specialization}</p>
                                                <h4 class="doctor-card__services-title">Услуги:</h4>
                                                ${serviceList}
                                            </div>
                                            <div class="doctor-card__actions">
                                                <button class="doctor-card__button doctor-card__button--edit id=change-doctors-btn_${i}">Изменить</button>
                                                <button class="doctor-card__button doctor-card__button--delete id=delete-doctors-btn_${i}">Удалить</button>
                                            </div>
                                        </div>`
        }
    }
}
