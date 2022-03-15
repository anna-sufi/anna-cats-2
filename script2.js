let requests = {
    getAllCats: "https://sb-cats.herokuapp.com/api/2/annasufi/show",
    getIds: "https://sb-cats.herokuapp.com/api/2/annasufi/ids",
    addOneCat: "https://sb-cats.herokuapp.com/api/2/annasufi/add",
    updOneCat: "https://sb-cats.herokuapp.com/api/2/annasufi/update/",
    getOneCat: "https://sb-cats.herokuapp.com/api/2/annasufi/show/",
    delOneCat: "https://sb-cats.herokuapp.com/api/2/annasufi/delete/"
}
// 3. Открываем инфо по выбранному коту

let about_id = window.location.search.split('?')[1].slice(3); // забираем id из url
let about_form = document.querySelector("#about_form");
let about_photo = document.querySelector(".about_photo");
console.log(about_photo.innerHTML);

//console.log(about_form.elements);
//console.log(requests.getOneCat + about_id);

fetch(requests.getOneCat + about_id)  // Просим у сервера данные по коту c нужным id
    .then(function(ans) {
        console.log(ans); // посмотрим response
        return ans.json();  //преобразуем ответ в json
    })
    .then(function(data) {
        console.log(data);  //посмотрим json
        let cat = data.data; // получили  обьект кота
        about_form.elements[0].value = cat.name;
        about_form.elements[1].value = cat.age;
        about_form.elements[2].value = cat.description;
        about_form.elements[3].value = cat.img_link;
        about_form.elements[4].value = cat.rate;
        if (cat.favourite) {about_form.elements[5].checked = true};
        about_form.elements[6].value = cat.id;
        about_photo.setAttribute("style", "background-image:url(" + cat.img_link + ")");
    })
let btn_edit = document.querySelector("#btn_edit");
let btn_save = document.querySelector("#btn_save");

// 3.1 Редактирование инфо по коту

function Edit() {
    about_form.elements[1].removeAttribute("readonly");
    about_form.elements[2].removeAttribute("readonly");
    about_form.elements[3].removeAttribute("readonly");
    about_form.elements[4].removeAttribute("readonly");
    about_form.elements[5].removeAttribute("disabled");
    btn_save.removeAttribute("disabled");
}

// 3.2 Сохранить изменения

function SendChanges(body) { // создаем функцию отправки изменений
     
    //console.log(JSON.stringify(body));
    fetch(requests.updOneCat + about_id, {
        method: "put",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert("Изменения сохранены!");
        });
    }
// Нажали кнопку  "Сохранить"
function saveChanges() {
    let body = {};  //напоняем body
    for (let i = 0; i < about_form.elements.length; i++) {
        let el = about_form.elements[i];
        // console.log(el);
        if (el.name) {
            if (el.name === "favourite") {
                el.value = el.checked;
            }
            if (el.name === "rate") {
                el.value = el.value ? el.value : 0;
            }
            if (el.name === "age") {
                el.value = el.value ? el.value : 0;
            }
            body[el.name] = el.value;
        }
    }
    console.log(body);
    SendChanges(body);
    about_form.elements[1].setAttribute("readonly", "readonly");
    about_form.elements[2].setAttribute("readonly", "readonly");
    about_form.elements[3].setAttribute("readonly", "readonly");
    about_form.elements[4].setAttribute("readonly", "readonly");
    about_form.elements[5].setAttribute("disabled", "disabled");
    btn_save.setAttribute("disabled", "disabled");
    
    location.reload();
}
