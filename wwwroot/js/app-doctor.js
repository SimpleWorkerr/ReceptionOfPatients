//Загрузка данных на страницу
loadData();

function saveData() {
    // Код для сохранения данных
    hideModal();
}

//Функция получения данных с сервера при загрузке страницы
//Тажке это main функция, для загрузки всех данных
async function loadData() {
    const response = await fetch("doctor?operation=read", {
        method: "post",
        headers: { "Accept": "application/json", "Content-Type": "application/json" }
    });

    if (response.status == 200) {
        let doctors_cards = document.getElementById("doctor-cards-id");
        const data = await response.json();


        for (let i = 0; i < data.length; i++) {

            let serviceList = '<ul class="doctor-card__services">'
            for (let j = 0; j < data[i].Services.length; j++) {
                serviceList += `<li class="doctor-card__service">${data[i].Services[j].ServiceName}</li>`
            }
            serviceList += '</ul>'

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
                                                <button class="doctor-card__button doctor-card__button--edit">Изменить</button>
                                                <button class="doctor-card__button doctor-card__button--delete">Удалить</button>
                                            </div>
                                        </div>`

        }
    }
}

// Функция для добавления услуг в список
function addServicesToList(services) {
    const listElement = document.querySelector(".article__services");
    services.forEach((service) => {
        const listItem = document.createElement("li");
        listItem.textContent = service;
        listElement.appendChild(listItem);
    });
}

//<main class="main">
//    <section class="doctor-cards">
//        <div class="doctor-card">
//            <div class="doctor-card__info">
//                <h3 class="doctor-card__name">Иванов Иван Иванович</h3>
//                <p class="doctor-card__detail">Кабинет: 101</p>
//                <p class="doctor-card__detail">Начало работы: 8:00</p>
//                <p class="doctor-card__detail">Специализация: Терапевт</p>
//                <h4 class="doctor-card__services-title">Услуги:</h4>
//                <ul class="doctor-card__services">
//                    <li class="doctor-card__service">Консультация</li>
//                    <li class="doctor-card__service">Лечение</li>
//                </ul>
//            </div>
//            <div class="doctor-card__actions">
//                <button class="doctor-card__button doctor-card__button--edit">Изменить</button>
//                <button class="doctor-card__button doctor-card__button--delete">Удалить</button>
//            </div>
//        </div>