const logout = document.getElementById("logout");
logout.addEventListener("click", () => {
  window.location.href = "login.html";
});

let products = JSON.parse(localStorage.getItem("products")) || [];
let cart = JSON.parse(localStorage.getItem("cartList")) || [];

const productsEl = document.getElementById("products");
const cartList = document.getElementById("cartList");
const totalEl = document.getElementById("total");
const checkoutBtn = document.getElementById("checkoutBtn");

function renderProducts() {
  productsEl.innerHTML = "";
  if (products.length === 0) {
    products.innerHTML = "<p>Chua co san pham nao</p>";
    return;
  }

  products.forEach((p) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
    <img src="${p.img}>
    <h4>${p.name}</h4>
    <p>${p.price}</p>
    <p>${p.description}</p>
    <button button onclick="addToCart('${p.id}')">Them vao gio hang</button>
    
    `;
    productsEl.appendChild("card");
  });
}

function renderCart() {
  cartList.innerHTML = "";
  let total = 0;
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
    ${item.name}
    ${item.price} VND
    <button onclick="removeFromCart('${item.id}')">X</button>
    `;
    cartList.appendChild(li);
    total += item.price;
  });
  totalEl.textContent = total;
}

window.addToCart = (id) => {
  const item = products.find((p) => p.id === id);

  if (!item) return;
  if (cart.find((c) => c.id === id)) {
    alert("San pham da co trong gio hang!");
    return;
  }
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
};

window.removeFromCart = (id) => {
  cart = cart.filter((c) => c.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
};

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Gio hang trong!");
    return;
  }
  alert("Thanh toan thanh cong!");
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
});
renderProducts();
renderCart();
