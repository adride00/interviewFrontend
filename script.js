const nameProduct = document.getElementById("product");
const price = document.getElementById("price");
const iva = document.getElementById("iva");
const table = document.getElementById("table");
const tbody = document.getElementById("table-details");
const products = [];
function getId() {
  return Math.floor(Math.random() * 999);
}

function addproduct(products) {
  const row = document.createElement("tr");
  row.innerHTML = `
  <td>${products.id}</td>
  <td>${products.name}</td>
  <td>$${products.price}</td>
  <td>${products.iva}%</td>
  <td>$${products.total}</td>
  <td>${products.date}</td>
  <td>
    <button class="btn btn-delete">Delete</button>
  </td>
  `;
  tbody.appendChild(row);
}

function deleteproduct(event) {
  if (event.target.classList.contains("btn-delete")) {
    const id =
      event.target.parentElement.parentElement.firstElementChild.textContent;
    event.target.parentElement.parentElement.remove();
    const index = products.findIndex((product) => product.id === parseInt(id));
    products.splice(index, 1);
  }
}

tbody.addEventListener("click", deleteproduct);

function cleanForm() {
  nameProduct.value = "";
  price.value = "";
  iva.value = "";
}

function getCurrentDate() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function calcularTotales(product) {
  console.log(product.price, product.iva);
  const iva = parseFloat(product.price) * parseFloat(product.iva);
  totalIva = parseFloat(product.price) + iva / 100;
  return {
    ...product,
    total: parseFloat(totalIva).toFixed(2),
  };
}

function createproduct(event) {
  event.preventDefault();
  if (nameProduct.value === "" || price.value === "") {
    alert("Por favor, llene todos los campos");
    return;
  }
  const product = {
    id: getId(),
    name: nameProduct.value,
    price: price.value,
    iva: iva.value === "" ? 21 : iva.value,
    date: getCurrentDate(),
  };
  products.push(product);

  addproduct(calcularTotales(product));
  cleanForm();
}

const form = document.getElementById("addProduct");
form.addEventListener("click", createproduct);
