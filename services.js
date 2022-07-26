let categories = [];
let services = [];
const xhttp = new XMLHttpRequest();
xhttp.open("Get", "/data/category.json", true);
xhttp.send();
xhttp.onload = function () {
  if (xhttp.status === 200) {
    console.log(this.responseText);
    categories = JSON.parse(this.responseText);
    console.log(categories);
    showCategory();
  }
};

const xhttp1 = new XMLHttpRequest();
xhttp1.open("Get", "/data/services.json", true);
xhttp1.send();
xhttp1.onload = function () {
  if (xhttp.status === 200) {
    console.log(this.response);
    services = JSON.parse(this.responseText);
    console.log(services);
    showServices();
  }
};
const showServices = function () {
  //let listServices=`<span class="span-items">تورها در یک نگاه</span>`
  let row = ``;
  document.getElementById(
    "table-body"
  ).innerHTML = `<div id="table-body"></div>`;
  for (const service of services) {
    let row = `
    <div class="row-table">
      <div class="titleCategory col-lg-1 col-md-1">${
        service.titleCategory
      }</div>
      <div class="subject col-lg-1 col-md-1">${service.title}</div>
      <div class="capecity col-lg-1 col-md-1">${service.capecity}</div>
      <div class="duration col-lg-1 col-md-1">${service.duration.toLocaleString(
        "fa"
      )}</div>
      <div class="date col-lg-1 col-md-1">${service.date}</div>
      <div class="price col-lg-1 col-md-1">${service.price.toLocaleString(
        "fa"
      )}</div>
    </div>
  `;

    document.getElementById("table-body").innerHTML += row;
  }
};
const showCategory = function () {
  let checkboxes = `<span class="span-items">دسته بندی تورها</span>`;
  for (const item of categories) {
    checkboxes += `<input type="checkbox" class="myCheckBox" onchange="checkout()" name=${item.category} id=${item.category}>
        <label class="category" for=${item.category}>${item.title}</label><br/>`;
  }
  console.log(checkboxes);
  document.getElementById("items").innerHTML = checkboxes;
  console.log(document.getElementsByClassName("items"));
};

function checkout() {
  let checkBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
  let flag = false;
  if (checkBoxes.length === 0) {
    flag = true;
    showServices();
  }
  let checkedBoxes = [];
  for (var i = 0; i < checkBoxes.length; i++) {
    checkedBoxes.push(checkBoxes[i].name);
    var filterTable = services.filter(function (value) {
      return value.category === checkedBoxes[i];
    });
    showServicesByFilter(filterTable, flag);
    flag = true;
  }
}

showServicesByFilter = function (filterTable, flag) {
  //let listServices=`<span class="span-items">تورها در یک نگاه</span>`
  let row = ``;
  if (flag == false) {
    document.getElementById(
      "table-body"
    ).innerHTML = `<div id="table-body"></div>`;
  }
  for (const service of filterTable) {
    let row = `
    <div class="row-table">
      <div class="titleCategory col-lg-1 col-md-1">${
        service.titleCategory
      }</div>
      <div class="subject col-lg-1 col-md-1">${service.title}</div>
      <div class="capecity col-lg-1 col-md-1">${service.capecity}</div>
      <div class="duration col-lg-1 col-md-1">${service.duration.toLocaleString(
        "fa"
      )}</div>
      <div class="date col-lg-1 col-md-1">${service.date}</div>
      <div class="price col-lg-1 col-md-1">${service.price.toLocaleString(
        "fa"
      )}</div>
    </div>
  `;

    document.getElementById("table-body").innerHTML += row;
  }
};

function onclickhandler(e) {
  let flag = false;
  //alert(e.value);
  document.getElementById('message').innerText='';
  if (e.value == "") {
    flag = true;
    showServices();
  }
  var filterTitle = services.filter(function (value) {
    return value.title == e.value;
  });
  if (filterTitle.length != 0) {
    showServicesByFilter(filterTitle, flag);
    flag = true;
  } else {
    var filterCategory = services.filter(function (value) {
      return value.titleCategory == e.value;
    });
   if(filterCategory.length!=0){
    showServicesByFilter(filterCategory, flag);
    flag = true;
  }
  else{
    var filterCapecity = services.filter(function (value) {
      return value.capecity == e.value;
    });
    if(filterCapecity.length!=0){
    showServicesByFilter(filterCapecity, flag);
    flag = true;
    }
  }
}
 if (flag==false){
  document.getElementById('message').innerText='موردی یافت نگردید.';
 }
  
};
