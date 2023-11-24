//Загрузка данных на страницу
loadDataCurrAppoint();


//Функция получения данных с сервера при загрузке страницы
//Тажке это main функция, для загрузки всех данных
async function loadDataCurrAppoint(){
  const response = await fetch("reception?operation=read", {
    method: "post",
    headers: { "Accept": "application/json", "Content-Type": "application/json" }
  });

  console.log(response.json());
}