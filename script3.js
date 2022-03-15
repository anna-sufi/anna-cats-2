let requests = {
    getAllCats: "https://sb-cats.herokuapp.com/api/2/annasufi/show",
    getIds: "https://sb-cats.herokuapp.com/api/2/annasufi/ids",
    addOneCat: "https://sb-cats.herokuapp.com/api/2/annasufi/add",
    updOneCat: "https://sb-cats.herokuapp.com/api/2/annasufi/update/",
    getOneCat: "https://sb-cats.herokuapp.com/api/2/annasufi/show/",
    delOneCat: "https://sb-cats.herokuapp.com/api/2/annasufi/delete/"
}

function sendCat(body) { // создаем функцию добавления кота
    console.log(body);
    console.log(JSON.stringify(body));
    fetch(requests.addOneCat, {
        method: "post",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
}

let form = document.querySelector("#addCat_form");

form.addEventListener("submit", function(e) { // по нажатию кнопки отправить body
 e.preventDefault();
    let body = {};  //напоняем body
    for (let i = 0; i < form.elements.length; i++) {
        let el = form.elements[i];
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
    sendCat(body);
    alert("Котик добавлен!");
});

