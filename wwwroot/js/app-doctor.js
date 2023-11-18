//Загрузка данных на страницу
loadData();

function saveData() {
  // Код для сохранения данных
  hideModal();
}

//Функция получения данных с сервера при загрузке страницы
//Тажке это main функция, для загрузки всех данных
async function loadData(){
  const response = await fetch("doctor?operation=read", {
    method: "post",
    headers: { "Accept": "application/json", "Content-Type": "application/json" }
  });

  console.log(response.json());
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