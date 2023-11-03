async function getDoctors() {
    // Запрос для получения информации о докторах с начальной страницы
    const response = await fetch(
        `https://localhost:7235/doctor?operation=read`,
        {
            method: "POST",
            headers: { Accept: "application/json" },
        }
    );
}
async function getPatients() {
    // Запрос для получения информации о пациентах с начальной страницы
    const response = await fetch(
        `https://localhost:7235/patient?operation=read`,
        {
            method: "GET",
            headers: { Accept: "application/json" },
        }
    );

}
async function getServices() {
    // Запрос для получения информации о сервисах с начальной страницы
    const response = await fetch(
        `https://localhost:7235/service?operation=read`,
        {
            method: "GET",
            headers: { Accept: "application/json" },
        }
    );

}
async function getReceptions() {
    // Запрос для получения информации о приёмах с начальной страницы
    const response = await fetch(
        `https://localhost:7235/reception?operation=read`,
        {
            method: "GET",
            headers: { Accept: "application/json" },
        }
    );
}
async function getResultReceptions() {

    const response = await fetch(
        `https://localhost:7235/receptionResult?operation=read`,
        {
            method: "GET",
            headers: { Accept: "application/json" },
        }
    );
}

document
    .getElementById("btnDoctorsId")
    .addEventListener("click", () => getDoctors());
document
    .getElementById("btnPatientnId")
    .addEventListener("click", () => getWeather());
document
    .getElementById("btnServiceId")
    .addEventListener("click", () => getWeather());
document
    .getElementById("btnReceptionId")
    .addEventListener("click", () => getWeather());
document
    .getElementById("btnReceptionRecId")
    .addEventListener("click", () => getWeather());
