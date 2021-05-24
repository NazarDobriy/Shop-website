function add_product(picture_id, tag_id, price_id) {
    const picture = document.getElementById(picture_id);
    const tag = document.getElementById(tag_id);
    const price = document.getElementById(price_id);

    var field = "";

    for (var i = 0; i < price.textContent.length; i++) {
        if (price.textContent[i] != '$') {
            field += price.textContent[i];
        }
    }
    
    var product = {
        picture: picture.src,
        tag: tag.textContent,
        price: parseInt(field)
    };

    const path = window.origin;

    fetch(path, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(product),
        cache: "no-cache",
        headers: new Headers({
            "content-type": "application/json"
        })
    })
    .then(function (res) {
        if (res.status != 200) {
            console.log("Response status is " + String(res.status));
            return alert("Error, the product cannot be added in the basket!");
        }

        else {
            res.json().then(function (data) {
                console.log(data[0]);
                return alert("Successfully, the product has been added in the basket!");
            })
        }
    });
}

function changeImg() {
    let picture = document.getElementById('flash');
    let page = document.getElementById('content');

    if (picture.src == window.origin + "/static/img/black-flash.png") {
        picture.src = "../static/img/white-flash.png";

        let header_words = document.querySelectorAll("#inscription");

        for (let i = 0; i < header_words.length; i++) {
            header_words[i].style.color = "#fff";
        }

        page.style.backgroundColor = 'gray';
    }

    else {
        picture.src = "../static/img/black-flash.png";

        let header_words = document.querySelectorAll("#inscription");

        for (let i = 0; i < header_words.length; i++) {
            header_words[i].style.color = "#212121";
        }

        page.style.backgroundColor = '#f9f6f1';
    }
}

export default add_product;