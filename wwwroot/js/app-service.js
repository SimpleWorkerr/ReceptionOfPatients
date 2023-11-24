//Загрузка данных на страницу
loadDataServices();


//Функция получения данных с сервера при загрузке страницы
//Тажке это main функция, для загрузки всех данных
async function loadDataServices(){
  const response = await fetch("service?operation=read", {
    method: "post",
    headers: { "Accept": "application/json", "Content-Type": "application/json" }
  });

  console.log(response.json());
}