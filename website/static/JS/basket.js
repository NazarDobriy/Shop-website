function product_delete(product_id) {
    const path = window.location.href;

    let product = { id: product_id };

    fetch(path, {
        method: "DELETE",
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
            return alert("Error, the product cannot be deleted!");
        }

        else {
            res.json().then(function (data) {
                console.log(data[0]);
                let redirect_path = window.origin;
                alert("Successfully, the product has been deleted!");
                return window.location.href = redirect_path;
            })
        }
    });
}