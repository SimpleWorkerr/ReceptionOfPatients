//Загрузка данных на страницу
loadData();


//Функция получения данных с сервера при загрузке страницы
//Тажке это main функция, для загрузки всех данных
async function loadData(){
  const response = await fetch("receptionResult?operation=read", {
    method: "post",
    headers: { "Accept": "application/json", "Content-Type": "application/json" }
  });

  console.log(response.json());
}