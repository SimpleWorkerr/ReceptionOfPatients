var doctorArg = "doctor"
var patientArg = "patient"
var receptionArg = "reception"
var receptionResArg = "receptionResult"
var servcieArg = "service"

async function getPage(objPage) {
    const response = await fetch(`/${objPage}?operation=read_page`, {
        method: "GET",
        headers: { "Accept": "text/html" }
    });
    if (response.ok === true) {

        //Как загрузить html страничку ????
    }
    else {
        // если произошла ошибка, получаем сообщение об ошибке
        const error = await response.json();
        console.log(error.message); // и выводим его на консоль
    }
}

getPage(doctorArg);
getPage(patientArg);
getPage(receptionArg);
getPage(receptionResArg);
getPage(servcieArg);