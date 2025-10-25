const user = getCurrentUser();
if (!user || user.role !== "user") window.location.href = "login.html";

document.getElementById("logoutBtn").addEventListener("click", logout);

let products = JSON.parse(localStorage.getItem("products")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productsEl = document.getElementById("products");
const cartList = document.getElementById("cartList");
const totalEl = document.getElementById("total");
const checkoutBtn = document.getElementById("checkoutBtn");

function renderProducts() {
  productsEl.innerHTML = "";
  if (products.length === 0) {
    productsEl.innerHTML = "<p>Chưa có sản phẩm nào.</p>";
    return;
  }

  products.forEach((p) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.image || "https://via.placeholder.com/150"}" alt="">
      <h4>${p.name}</h4>
      <p>${p.price} VND</p>
      <p>${p.description}</p>
      <button onclick="addToCart('${p.id}')">Thêm vào giỏ</button>
    `;
    productsEl.appendChild(card);
  });
}

function renderCart() {
  cartList.innerHTML = "";
  let total = 0;
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - ${item.price} VND
      <button onclick="removeFromCart('${item.id}')">X</button>
    `;
    cartList.appendChild(li);
    total += Number(item.price);
  });
  totalEl.textContent = total;
}

window.addToCart = (id) => {
  const item = products.find((p) => p.id === id);
  if (!item) return;
  if (cart.find((c) => c.id === id)) {
    alert("Sản phẩm đã có trong giỏ!");
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
  if (cart.length === 0) return alert("Giỏ hàng trống!");
  alert("Thanh toán thành công!");
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
});

renderProducts();
renderCart();
