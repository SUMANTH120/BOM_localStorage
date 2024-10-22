let btn = document.getElementById("btn");
let s = document.getElementById("browsers");
let output = document.getElementById("output");
let filterData = document.getElementById("btn-2");

btn.onclick = async () => {
    let response = await fetch("https://fakestoreapi.com/products");
    let data = await response.json();
    alert("Data Fetched");
    localStorage.setItem("data", JSON.stringify(data));
    displayData(data);
}

filterData.onclick = () => {
    let category = document.getElementById("browser").value; // Get the user input from the input field
    let data = JSON.parse(localStorage.getItem("data")) || [];
    
    if (data.length > 0) {
        if (category) {
            data = data.filter(obj => obj["category"] === category); // Filter data based on user input
            displayData(data);
        } else {
            output.innerHTML = "Please select a category.";
        }
    } else {
        output.innerHTML = "No Data Available";
    }
}

function displayData(data) {
    output.innerHTML = "";
    data.forEach((obj, index) => {
        let information = document.createElement("div");
        information.className = "cards"
        information.innerHTML =
            `<p><b>Id : </b>${obj["id"]}</p>
            <p><b>Title : </b>${obj["title"]}</p>
            <p><b>Price : </b>${obj["price"]}</p>
            <p><b>Description : </b>${obj["description"]}</p>
            <p><b>Category : </b>${obj["category"]}</p>`;

        let deletebtn = document.createElement("button");
        deletebtn.innerText = "Delete";

        deletebtn.onclick = () => {
            deleteData(index);
        }

        information.appendChild(deletebtn);
        output.appendChild(information);
    });
}

function deleteData(index) {
    let data = JSON.parse(localStorage.getItem("data"));
    data.splice(index, 1);
    localStorage.setItem("data", JSON.stringify(data));
    displayData(data);
}

window.onload = () => {
    let data = JSON.parse(localStorage.getItem("data")) || [];
    if (data.length > 0) {
        displayData(data);
    } else {
        output.innerHTML = "No Data Available";
    }
}
