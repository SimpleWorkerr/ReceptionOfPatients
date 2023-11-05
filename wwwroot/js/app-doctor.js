// Работа со списком услуг

// Массив с услугами
const services = [
  "...",
  "...",
  "...",
];

// Функция для добавления услуг в список
function addServicesToList(services) {
  const listElement = document.querySelector(".article__services");
  services.forEach((service) => {
    const listItem = document.createElement("li");
    listItem.textContent = service;
    listElement.appendChild(listItem);
  });
}

addServicesToList(services);

function saveData() {
  // Код для сохранения данных
  hideModal();
}
