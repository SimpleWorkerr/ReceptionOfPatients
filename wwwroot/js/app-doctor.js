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
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  });

  if (responseDoctors.status == 200) {
    let doctors_cards = document.getElementById("doctor-cards-id");
    doctors_cards.innerHTML = "";
    doctors = await responseDoctors.json();

    //Добавление карточек
    for (let i = 0; i < doctors.length; i++) {
      let serviceList = '<ul class="doctor-card__services">';
      for (let j = 0; j < doctors[i].Services.length; j++) {
        serviceList += `<li class="doctor-card__service">${doctors[i].Services[j].ServiceName}</li>`;
      }
      serviceList += "</ul>";

      // Форматирование даты с помощью Moment.js
      const formattedDate = moment(doctors[i].StartWorkDate).format(
        "YYYY-MM-DD HH:mm:ss"
      );

      //Хардкод
      doctors_cards.innerHTML += `<div class="doctor-card">
                                            <div class="doctor-card__info">
                                                <h3 class="doctor-card__name">${doctors[i].Surname} ${doctors[i].Name} ${doctors[i].FatherName}</h3>
                                                <p class="doctor-card__detail">Кабинет: ${doctors[i].OfficeNumber}</p>
                                                <p class="doctor-card__detail">Начало работы: ${formattedDate}</p>
                                                <p class="doctor-card__detail">Специализация: ${doctors[i].Specialization}</p>
                                                <h4 class="doctor-card__services-title">Услуги:</h4>
                                                ${serviceList}
                                            </div>
                                            <div class="doctor-card__actions">

                                                <button onclick="readDoctorPatient(${i});" class="doctor-card__button doctor-card__button--patients">Пациенты</button>
                                                <button onclick="changeDoctor(${i});" class="doctor-card__button doctor-card__button--edit">Изменить</button>
                                                <button onclick="deleteDoctor(${i});" class="doctor-card__button doctor-card__button--delete">Удалить</button>

                                            </div>
                                        </div>`;
    }
  }
}
//Функция изменения доктора
function changeDoctor(index) {
  doctor = doctors[index];
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
async function deleteDoctor(index) {
  const doctor = doctors[index];
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
      loadData();
    } else {
      throw new Error("Ошибка удаления доктора");
    }
  } catch (error) {
    console.error(error);
    alert("Произошла ошибка при удалении доктора");
  }
}

// // Функция добавления доктора
// async function addDoctor() {
//   // Получение данных из формы
//   const name = document.getElementById("name").value;
//   const room = document.getElementById("room").value;
//   const workStart = document.getElementById("workStart").value;
//   const specialization = document.getElementById("specialization").value;
//   const services = document.getElementById("services").value; // Предполагается, что это строка

//   // Создание объекта доктора
//   const newDoctor = {
//     Name: name,
//     OfficeNumber: room,
//     StartWorkDate: workStart,
//     Specialization: specialization,
//     Services: services
//       .split(",")
//       .map((service) => ({ ServiceName: service.trim() })), // Разбиваем строку услуг на массив
//   };

//   // Отправка данных на сервер
//   try {
//     const response = await fetch("/doctor?operation=create", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newDoctor),
//     });

//     if (response.ok) {
//       // Обновление данных на странице
//       await loadData();
//       hideModal();
//     } else {
//       throw new Error("Ошибка добавления доктора");
//     }
//   } catch (error) {
//     console.error(error);
//     alert("Произошла ошибка при добавлении доктора");
//   }
// }

// // Функция получения пациентов и отображения их в модальном окне
// async function readDoctorPatient(index) {
//   const doctor = doctors[index];
//   const url = "/doctor?operation=read_patients";

//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ doctorId: doctor.Id }),
//     });

//     if (response.ok) {
//       const patients = await response.json();
//       displayPatientsModal(patients);
//     } else {
//       throw new Error("Ошибка получения данных о пациентах");
//     }
//   } catch (error) {
//     console.error(error);
//     alert("Произошла ошибка при получении данных о пациентах");
//   }
// }

// // Функция для отображения модального окна с пациентами
// function displayPatientsModal(patients) {
//   // Создание содержимого модального окна
//   let modalContent =
//     "<table><tr><th>ID</th><th>Имя</th><th>Фамилия</th><th>Отчество</th><th>Дата рождения</th><th>Адрес</th><th>Телефон</th></tr>";
//   patients.forEach((patient) => {
//     modalContent += `<tr>
//                        <td>${patient.Id}</td>
//                        <td>${patient.Name}</td>
//                        <td>${patient.Surname}</td>
//                        <td>${patient.FatherName}</td>
//                        <td>${patient.BirthDate}</td>
//                        <td>${patient.Address}</td>
//                        <td>${patient.PhoneNumber}</td>
//                      </tr>`;
//   });
//   modalContent += "</table>";

//   const modal = document.getElementById("patientsModal");
//   modal.innerHTML = modalContent;
//   modal.style.display = "block";
// }

// function hidePatientsModal() {
//   const modal = document.getElementById("patientsModal");
//   modal.style.display = "none";
// }
