let requests = {
    getAllCats: "https://sb-cats.herokuapp.com/api/2/annasufi/show",
    getIds: "https://sb-cats.herokuapp.com/api/2/annasufi/ids",
    addOneCat: "https://sb-cats.herokuapp.com/api/2/annasufi/add",
    updOneCat: "https://sb-cats.herokuapp.com/api/2/annasufi/update/",
    getOneCat: "https://sb-cats.herokuapp.com/api/2/annasufi/show/",
    delOneCat: "https://sb-cats.herokuapp.com/api/2/annasufi/delete/"
}

let cont = document.querySelector(".container");

// 1. Загружаем данные по всем котам с БД

fetch(requests.getAllCats)  // Просим у сервера данные котов
    .then(function(ans) {
        console.log(ans); // посмотрим response
        return ans.json();  //преобразуем ответ в json
    })
    .then(function(data) {
        console.log(data);  //посмотрим json
        let cats = data.data; // получили массив обьектов

        //создаем карточки с полученными данными
        for (let i = 1; i <= cats.length; i++) {
            let elem = document.createElement("div");  //создаем элемент
                    
            let rate_bold = "";
            let rate_pale = "";
            let j = cats[i-1].rate; // формируем рейтинг
            while (j--) {
                rate_bold += "<i class=\"fa-solid fa-paw\"></i>";
            }

            let k = 10 - cats[i-1].rate; //формируем антирейтинг
            while (k--) {
                rate_pale += "<i class=\"fa-solid fa-paw null\"></i>";
            }

            let age_word = ""; //подбираем слово для возраста
            if (cats[i-1].age === 1) {age_word = "год";}  else {
                if (cats[i-1].age <= 5) {age_word = "года"} else {age_word = "лет"}
            }

            //наполняем карточку
            elem.innerHTML = "<div class=\"element\"><button onclick=\"deleteCat(id)\" class=\"cross_btn\" id=\"" + cats[i-1].id + "\" type=\"button\"><img class=\"cross\" src=\"del.png\"></img></button><a class=\"card_link\" href=\"index2.html?id=" + cats[i-1].id + "\"><div class=\"card\"><div class=\"card__foto\" style=\"background-image: url(" + cats[i-1].img_link + ")\"></div><h2 class=\"card__name\">" + cats[i-1].name + "</h2><div class=\"cat__rate\">" + rate_bold + rate_pale + "</div></div></a></div>";

         // console.log(elem.innerHTML);
            cont.appendChild(elem); //  отрисовываем карточку на контейнере

        }
    });   
    
    function deleteCat(id) {
        fetch(requests.delOneCat + id, {
            method: "delete"
        })
            .then(function() {
             alert("Котик удален");
                location.reload();
            } )}
     

    

    









