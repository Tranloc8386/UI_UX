



let users =JSON.parse(localStorage.getItem("users"))||[];
let products= JSON.parse(localStorage.getItem("products"))||[];



const logout = document.getElementById("logout");
const userList = document.getElementById("userList");
const productList = document.getElementById("productList");
const productForm = document.getElementById("productForm");
const userForm = document.getElementById("userForm");

logout.addEventListener("click", () => (window.location.href = "login.html"));

function renderUsers() {
  localStorage.setItem("users", JSON.stringify(users));
  userList.innerHTML = users.map(
    (u, i) => `
  <li>
    ${u.name} - ${u.email} - ${u.role}
    <button onclick="deleteUser(${i})">Xoa</button>
  </li>
  `
  ).join("");
}

userForm.addEventListener("submit", (u) => {
  u.preventDefault();
  const user = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    role: document.getElementById("role").value.trim(),
  };
  users.push(user);
  renderUsers();
  userForm.reset();
});

function deleteUser(i){
  users.splice(i,1);
  renderUsers();

}

function renderProducts() {
  localStorage.setItem("products", JSON.stringify(products));

  productList.innerHTML = products.map((p, i) => `
    <div class="card">
      <img src="${p.img}" alt="">
      <h4>${p.name}</h4>
      <p>${p.desc}</p>
      <p>Giá: ${p.price}</p>
      <button onclick="deleteProduct(${i})">Xóa</button>
    </div>
  `).join("");
}

productForm.addEventListener("submit", (u)=>{
  u.preventDefault();
  const product={
    name: document.getElementById("pname").value.trim(),
    price: document.getElementById("pprice"). value.trim(),
    desc: document.getElementById("pdesc").value.trim(),
    img: document.getElementById("pimg").value.trim(),

  }
  products.push(product);
  renderProducts();
  productForm.reset();
})

function deleteProduct(i) {
  products.splice(i, 1);
  renderProducts();
}